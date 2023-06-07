import React, { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios  from "axios";
import { Navigate } from "react-router-dom";
import { userContext } from "../context/Context";

function Signup() {
  const inputRef = useRef();
  const [selectImg, setSelectImg] = useState(null);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPass,setConfirmPass]=useState('')
  const [phone,setPhone]=useState('');
  const [dispaly,setDispaly]=useState(null)

  const [phoneErr,setPhonErr]=useState(false);
  const [passerr,setPassErr]=useState(false);
  const [redirect,setRedirect]=useState(false)

  const {setUser}=useContext(userContext);

 

 

  function uploadPhoto(ev) {
    const files = ev.target.files[0];
    setDispaly(URL.createObjectURL(files));
    setSelectImg(files)

  }
 

 async function handleSubmit(){
    try{
         if(name && email && password && confirmPass && phone && selectImg){
           if(password === confirmPass){
            // let regMob=/^6[789]\d{8}$/;4
            // if(regMob.test(phone)){
             
            const formData=new FormData();
            formData.append('name',name),
            formData.append('email',email);
            formData.append('password',password);
            formData.append('confirmPass',confirmPass);
            formData.append('phone',phone);
            formData.append('selectImg',selectImg);

                const{data} = await axios.post('/register',formData,{
                           headers:{
                            'Content-type':'multipart/form-data'
                           }
                })
                if(data.status=='success'){
                  toast.success( `Wow! ${data?.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }); 
                   setUser(data.user)
                   setRedirect(true)

                }else{
                  toast.error(`OOPS! ${data?.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                }
                

               
            // }else{
            //     setPhonErr('phone number should be 10 number and start with 6789')
            // }

           }else{
             setPassErr("password is  not matched")
           }

         }else{
            toast.error(`All fields are required!!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
         }
    }catch(error){
        console.log(error.message)
    }

  }

  if(redirect){
    return <Navigate to={'/signup/otp'}/>
  }

  

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col mt-12">
      <ToastContainer />
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-4xl  text-center">Register</h1>
    
            <div className="text-center pb-12 ">
              <div className="flex justify-center">
                <div
                  className="border cursor-pointer  h-36 w-36 rounded-full"
                  onClick={() => inputRef.current.click()}
                >
                  {dispaly ? (
                    <img
                      src={dispaly}
                      alt="Preview"
                      className=" h-36 w-36 rounded-full object-cover overflow-hidden"
                    />
                  ) : (
                   <p className="mt-14">pic</p> 
                  )}
                </div>
              </div>
              <input
                type="file"
                className="hidden cursor-pointer"
                ref={inputRef}
                onChange={uploadPhoto}
              />
            </div>
           

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              value={name} onChange={(e)=>setName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              value={email}  onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
            />
           {
            passerr ? (<p className="text-red-600">{passerr}</p>):('')
           }
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              value={password} onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}
              placeholder="Confirm Password"
            />
            {
                phoneErr ? (<p className="text-red-500">{phoneErr}</p>):(
                    ''
                )
            }
            <input
              type="number"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              value={phone} onChange={(e)=>setPhone(e.target.value)}
              placeholder="Mobile number"
            />

            <button
              type="button" onClick={handleSubmit}
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue text-blue"
              href="../login/"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

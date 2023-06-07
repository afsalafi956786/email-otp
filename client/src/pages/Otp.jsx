import React, { useContext, useState } from 'react'
import { userContext } from '../context/Context'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

function Otp() {
  const {users,setUser}=useContext(userContext)
   const[otp,setOtp]=useState('');
   const [otpErr,setOtpErr]=useState(false)
   const [redirect,setRedirect]=useState(false)
  
  

  async function submitOtp(e){
          try{
            e.preventDefault()
            if(otp){
              const obj={
                otp,
                users,
              }
             const {data}= await axios.post('/otp',obj);
             if(data.status=='success'){
              console.log(data)
              console.log(data.jwtToken,'---')
              localStorage.setItem('usertoken',data.jwtToken);
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
                setUser(data.user);
                setTimeout(()=>{
                    setRedirect(true)
                },1000)
             }else{
              toast.error(`OOPS! ${data?.message}`,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
             }

            }else{
               setOtpErr('Please enter the otp')
            }
          }catch(error){
            console.log(error.message)
          }

  }
  if(redirect){
    return <Navigate to={'/signup/otp/verify'}/>
  }


  return (
    <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <ToastContainer />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Otp verification
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                otp
              </label>
              {
                otpErr ? (
                    <p className='text-red-600'>{otpErr}</p>
                ):(
                  ''
                )
              }
              <div className="mt-2">
                <input
                  
                  name="otp"
                  type="number"
                  value={otp}
                  onChange={(e)=>setOtp(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:border-none"
                />
              </div>
            </div>


            <div>
              <button
              type='button'
                onClick={submitOtp}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
             Verify
              </button>
            </div>
          </form>

        
        </div>
      </div>

    
    </>
  )
}

export default Otp
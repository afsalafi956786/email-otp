import axios from 'axios';
import React, { useState } from 'react'

function Login() {
   
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')
    const [err,setErr]=useState(false)

async function handlLogin(e){
    e.preventDefault();
    if(email && password){
        await axios.post('/login',{email,password})

    }else{
       setErr('All fields are required!!')
    }

}

  return (
   <>
   <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-1 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
             {
                err ? (
                      <p className='text-red-600'>{err}</p>
                ):('')
             }
                    <input 
                        type="email"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        placeholder="Email" />

                    <input 
                        type="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                 

                    <button
                        type="button"
                        onClick={handlLogin}
                        className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-800 focus:outline-none my-1"
                    >Login in</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
   </>
  )
}

export default Login
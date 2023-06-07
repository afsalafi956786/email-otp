import axios from "axios";
import React, { useState } from "react";

function AdminLog() {
   
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [adminErr,setadminErr]=useState(false)

    async function submitLogin(e){
        e.preventDefault();
        if(email && password){
            await axios.post('/login',{email,password})
        }else{
            setadminErr('All fields are required!!')
        }
    }
  return (
    <>
      <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div class="lg:w-full sm:w-[50%] p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
          <h1 class="text-3xl font-semibold text-center text-purple-700">
            Admin Login
          </h1>

         {
            adminErr ?(
                <p className="text-red-600 mt-6 mb-2">{adminErr}</p>
            ):('')
         }
            <div>
              <label for="email" class="block text-sm text-gray-800"/>
                Email
            
              <input
                type="email" value={email}  onChange={(e)=>setEmail(e.target.value)}
                class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div class="mt-4">
              <div>
                <label for="password" class="block text-sm text-gray-800"/>
                  Password
              
                <input
                  type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                  class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <a href="#" class="text-xs text-gray-600 hover:underline">
                Forget Password?
              </a>
              <div class="mt-6">
                <button type="button" onClick={submitLogin} class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  Login
                </button>
              </div>
            </div>
       
          <p class="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <a href="#" class="font-medium text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminLog;

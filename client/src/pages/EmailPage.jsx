import React, { useContext } from 'react'
import { userContext } from '../context/Context'

function EmailPage() {
    const {users}=useContext(userContext);
  return (
    <>
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
  <div className="max-w-xl px-5 text-center">
    <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Check your inbox</h2>
    <p className="mb-2 text-lg text-zinc-500">We are glad, that you’re with us ? We’ve sent you a verification link to the email address <span class="font-medium text-indigo-500">guyghjhj</span>.</p>
    <a href='https://mail.google.com/mail/u/0/#inbox'  class="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Open the App →</a>
  </div>
</div>
    
    </>
  )
}

export default EmailPage
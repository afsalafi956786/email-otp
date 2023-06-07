import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const userContext=createContext()



export function UserContextProvider({children}) {
  const [users,setUser]=useState(null)

  useEffect(()=>{
    if(!users){
     let {data}= axios.get('/profile')
    }
  })
  return (
    <userContext.Provider value={{users,setUser}}>
      {children}
    </userContext.Provider>
  )
}


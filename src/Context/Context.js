import { createContext } from "react";
import { useState } from "react"

export const CurrnetUserContext = createContext({});

export default function CurrnetUserProvider({children}){
  const [currentUser,setCurrentUser]=useState({});

  return(
    <CurrnetUserContext.Provider value={{currentUser,setCurrentUser}}>
      {children}
    </CurrnetUserContext.Provider>
  )
}
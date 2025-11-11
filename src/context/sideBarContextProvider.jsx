"use client";
import React, { createContext, useState } from 'react'
export const SideBarContext = createContext();
const SideBarContextProvider = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <SideBarContext.Provider value={{sideBarOpen , setSideBarOpen}}>
      {
        children
      }
    </SideBarContext.Provider>
  )
}

export default SideBarContextProvider

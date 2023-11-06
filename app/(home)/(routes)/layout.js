"use client"
import React, { useState } from 'react'
import SideBarNav from './../_components/SideBarNav'
import Header from './../_components/Header'

function homeLayout({children}) {
  const [toggleSideBar,setToggleSideBar]=useState(false);
  return (
    <div>
      {toggleSideBar?  <div className='h-full w-64 md:flex flex-col fixed
        inset-y-0 z-50 '>
            <SideBarNav toggleSideBar={()=>setToggleSideBar(false)}/>
        </div>:null}
       <div className='h-full w-64 md:flex flex-col md:fixed
        inset-y-0 z-50 hidden'>
            <SideBarNav/>
        </div>
        <Header toggleSideBar={()=> setToggleSideBar(true)}/>
        <div className='md:ml-64 p-5'>
        {children}
        </div>
       
    </div>
  )
}

export default homeLayout
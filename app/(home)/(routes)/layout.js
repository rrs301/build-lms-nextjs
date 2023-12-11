"use client"
import React, { useContext, useEffect, useState } from 'react'
import SideBarNav from './../_components/SideBarNav'
import Header from './../_components/Header'
import GlobalApi from '../../_services/GlobalApi';
import { UserMembershipContext } from '../../_context/UserMembershipContext';
import { useUser } from '@clerk/nextjs';

function homeLayout({children}) {
  const [toggleSideBar,setToggleSideBar]=useState(false);
  
  const {user}=useUser();
  const {userMembership,setUserMembership}
  =useContext(UserMembershipContext);
  useEffect(()=>{
    user&&getUserSubscription_(1);
  },[user])
  const getUserSubscription_= (pageNumber=1)=>{
    GlobalApi.getUserSubscription(pageNumber)
    .then(resp=>{
    const data= resp.data.data.find(item=>item.payer_email==user.primaryEmailAddress.emailAddress);
    if(data)
     {
       console.log(" Membership")
       setUserMembership(true)
     }
     else{
      console.log("DATA",pageNumber,resp.data.last_page)
      if(resp?.data?.last_page>=pageNumber+1)
      {
        console.log(" No Membership")
        getUserSubscription_(pageNumber+1)
      }
     }
   })
 }
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
"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import OneSignal from 'react-onesignal';
export default function Home() {
  const router=useRouter()
  useEffect(()=>{
   // runOneSignal();
    router.push('/browse')
  },[])


    
 
  return (
    <div>
      
    </div>
  )
}

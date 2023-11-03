"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router=useRouter()
  useEffect(()=>{
    router.push('/browse')
  },[])
  return (
    <div>
     
    </div>
  )
}

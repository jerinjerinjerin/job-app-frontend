"use client";
import AuthForm from '@/components/auth/AuthForm';
import React from 'react'


const Page = () => {

  return (
    <div className='w-full h-screen flex items-center justify-center p-5 z-90'>
         <AuthForm type='login'/>
    </div>
  )
}

export default Page
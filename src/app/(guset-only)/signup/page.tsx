"use client";
import AuthForm from '@/views/auth/AuthForm';
import React from 'react'


const Page = () => {

  return (
    <div className='w-full h-screen flex items-center justify-center p-5 z-90'>
      <AuthForm type='sign-up' />
    </div>
  )
}

export default Page
"use client"

import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Image from 'next/image'
import React from 'react'

function Login() {
  
  const signInWithGoogle = async () => {
      const {error} = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })

      if(error){
        console.error('Error:',error.message)
      }
  }
  
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-8' >
        <div className='flex flex-row items-center gap-3 mb-5'>
          <Image src={'/logo.svg'} alt='logo' width={50} height={50} className='w-[50px]' />
          <p className='font-bold text-lg'>AI Recruter</p>
        </div>
        <div className='flex items-center flex-col'>
          <Image src={'/robot.png'} alt='robot' 
            height={400} 
            width={600} 
            className='w-[400px] h-[250px] bg-blue-100 rounded-lg' 
          />
          <h2 className='text-2xl font-bold text-center mt-5'>
            Welcome to AI Recruter
          </h2>
          <p className='text-gray-500 text-center'>Sign In With Google Account</p>
          <Button className='mt-7 w-full' onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
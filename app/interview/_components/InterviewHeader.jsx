import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm bg-white'>
        <div className='flex flex-row items-center gap-3'>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40}  />
            <p className='font-bold text-lg text-gray-600'>AI Recruter</p>
        </div>
    </div>
  )
}

export default InterviewHeader
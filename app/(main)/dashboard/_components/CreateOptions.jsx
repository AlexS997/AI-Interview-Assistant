import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
        <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-100 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'>
            <Video className='p-3 bg-amber-100 text-amber-500 rounded-lg h-12 w-12' />
            <h2 className='text-lg font-bold'>Create New Interview</h2>
            <p className='text-zinc-500'>Create AI Interviews and Schedule Candidates</p>
        </Link>
        <div className='bg-white border border-gray-100 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'>
            <Phone className='p-3 bg-amber-100 text-amber-500 rounded-lg h-12 w-12' />
            <h2 className='text-lg font-bold'>Create Phone Call</h2>
            <p className='text-zinc-500'>Schedule Phone Call With Candidates</p>
        </div>
    </div>
  )
}

export default CreateOptions
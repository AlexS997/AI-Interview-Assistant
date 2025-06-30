'use client'
import { Button } from '@/components/ui/button'
import { Video } from 'lucide-react'
import React, { useState } from 'react'

function LatestInterviewsList() {

  const [interviewList, setInterviewList] = useState([])

  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>

        {interviewList?.length == 0 && 
            <div className='p-5 flex flex-col gap-3 items-center bg-white mt-5 rounded-lg'>
                <Video className='text-amber-500 rounded-lg h-12 w-12' />
                <h2 className='text-lg font-bold'>You have no interviews yet</h2>
                <Button>+ Create New Interview</Button>
            </div>
        }
    </div>
  )
}

export default LatestInterviewsList
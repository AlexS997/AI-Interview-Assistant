import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Calendar, Clock, Copy, Facebook, ListChecks, Mail, Phone, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewLink({interview_id, formData}) {
    
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id
  
    const GetInterviewUrl = () => {

        return url;
    }

    const onCopyLink = async () => {
        await navigator.clipboard.writeText(url);
        toast('Link Copied')
    }
  
    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <Image src={'/check.png'} alt='check' width={200} height={200} className='w-[50px] h-[50px]' />
            <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
            <p className='mt-3'>Share this link with your candidates to start the interview process</p>

            <div className='w-full p-7 mt-6 rounded-lg bg-white flex flex-col'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold'>Interview Link</h2>
                    <h2 className='p-1 px-2 text-amber-500 bg-amber-50 rounded-md border border-amber-100'>Valid for 30 days</h2>
                
                </div>
                
                <div className='mt-3 flex gap-3 items-center'>
                    <Input defaultValue={GetInterviewUrl()} disabled={true} />
                    <Button onClick={() => onCopyLink()} className='bg-amber-500 cursor-pointer'> <Copy/> Copy Link </Button>
                </div>
                
                <hr className='my-5' />

                <div className='flex gap-4'>
                    <h2 className='text-sm text-gray-600 flex gap-2 items-center'> 
                        <Clock className='w-5 h-5' /> {formData?.duration} 
                    </h2>
                    <h2 className='text-sm text-gray-600 flex gap-2 items-center'> 
                        <ListChecks className='w-5 h-5' /> Questions
                    </h2>
                    {/* <h2 className='text-sm text-gray-600 flex gap-2 items-center'> 
                        <Calendar className='w-5 h-5' /> Date
                    </h2> */}
                </div>
            </div>

            <div className='w-full p-7 mt-7 rounded-lg bg-white flex flex-col'>
                <h2 className='font-bold'>Share Via</h2>
                <div className='mt-3 flex gap-5 justify-around wrap flex-wrap'>
                    <Button variant={'outline'} className='text-gray-600 cursor-pointer hover:bg-amber-50 hover:text-amber-500 hover:border-amber-100' > 
                        <Mail /> Email 
                    </Button>
                    <Button variant={'outline'} className='text-gray-600 cursor-pointer hover:bg-amber-50 hover:text-amber-500 hover:border-amber-100' >
                        <Facebook/> Facebook
                    </Button>
                    <Button variant={'outline'} className='text-gray-600 cursor-pointer hover:bg-amber-50 hover:text-amber-500 hover:border-amber-100' >
                        <Phone/> WhatsApp
                    </Button>
                </div>
            </div>
            <div className='mt-7 flex w-full justify-between gap-5'>
                <Link href={'/dashboard'}>
                    <Button variant={'outline'} className='cursor-pointer' > <ArrowLeft /> Back to Dashboard </Button>
                </Link>
                <Link href={'/create-interview'}>
                    <Button className='bg-amber-500 cursor-pointer' > <Plus /> Create New Interview </Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewLink
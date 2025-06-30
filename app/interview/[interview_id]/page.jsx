'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { supabase } from '@/services/supabaseClient'
import { Clock, Info, Loader2Icon, Settings, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

function Interview() {
  
    const {interview_id} = useParams();
    console.log(interview_id)

    const [interviewData, setInterviewData] = useState()
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [loading, setLoading] = useState(false)
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
    const router = useRouter()

    useEffect(() => {
        interview_id && GetInterviewDetails();
    }, [interview_id])

    const GetInterviewDetails = async () => {
        setLoading(true)
        
        try{
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select("jobPosition, jobDescription, duration, type")
                .eq('interview_id', interview_id)
    
            setInterviewData(Interviews[0])
            setLoading(false)

            if(Interviews?.length == 0){
                toast('Incorect Interview Link')
                return;
            }

        } catch(e){
            setLoading(false)
            toast('Incorect Interview Link')
        }

    }

    const onJoinInterview = async () => {

        setLoading(true)

        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id', interview_id)

        console.log(Interviews[0]);

        setInterviewInfo({
            userName: userName,
            userEmail: userEmail,
            interviewData: Interviews[0]
        });

        router.push('/interview/' + interview_id + '/start')
        setLoading(false)
    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
            <div className='flex flex-col items-center justify-center 
            border rounded-lg bg-white p-7 px-20 md:px-26 lg:px-32 xl:px-52'>
                <div className='flex flex-row items-center gap-3'>
                    <Image src={'/logo.svg'} alt='logo' width={40} height={40}  />
                    <p className='font-bold text-lg text-gray-600'>AI Recruter</p>
                </div>

                <h2 className='mt-3'>AI-Powered Interview Platform</h2>

                <Image src={'/robot.png'} alt='robot' width={500} height={500} className='w-[280px] my-6' />

                <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-600 mt-3'> 
                    <Clock className='w-4 h-4' /> {interviewData?.duration}
                </h2>

                <div className='w-full'>
                    <h2 className='mt-5 mb-2 text-sm font-medium'>Enter your full name</h2>
                    <Input placeholder='e.g. John Smith' onChange={(event) => setUserName(event.target.value) } />
                </div>

                <div className='w-full'>
                    <h2 className='mt-5 mb-2 text-sm font-medium'>Enter your Email</h2>
                    <Input placeholder='e.g. john@gmail.com' onChange={(event) => setUserEmail(event.target.value) } />
                </div>

                <div className='text-amber-600 bg-amber-50 rounded-lg p-4 w-full mt-7'>
                    <h2 className='flex items-center gap-2 text-sm font-medium'>
                        <Info className='w-[20px]' /> Before you begin
                    </h2>
                    <ul className='p-2'>
                        <li className='text-sm'>• Ensure you have a stable internet connection</li>
                        <li className='text-sm'>• Test your camera and microphone</li>
                        <li className='text-sm'>• Find a quiet place for the interview</li>
                    </ul>
                </div>

                <Button 
                    className='w-full mt-5 bg-amber-500 cursor-pointer font-bold'
                    disabled={loading || !userName}
                    onClick={() => onJoinInterview()}
                >
                    <Video /> {loading && <Loader2Icon />} Join Interview
                </Button>
            </div>
        </div>
    )
}

export default Interview
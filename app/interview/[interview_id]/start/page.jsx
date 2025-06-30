"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation'
import { toast } from 'sonner'
import axios from 'axios'
import { supabase } from '@/services/supabaseClient'
import { useParams, useRouter } from 'next/navigation'

function StartInterview() {
  
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    const [activeUser, setActiveUser] = useState(false)
    const [conversation, setConversation] = useState()
    const {interview_id} = useParams();
    const router = useRouter()

    useEffect(() => {
        interviewInfo && startCall()
    },[interviewInfo])

    const startCall = () => {
        let questionList;
        
        interviewInfo?.interviewData?.questionList.forEach((item, index) => (
            questionList = item?.question + "," + questionList
        ))

        const assistantOptions = {
            name: "AI Recruter",
            firstMessage: "Hi "+ interviewInfo.userName + ", how are you? Ready for your interview on " + interviewInfo?.interviewData?.jobPosition + "?", 
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai", 
                model: "gpt-4", 
                messages: [
                    {
                        role: "system", 
                        content: `
                        You are an AI voice assistant conducting interviews.
                        Your job is to ask candidates provided interview questions, assess their responses.
                        Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
                        "Hey there! Welcome to your ` + interviewInfo?.interviewData?.jobPosition + ` interview. Let's get started with a few questions!"
                        Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
                        Questions: `+ questionList +`
                        If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
                        "Need a hint? Think about how React tracks component updates!"
                        Provide brief, encouraging feedback after each answer. Example:
                        "Nice! That's a solid answer."
                        "Hmm, not quite! Want to try again?"
                        Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!" After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
                        "That was great! You handled some tough questions well. Keep sharpening your skills!"
                        End on a positive note:
                        "Thanks for chatting! Hope to see you crushing projects soon!"
                        Key Guidelines:
                        Be friendly, engaging, and witty
                        Keep responses short and natural, like a real conversation
                        Adapt based on the candidate's confidence level
                        Ensure the interview remains focused on React`
                        .trim(),
                    },
                ],
            },
        };

        vapi.start(assistantOptions)
    }

    const stopInterview = () => {
        vapi.stop()
    }

    vapi.on('call-start', () => {
      console.log('Call started');
      toast('Call Connected...')
    });

    vapi.on('call-end', () => {
      console.log('Call ended');
      toast('Interview Ended');

      GenerateFeedback()
    });

    vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setActiveUser(false);
    });

    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setActiveUser(true);
    });

    vapi.on('message', (message) => {
      console.log(message?.conversation);
      setConversation(message?.conversation)
    });

    const GenerateFeedback = async () => {
        const result = await axios.post('/api/ai-feedback', {
            conversation: conversation
        })

        console.log(result?.data)

        const Content = result.data.content;
        const FINAL_CONTENT = Content.replace('```json', '').replace('```', '')
    
        
        const { data, error } = await supabase
            .from('interview_feedback')
            .insert([
                { userName: interviewInfo?.userName,
                  userEmail: interviewInfo?.userEmail,
                  interview_id: interview_id,
                  feedback: JSON.parse(FINAL_CONTENT),
                  recommended: false
                },
            ])
            .select()
        
        console.log(data)
        
        router.replace('/interview/completed')

    }

    return (
        <div className='p-20 lg:px-48 xl:px-56'>
            <h2 className='font-bold text-xl flex justify-between'>
                AI Interview Session
                <span className='flex gap-2 items-center'>
                    <Timer />
                    00:00:00
                </span>
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-4 items-center justify-center'>
                    <div className='relative'>
                        {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-100 opacity-75 animate-ping'></span>}
                        <Image src={'/user-avatar.png'} alt='user' 
                            width={200} height={200} className='w-[150px] h-[150px] rounded-full object-cover' />
                    </div>
                    <h2 className='text-xl font-bold'>AI Recruter</h2>
                </div>
                <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-4 items-center justify-center'>
                    <div className='relative'>
                        {activeUser && <span className='absolute inset-0 rounded-full bg-amber-500 opacity-75 animate-ping'></span>}
                        <h2 className='text-[48px] bg-amber-500 w-[150px] h-[150px] text-white rounded-full flex items-center justify-center'>
                            {interviewInfo?.userName[0]}
                        </h2>
                    </div>
                    <h2 className='text-xl font-bold'>{interviewInfo?.userName}</h2>
                </div>
            </div>

            <div className='flex items-center gap-7 justify-center mt-7'>
                <Mic className='h-12 w-12 p-3 text-white bg-gray-500 hover:bg-gray-400 rounded-full cursor-pointer' />
                <AlertConfirmation stopInterview={() => stopInterview()}>
                    <Phone className='h-12 w-12 p-3 text-white bg-red-500 hover:bg-red-400 rounded-full cursor-pointer' />
                </AlertConfirmation>
            </div>

            <h2 className='text-sm text-gray-400 text-center mt-7'>Interview In Progress...</h2>
        </div>
    )
}

export default StartInterview
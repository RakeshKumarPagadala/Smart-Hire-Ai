"use client"
import React from 'react'
import Image from 'next/image'
import { Clock,Info, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

function Interview() {

    const {interview_id} = useParams()
    console.log(interview_id)
    const [interviewData, setInterviewData] = useState()
    const [userName, setUserName] = useState()
    const [loading, setLoading] = useState(false)
    const [userEmail, setUserEmail] = useState()
    const {interviewInfo,setInterviewInfo} = useContext(InterviewDataContext)
    const router = useRouter()
    useEffect(()=>{
        interview_id && GetInterviewDetails()
    },[interview_id])

    const GetInterviewDetails = async () => {
        setLoading(true)
        try{
        let { data: interviews, error } = await supabase
            .from('interviews')
            .select("jobPosition, jobDescription, interviewDuration, type")
            .eq('interview_id', interview_id)
        setInterviewData(interviews[0])
        setLoading(false)
        if(interviews?.length==0){
            toast('Incorrect Interview Link')
            return
        }


    }catch(error){
        toast('Incorrect Interview ID or Link Expired')
        setLoading(false)
    }
    }

    const onJoinInterview =async () => {
        setLoading(true)
        let { data: interviews, error } = await supabase
            .from('interviews')
            .select('*')
            .eq('interview_id', interview_id)
            console.log(interviews[0])
            setInterviewInfo({
                userName:userName,
                userEmail:userEmail,
                interviewData:interviews[0]
            })
            router.push('/interview/'+interview_id+'/start')        
            setLoading(false)
    }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16'>
        <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52'>
            <Image src="/logo11.png" alt="logo" width={200} height={100}
                    className='w-[200px]'/>
            
            <h2 className='mt-5'>AI-Powered Interview Platform</h2>

            <Image src="/img1.png" alt="interview image" width={500} height={500}
                    className='w-[300px] my-5'/>

            <h2 className='font-bold text-xl'>Full Stack Developer</h2>
            <h2 className='flex items-center gap-2 text-gray-500 mt-3'><Clock className='w-4 h-4'/>30 Min</h2>

            <div className='w-full'>
                <h2 className='font-semibold'>Enter your full name</h2>
                <Input placeholder='e.g. Rakesh Kumar Pagadala' onChange={(e)=>setUserName(e.target.value)} className='mt-1'/>
            </div>
            <div className='w-full'>
                <h2 className='font-semibold'>Enter your email</h2>
                <Input placeholder='e.g. rakesh@gmail.com' onChange={(e)=>setUserEmail(e.target.value)} className='mt-1'/>
            </div>

            <div className='mt-5 p-4 bg-blue-100 gap-4 rounded-lg'>
                <div className='flex items-center gap-2 mb-1'>
                <Info className='text-primary'/>
                <h2 className='font-bold'>Before you begin</h2>
                </div>
                <ul className='ml-7 font-medium'>
                    <li className='text-sm text-primary'>- Ensure you have stable internet connection</li>
                    <li className='text-sm text-primary'>- Test your microphone and camera</li>
                    <li className='text-sm text-primary'>- Ensure you have a quiet environment</li>
                </ul>
                
            </div>
            <Button className='cursor-pointer w-full mt-5 font-bold'
            disabled={loading || !userName}
            onClick={()=>onJoinInterview()}
            ><Video/>{loading&&<Loader2Icon className='animate-spin'/>}Join Interview</Button>
        </div>
    </div>
  )
}

export default Interview
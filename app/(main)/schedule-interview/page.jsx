
"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import InterviewCard from '../dashboard/_components/InterviewCard'
import { useRouter } from 'next/navigation'
import { Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const ScheduledInterview = () => {

    const {user}=useUser()
    const [interviews,setInterviews]=useState([])
    const router=useRouter()
    useEffect(()=>{
        user&&getInterviewList()
    },[user])

    const getInterviewList=async()=>{
        const result = await supabase.from('interviews')
        .select('jobPosition,interviewDuration,interview_id,interview-feedback(userEmail)')
        .eq('userEmail',user?.email)
        .order('id', { ascending: false })  
        setInterviews(result.data)
    }
  return (
    <div className='mt-4'>
        <h2 className='text-2xl font-bold'>Interview List with Candidate Feedback</h2>
        {interviews?.length==0 &&
            <div className='flex flex-col items-center p-5 gap-3 mt-5 bg-white border border-gray-200 rounded-lg'>
                <Video className='h-10 w-10 text-blue-600'/>
                <h2>You don't have any interviews created yet</h2>
                <Button className='cursor-pointer' onClick={()=>router.push('/dashboard/create-interview')}>+ Create New Interview</Button>
            </div>
            }
            {interviews &&
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
                {interviews.map((interview,index)=>(
                    <InterviewCard key={index} interview={interview}
                    viewDetail={true}/>
                ))}
            </div>
            }
    </div>
  )
}

export default ScheduledInterview
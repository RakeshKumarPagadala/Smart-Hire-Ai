
"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Camera, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import InterviewCard from './InterviewCard'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function LatestInterviewList() {
    const [interviews, setInterviews] = useState([])
    const {user}=useUser()
    const router=useRouter()

    useEffect(()=>{
        user&&getInterviewList()
    },[user])

    const getInterviewList=async()=>{    
        let { data: interviews, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('userEmail',user?.email)
        .order('id', { ascending: false })
        .limit(6)

        setInterviews(interviews)
    }


    return (
        <div className='my-5'>
            <h2 className='text-2xl font-bold'>Previously Created Interviews</h2>

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
                    <InterviewCard key={index} interview={interview}/>
                ))}
            </div>
            }

        </div>
    )
}

export default LatestInterviewList
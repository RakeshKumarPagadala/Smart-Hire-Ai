"use client"
import React, { useEffect,useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient'
import InterviewDetailContainer from './_components/InterviewDetailContainer'
import CandidateList from './_components/CandidateList'

function InterviewDetail() {

    const {interview_id}=useParams()
    const {user}=useUser()
    const [interviewDetail,setInterviewDetail]=useState(null)

    useEffect(()=>{
        user&&getInterviewDetail()
    },[user])

    const getInterviewDetail=async()=>{
        const result = await supabase.from('interviews')
        .select(`jobPosition,jobDescription,type,questionList,interviewDuration,interview_id,created_at,interview-feedback(userEmail,userName,feedback,created_at)`) 
        .eq('userEmail',user?.email)
        .eq('interview_id',interview_id)

        setInterviewDetail(result?.data[0])
    }
    return (
        <div className='mt-4'>
            <h2 className='text-2xl font-bold'>Interview Details</h2>
            <InterviewDetailContainer interviewDetail={interviewDetail}/>
            {console.log('CandidateList debug:', interviewDetail?.['interview-feedback'])}
            <CandidateList candidateList={interviewDetail?.['interview-feedback'] || []}/>
        </div>
    )
}

export default InterviewDetail
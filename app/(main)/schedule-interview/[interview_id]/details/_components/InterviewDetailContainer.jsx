import React from 'react'
import {Clock, Calendar } from 'lucide-react'
import moment from 'moment'

function InterviewDetailContainer({interviewDetail}) {
  return (
    <div className='p-5 bg-white mt-4 rounded-lg'>
        <h2>{interviewDetail?.jobPosition}</h2>

        <div className='mt-4 flex items-center justify-between lg:pr-52'>
            <div>
            <h2 className='text-sm text-gray-500'>Duration</h2>
            <h2 className='flex text-sm font-bold items-center gap-2'><Clock className='h-4 w-4'/>{interviewDetail?.interviewDuration}</h2>
            </div>
            <div>
            <h2 className='text-sm text-gray-500'>Created On</h2>
            <h2 className='flex text-sm font-bold items-center gap-2'><Calendar className='h-4 w-4'/>{moment(interviewDetail?.created_at).format('MMM DD, yyyy')}</h2>
            </div>
            {interviewDetail?.type && <div>
            <h2 className='text-sm text-gray-500'>Type</h2>
            <h2 className='flex text-sm font-bold items-center gap-2'>{JSON.parse(interviewDetail?.type)}</h2>
            </div>}
        </div>
        <div className='mt-4'>
            <h2 className='font-bold'>Job Description</h2>
            <p className='text-sm leading-6'>{interviewDetail?.jobDescription}</p>
        </div>
        <div className='mt-4'>
            <h2 className='font-bold'>Interview Questions</h2>
            <div className='grid grid-cols-2 gap-3 mt-2'>
                {interviewDetail?.questionList?.map((item,index)=>(
                    <h2 className='text-xs' key={item?.id || index}>{index + 1}.{item?.question}</h2>
                ))}
            </div>
        </div>
    </div>
  )
}

export default InterviewDetailContainer
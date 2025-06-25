
"use client"
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import FormContainer from './_components/FormContainer'
import { InterviewType } from '@/services/Constants'
import QuestionList from './_components/QuestionList'
import { toast } from 'sonner'
import InterviewLink from './_components/InterviewLink'

function CreateInterview() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState()
    const [interviewId, setInterviewId] = useState()

    const onHandleInputChange=(field,value) => {
        setFormData(prev=>({ 
          ...prev, [field]: value 
        }))

        console.log('formData',formData)
    }
    const onGoToNextStep = () => {
        if(!formData?.jobPosition||!formData?.jobDescription||!formData?.interviewDuration||!formData?.type){
          toast('Please fill all the fields!')
          return;
        }
        setStep(step+1)
    }
    const onCreateLink = (interview_id) => {
      setInterviewId(interview_id)
      setStep(step+1)
    }

  return (
    <div className='mt-1 px-8 md:px-20 lg:px-40 xl:px-56'>
        <div className='flex items-center gap-3'>
            <ArrowLeft onClick={()=>router.back()} className='cursor-pointer'/>
            <h2 className='text-xl font-bold'>Create New Interview</h2>
        </div>
        <Progress value={step*33} className='my-4'/>
        {step==1?<FormContainer
        onHandleInputChange={onHandleInputChange}
        GoToNextStep={()=>onGoToNextStep()}/>:
            step==2?<QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> :
            step ==3?<InterviewLink interview_id={interviewId}
            formData={formData}
            /> :null}
    </div>
  )
}

export default CreateInterview
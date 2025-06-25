import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function FormContainer({onHandleInputChange, GoToNextStep}) {

    const [interviewType, setInterviewType] = useState([])

    useEffect(()=>{
        onHandleInputChange('type',interviewType)
    },[interviewType])

    const AddInterviewType = (type) => {
        const data =interviewType.includes(type)
        if(!data){
            setInterviewType(prev=>[...prev,type])
        }else{
            const result =interviewType.filter(item=>item!==type)
            setInterviewType(result)
        }
    }


      return (

    <div className='p-4 bg-white rounded-xl'>
        <div>
            <h2 className='text-sm font-medium'>Job Position</h2>
            <Input placeholder='e.g. Full Stack Developer'
             className='mt-2'
             onChange={(e)=>onHandleInputChange('jobPosition',e.target.value)}
             />
        </div>

        <div className='my-5'>
            <h2 className='text-sm font-medium'>Job Description</h2>
            <Textarea placeholder='Enter job description'
             className='h-[150px] mt-2'
             onChange={(e)=>onHandleInputChange('jobDescription',e.target.value)}/>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Duration</h2>
            <Select
            onValueChange={(value)=>onHandleInputChange('interviewDuration',value)}>
                <SelectTrigger className='w-full mt-2 cursor-pointer'>
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5 Min">5 Min</SelectItem>
                    <SelectItem value="15 Min">15 Min</SelectItem>
                    <SelectItem value="30 Min">30 Min</SelectItem>
                    <SelectItem value="45 Min">45 Min</SelectItem>
                    <SelectItem value="60 Min">60 Min</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Type</h2>
            <div className='flex gap-2 flex-wrap mt-2'>
                {InterviewType.map((item,index)=>(
                    <div key={index} className={`flex items-center gap-2 p-1 px-2
                     border border-gray-200 rounded-2xl cursor-pointer
                     hover:bg-secondary 
                     ${interviewType.includes(item.title) && 'text-blue-500'}`}

                     onClick={()=>AddInterviewType(item.title)}>
                        <item.icon className='w-4 h-4'/>
                        <span>{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-6 flex justify-end'>
            <Button className='flex items-center cursor-pointer'
            onClick={()=>GoToNextStep()}>Generate Questions <ArrowRight/></Button>
        </div>
    </div>
  )
}

export default FormContainer

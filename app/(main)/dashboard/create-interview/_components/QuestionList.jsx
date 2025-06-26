import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuestionListContainer from './QuestionListContainer'
import { supabase } from '@/services/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@/app/provider'

function QuestionList({formData,onCreateLink}) {
    const [loading, setLoading] = useState(true)
    const [questionList, setQuestionList] = useState([])
    const [saveLoading, setSaveLoading] = useState(false)
    const {user}=useUser()

    useEffect(()=>{
        if(formData){
            GenerateQuestionList()
        }
    },[formData])

    const GenerateQuestionList = async () => {
        setLoading(true)
        try{
            const result = await axios.post('/api/ai-model',{
                ...formData
            })
            console.log(result.data.content);

            const Content = result.data.content
            const FINAL_CONTENT = Content.replace('```json','').replace('```','')   
            setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions)
            setLoading(false)
        }catch(error){
            toast.error('Server Error, Please try again!')
            setLoading(false)
        }
    }

    const onFinish = async () => {
        setSaveLoading(true)
        const interview_id = uuidv4()
        // Debug: log what will be sent to Supabase
        console.log('Submitting to Supabase:', {
          ...formData,
          questionList,
          userEmail: user?.email,
          interview_id
        });
        const { data, error } = await supabase
            .from('interviews')
            .insert([
          { 
            ...formData,
            questionList: questionList,
            userEmail:user?.email,
            interview_id:interview_id
         },
        ])
        .select()
        setSaveLoading(false)
        if (error) {
          console.error('Supabase insert error:', error);
          toast.error('Supabase error: ' + error.message);
          return;
        }
        onCreateLink(interview_id)
    }

  return (
    <div>
        {loading&&
            <div className='p-4 bg-blue-100 border border-primary rounded-xl flex items-center gap-4'>
            <Loader2Icon className='animate-spin'/>
            <div>
                <h2 className='font-medium'>Generating Interview Questions...</h2>
                <p className='text-primary'>Our AI is crafting interview questions based on your job description and interview duration.</p>
            </div>

            </div>}
            {questionList?.length>0&&
            <div className=''>
                <QuestionListContainer questionList={questionList}/>
            </div>}
            <div className='flex justify-end mt-8'>
                <Button className='cursor-pointer' onClick={()=>onFinish()} disabled={saveLoading}>
                    {saveLoading&&<Loader2Icon className='animate-spin'/>}
                    Create Interview Link and Finish</Button>
            </div>
    </div>
  )
}


export default QuestionList

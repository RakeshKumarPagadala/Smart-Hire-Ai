
"use client"
import React,{useState} from 'react'
import { useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Timer } from 'lucide-react'
import TimerComponent from './_components/TimerComponent'
import Image from 'next/image'
import { Mic,Phone } from 'lucide-react'
import Vapi from '@vapi-ai/web'
import { useEffect } from 'react'
import AlertConfirmation from './_components/AlertConfirmation'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
import { supabase } from '@/services/supabaseClient'
import axios from 'axios' // fallback if 'post' is not defined

function StartInterview() {
  const {interviewInfo,setInterviewInfo} = useContext(InterviewDataContext)
  
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const {interview_id}=useParams()
  const [activeUser,setActiveUser]=useState(false)
  const [conversation,setConversation]=useState([])
  const router=useRouter()
  const [loading,setLoading]=useState(false)
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    interviewInfo && startCall()
  },[interviewInfo])

  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach((item,index) => {
      questionList=item?.question+","+questionList
    })
    const assistantOptions = {
    name: "AI Recruiter",
    firstMessage: "Hi "+interviewInfo?.userName+", how are you? Ready for your interview on "+interviewInfo?.interviewData?.jobPosition+"?",
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
"Hey there! Welcome to your `+interviewInfo?.interviewData?.jobPosition+` interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: `+questionList+`
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on React
`.trim(),
            },
        ],
    },
};
vapi.start(assistantOptions)

    }
    const stopInterview = async () => {
      try {
        setLoading(true);
        await vapi.stop();
        router.replace('/interview/' + (typeof interview_id === 'string' ? interview_id : interview_id?.interview_id || '') + '/completed');
      } catch (err) {
        console.error('Failed to stop interview:', err);
        setLoading(false);
      }
    }
    useEffect(() => {
      const handleMessage = (message) => {
        console.log('Message', message);
        if (message?.conversation) {
          setConversation(message.conversation); // store as array for SSR/CSR consistency
          console.log('Conversation:', message.conversation);
        }
      }

      vapi.on("message",handleMessage)
      vapi.on("call-start", () => {
        console.log("Call has started")
        toast('Call Connected')
        setTimerStarted(true);
      }) 
      vapi.on("speech-start", () => {
        console.log("Assistant speech has started")
        setActiveUser(false)
      })      
      vapi.on("speech-end", () => {
        console.log("Assistant speech has ended")
        setActiveUser(true)
      })  
      vapi.on("call-end", () => {
        console.log("Call has ended")
        toast('Interview Ended')
        setTimerStarted(false);
        GenerateFeedback()
      })  
      vapi.on("error", (err) => {
        if (err && err.errorMsg === "Meeting has ended") {
          toast('Meeting has Ended');
          return;
        }
        console.error(err);
      });
      return ()=>{
        vapi.off("message",handleMessage)
        vapi.off("call-start",()=>console.log("END"))
        vapi.off("speech-start",()=>console.log("END"))
        vapi.off("speech-end",()=>console.log("END"))
        vapi.off("call-end",()=>console.log("END"))
      }
    }, [])



    const GenerateFeedback = async () => {
      const result = await axios.post('/api/ai-feedback', {
        conversation: conversation
      });
      console.log(result?.data);
      const Content = result.data.content;

      const FINAL_CONTENT = Content.replace('```json', '').replace('```', '');
      console.log(FINAL_CONTENT);

      // Parse and ensure totalrating is present
      let feedbackObj = {};
      try {
        feedbackObj = JSON.parse(FINAL_CONTENT);
        if (
          feedbackObj?.feedback &&
          feedbackObj.feedback.rating &&
          (feedbackObj.feedback.rating.totalRating === undefined || feedbackObj.feedback.rating.totalRating === null)
        ) {
          // Defensive: support both spellings
          const technicalSkills = feedbackObj.feedback.rating.technicalSkills ?? feedbackObj.feedback.rating.techicalSkills;
          const { communication, problemSolving, experience } = feedbackObj.feedback.rating;
          const ratings = [technicalSkills, communication, problemSolving, experience].filter(n => typeof n === 'number');
          const avg = ratings.length ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;
          feedbackObj.feedback.rating.totalRating = avg;
        }
      } catch (e) {
        console.error('Failed to parse feedback JSON:', e, FINAL_CONTENT);
      }

      const { data, error } = await supabase
        .from('interview-feedback')
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: feedbackObj,
            recommended: false
          },
        ])
        .select();
      if (error) {
        console.error('Supabase insert error:', error);
        if (typeof window !== 'undefined' && window.toast) {
          toast('Failed to save feedback. Please try again.');
        }
        setLoading(false);
      } else {
        console.log('Feedback saved:', data);
        router.replace('/interview/' + interview_id + '/completed');
        setLoading(false);
      }
    };

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview session
        <span className='flex items-center gap-2'>
          <Timer/>
          <TimerComponent start={timerStarted} />
        </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <div className='relative'>
            {!activeUser && <span className='absolute inset-0 bg-blue-500 rounded-full opacity-75 animate-ping'/>}
          <Image src='/ai.png' alt="interview image" width={100} height={100}
                    className='w-[60px] h-[60px] rounded-full object-cover'/>
            </div>
              <h2>AI Interviewer</h2>
        </div>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <div className='relative'>
          {activeUser && <span className='absolute inset-0 bg-blue-500 rounded-full opacity-75 animate-ping'/>}
          <h2 className='font-bold bg-primary text-white p-3 text-2xl rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>    
      </div>
      <div className='flex items-center gap-5 mt-5 justify-center' >
        <Mic className='w-12 h-12 p-3 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400'/>
        {/*<AlertConfirmation stopInterview={()=>stopInterview()}>*/}

       {!loading ? < Phone className='w-12 h-12 p-3 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600'
       onClick={()=>stopInterview()}/>:
        <Loader2Icon className='animate-spin'/>}
        {/*</AlertConfirmation>*/}
        
      </div>
      <div className='flex flex-col items-center gap-2 mt-5'>
      <h2 className='text-sm text-gray-400 mt-5'>Interview In Progress.....</h2>
      </div>      
    </div>
  )
}

export default StartInterview
import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import { Copy, Send,ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useUser } from '@/app/provider'

const InterviewCard = ({interview,viewDetail=false}) => {
    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id
    const {user}=useUser()
    const onCopyLink = () => {
        navigator.clipboard.writeText(url)
        toast('Link Copied to clipboard')
    }
    const onSendLink = () => {
        window.location.href ="mailto:"+user?.email+"?subject="+interview?.jobPosition+"&body=Interview Link: "+url
    }

  return (
    <div className='p-5 bg-white border rounded-lg'>
        <div className='flex items-center justify-between'>
            <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
        </div>
        <h2 className='text-lg font-bold mt-2'>{interview?.jobPosition}</h2>
        <h2 className=' mt-2 flex justify-between text-gray-500'>{interview?.interviewDuration}
                <span className='text-green-700'>{interview['interview-feedback']?.length} Candidates</span>
            </h2>
            {!viewDetail ?
            <div className='flex gap-15 mt-2 w-full'>
                <Button className={'cursor-pointer text-primary'} variant="outline" onClick={onCopyLink}><Copy className='text-primary'/>Copy Link</Button>
                <Button className={'cursor-pointer w-[120px]'} onClick={onSendLink}><Send/>Send</Button>
            </div>
            :
            <Link href={`/schedule-interview/${interview?.interview_id}/details`}>
            <Button variant="outline" className='cursor-pointer mt-2 w-full'>View Details<ArrowRight/></Button>
            </Link>
            }
    </div>
  )
}

export default InterviewCard
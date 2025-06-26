import { Phone, Video } from 'lucide-react'
import React from 'react'
import Link from 'next/link'


function CreateOptions() {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <Link href='/dashboard/create-interview' className='bg-white
             border border-gray-200 p-4 rounded-lg cursor-pointer'>
                <Video className='p-3 text-blue-600 bg-blue-50 rounded-lg w-10 h-10'/>
                <h2 className='font-bold'>Create New Interview</h2>
                <p className='text-gray-500'>Create AI interviews and Schedule them with Candidates</p>
            </Link>
        </div>
    )
}

export default CreateOptions
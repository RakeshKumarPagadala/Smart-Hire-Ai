import React from 'react'
import Image from 'next/image'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
        <Image src="/logo11.png" alt="logo" width={200} height={100}
        className='w-[200px]'/>
    </div>
  )
}

export default InterviewHeader
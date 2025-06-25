import React from 'react'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewList from './_components/LatestInterviewList'
function Dashboard() {
  return (
    <div >
        <div>
            <h2 className='text-2xl font-bold my-2'>Dashboard</h2>
            <CreateOptions/>
            <LatestInterviewList/>
        </div>
    </div>
  )
}

export default Dashboard
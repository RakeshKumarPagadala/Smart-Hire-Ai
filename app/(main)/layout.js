import React from 'react'
import DashboardProvider from './provider'

function DashboardLayout({children}) {
  return (
    <div className='bg-gradient-to-br from-teal-100 to-orange-100'>
        <DashboardProvider>
            <div className='p-8'>
                {children}
            </div>
        </DashboardProvider>
    </div>
  )
}

export default DashboardLayout
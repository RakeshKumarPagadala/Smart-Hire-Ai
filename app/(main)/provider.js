import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import WelcomeContainer from './dashboard/_components/WelcomeContainer'
import { AppSidebar } from './_components/AppSidebar'

function DashboardProvider({children}) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className='w-full p-8'>
            <WelcomeContainer/>
            {children}
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider
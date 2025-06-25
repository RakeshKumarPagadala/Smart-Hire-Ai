"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { SidebarMenuItem, SidebarMenu } from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/Constants.js"
import Link from 'next/link'  
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'


  export function AppSidebar() {
    const path = usePathname()
    const router = useRouter()
    return (
      <Sidebar>
        <SidebarHeader className='bg-gradient-to-br from-teal-100 to-orange-100 flex items-center' >
            <Image src='/logo11.png' alt='logo' 
            width={300} height={500} priority
            className='w-[300px]h-[150px]'
            />

            <Button onClick={() => router.push('/dashboard/create-interview')} className='w-full rounded-full mt-2 font-semibold'><Plus/> Create New Interview</Button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className='bg-gradient-to-br from-teal-100 to-orange-100 font-semibold text-black'>
            <SidebarContent>
                <SidebarMenu>
                    {SidebarOptions.map((option,index) => (
                        <SidebarMenuItem key={index} className='p-1'>
                            <SidebarMenuButton asChild className={`p-5 ${path === option.href && 'bg-blue-100'}`}>
                                <Link href={option.href}>
                                    <option.icon className='w-6 h-6' />
                                    <span className={`text-[16px] ${path === option.href && 'text-blue-500'}`}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                
            </SidebarContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button
            className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full font-semibold mt-2 cursor-pointer"
            onClick={async () => {
              await import('@/services/supabaseClient').then(({ supabase }) => supabase.auth.signOut());
              window.location.href = '/';
            }}
          >
            Sign Out
          </Button>
        </SidebarFooter>
      </Sidebar>
    )
  }
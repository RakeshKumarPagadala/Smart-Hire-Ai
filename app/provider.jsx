
"use client"
import React,{useState,useContext} from 'react'
import { supabase } from '@/services/supabaseClient'
import { useEffect } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'

function Provider( {children}) {
    const [user,setUser]=useState()

    useEffect(()=>{
        CreateNewUser()
    },[])

    const CreateNewUser=()=>{
        supabase.auth.getUser().then(async({data:{user}})=>{
            let { data: User, error } = await supabase
            .from('User')
            .select("*")
            .eq('email',user?.email)
            console.log(User)
            if(User?.length==0){
                let { data, error } = await supabase
                .from('User')
                .insert([
                    {
                        email:user?.email,
                        name:user?.user_metadata?.name,
                        picture:user?.user_metadata?.picture
                    },
                ])
                .select();
                console.log(User)
                setUser(data)
                return
            }
            setUser(User[0])
        })
    }

  return (
    <UserDetailContext.Provider value={{user,setUser}}>
      {children}
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUser=()=>{
    const context=useContext(UserDetailContext)
    return context
}
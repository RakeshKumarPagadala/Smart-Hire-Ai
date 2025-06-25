
"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.replace('/dashboard');
            }
        };
        checkSession();
        // Listen for sign-in events
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                router.replace('/dashboard');
            }
        });
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [router]);

    const signWithGoogle=async()=>{
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
          if (error) {
            console.error('Error signing in with Google:', error.message)
          }
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className='flex flex-col items-center border rounded-2xl p-6'>
            <Image src='/logo11.png' alt='logo' 
            width={300} height={500} 
            className='w-[300px]h-[150px]'
            />
            <div className='flex flex-col items-center gap-4 mt-2'>
                <Image src='/loginimage.png' alt='login image' 
                    width={600}
                    height={400}
                    className='w-[400px] h-[250px] rounded-2xl mt-2'
                />
                <h2 className='text-2xl font-bold text-center'>Welcome to Smart Hire AI</h2>
                <p className='text-gray-500 text-center'>Sign in to your account</p>
                <Button className='cursor-pointer w-full text-white bg-black hover:bg-gray-900 py-2 px-4 rounded-full'
                onClick={signWithGoogle}>
                    Login with Google
                </Button>

        </div>
        </div>
        

    </div>
  )
}

export default Login
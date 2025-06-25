"use client";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';

export default function Home() {
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

  const signWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-orange-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo11.png" alt="Smart Hire AI Logo" width={48} height={48} className="rounded-lg" />
          <span className="text-xl font-bold text-gray-700">Smart Hire AI</span>
        </div>
        <div className="flex gap-4">
          <Button className="cursor-pointer hover:bg-gray-700 font-semibold" onClick={signWithGoogle}>Login</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center flex-1 px-8 py-12 gap-10 max-w-7xl mx-auto w-full">
        {/* Left: Info */}
        <div className="flex-1 flex flex-col justify-center items-start gap-6">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-2">AI-powered Interview Platform</h1>
          <p className="text-lg text-gray-600 mb-4">Streamline your hiring process with automated, interactive, and insightful AI interviews. Save time, reduce bias, and make smarter hiring decisions.</p>
          <Button className="mt-6 px-8 py-3 text-lg rounded-full cursor-pointer hover:bg-gray-700" onClick={signWithGoogle}>Get Started</Button>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center">
          <Image src="/loginimage.png" alt="Interview Illustration" width={500} height={350} className="rounded-2xl shadow-lg w-full max-w-md" />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-white/90 py-12 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">How to Use ?</h2>
        <ol className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700 list-decimal list-inside">
          <li>
            <span className="font-semibold text-teal-700">Sign Up / Login:</span> Create your account or log in using Google authentication.
          </li>
          <li>
            <span className="font-semibold text-teal-700">Create an Interview:</span> Fill in job details, select interview type and duration, and let the AI generate tailored questions.
          </li>
          <li>
            <span className="font-semibold text-teal-700">Schedule & Share Link:</span> Schedule interviews and share the unique link with candidates.
          </li>
          <li>
            <span className="font-semibold text-teal-700">Candidate Joins & Completes Interview:</span> Candidates join via the link, answer questions, and interact with the AI interviewer.
          </li>
          <li>
            <span className="font-semibold text-teal-700">Get AI Feedback & Analytics:</span> Instantly receive detailed feedback, ratings, and recommendations for each candidate.
          </li>
          <li>
            <span className="font-semibold text-teal-700">Track & Hire:</span> Review all interviews in your dashboard and make data-driven hiring decisions.
          </li>
        </ol>
      </section>
    </div>
  );
}



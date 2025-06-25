"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CompletedPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 to-orange-100 p-6">
      <div className="mb-5">
        <Image src="/checkbox.png" alt="Completed" width={80} height={80} />
      </div>
      <h1 className="text-2xl font-bold mb-2 text-center">Thank you for your participation!</h1>
      <div className="mb-6">
        <Image src="/i.png" alt="Celebrate" width={350} height={350} />
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold mb-8"
        onClick={() => router.push("/")}
      >
        Next
      </button>
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md text-center">
        <h2 className="text-lg font-semibold mb-2">What's next...</h2>
        <p className="text-gray-600">
          Our recruiter will reach out to you soon with feedback and next steps. Keep an eye on your email!
        </p>
      </div>
    </div>
  );
}

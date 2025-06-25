"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from '@/services/supabaseClient';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setLoading(true);
    setError("");
    try {
      await supabase.auth.signOut();
      window.location.href = "/auth";
    } catch (err) {
      setError("Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>
      <div className="flex flex-col gap-6">
        {/* Add more settings here as needed */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <Button 
            className="w-full bg-red-600 text-white hover:bg-red-700 cursor-pointer font-semibold py-2 px-4 rounded-full"
            onClick={handleSignOut}
            disabled={loading}
          >
            {loading ? "Signing Out..." : "Sign Out"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

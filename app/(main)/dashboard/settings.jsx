"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from '@/services/supabaseClient';

import React from 'react';

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
    <div className="p-8 bg-white rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Settings (Coming Soon)</h1>
      <p>This page is under development. Please check back later.</p>
    </div>
  );
}

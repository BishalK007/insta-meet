'use client'
import Image from 'next/image'

import React from 'react';

export default function Home() {
  // Dummy function to redirect to Google
  const redirectToGoogle = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Meeting Page</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={redirectToGoogle}>
        Join Meeting
      </button>
    </div>
  );
}


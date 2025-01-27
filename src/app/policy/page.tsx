'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function PolicyPage() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded]);

  // Show a loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const handleAgree = () => {
    try {
      localStorage.setItem('policyAgreed', 'true');
      router.push('/');
    } catch (error) {
      console.error('Error saving policy agreement:', error);
    }
  };

  // Your existing JSX remains exactly the same
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-black text-white">
      <div className="max-w-2xl w-full bg-[#1F2937] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-white">Terms and Policy</h1>
        
        <div className="mb-6 h-[400px] overflow-y-auto bg-[#374151] p-6 rounded custom-scrollbar">
          {/* Your existing content remains the same */}
          <h2 className="text-xl mb-4 text-white">Terms of Service</h2>
          <p className="mb-6 text-gray-300">
            Welcome to KaraokeGoGo. Before using your account, please read and agree to the following terms:
          </p>
          <div className="space-y-6">
            {/* All your existing sections remain exactly the same */}
            <section>
              <h3 className="text-lg font-semibold mb-2 text-[#FF4081]">1. Service Usage</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>This service is designed for language learners of all ages worldwide. Minors must have parental or guardian consent as required by their local laws.</li>
                <li>Parents or guardians are responsible for account creation and management according to their local legal requirements.</li>
                <li>All usage must comply with applicable local laws and regulations in the user's jurisdiction.</li>
              </ul>
            </section>

            {/* Your other sections remain the same */}
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="agree"
            className="mr-3 h-4 w-4 accent-[#FF4081]"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <label htmlFor="agree" className="text-gray-300">
            I have read and agree to the Terms and Policy
          </label>
        </div>

        <button
          onClick={handleAgree}
          disabled={!isAgreed}
          className={`w-full py-3 px-4 rounded transition-colors ${
            isAgreed 
              ? 'bg-[#FF4081] hover:bg-opacity-90 text-white' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to App
        </button>
      </div>
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Cookies from 'js-cookie';

export default function PolicyPage() {
  const router = useRouter();
  const { isLoaded } = useAuth();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
      
      // Block back button navigation
      const preventBack = () => {
        window.history.forward();
      };
      
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', preventBack);
      
      return () => {
        window.removeEventListener('popstate', preventBack);
      };
    }
  }, [isLoaded]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const handleAgree = () => {
    try {
      Cookies.set('policyAgreed', 'true', { expires: 365 });
      router.push('/');
    } catch (error) {
      console.error('Error saving policy agreement:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1F2937] rounded-lg shadow-lg">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Terms and Policy</h1>
            
            <div className="bg-[#374151] rounded-lg p-6" style={{ height: '60vh', overflowY: 'auto' }}>
              <h2 className="text-xl mb-4">Terms of Service</h2>
              <p className="mb-6 text-gray-300">
                Welcome to KaraokeGoGo. Before using your account, please read and agree to the following terms:
              </p>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-2 text-[#FF4081]">1. Service Usage</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>This service is designed for language learners of all ages worldwide. Minors must have parental or guardian consent as required by their local laws.</li>
                    <li>Parents or guardians are responsible for account creation and management according to their local legal requirements.</li>
                    <li>All usage must comply with applicable local laws and regulations in the user's jurisdiction.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2 text-[#FF4081]">2. Content Guidelines</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Users must respect copyright and intellectual property rights.</li>
                    <li>Inappropriate or offensive content is not permitted.</li>
                    <li>Content moderation guidelines must be followed.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2 text-[#FF4081]">3. Privacy Policy</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>We collect and process personal data as described in our Privacy Policy.</li>
                    <li>User data is protected and handled according to applicable privacy laws.</li>
                    <li>Users have rights regarding their personal data as outlined in the Privacy Policy.</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-700">
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
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
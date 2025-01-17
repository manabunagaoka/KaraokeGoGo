'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PolicyPage() {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = () => {
    localStorage.setItem('policyAgreed', 'true');
    router.push('/');  // Redirects to main app after accepting
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-black text-white">
      <div className="max-w-2xl w-full bg-[#1F2937] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-white">Terms and Policy</h1>
        
        <div className="mb-6 h-[400px] overflow-y-auto bg-[#374151] p-6 rounded custom-scrollbar">
          <h2 className="text-xl mb-4 text-white">Terms of Service</h2>
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
                <li>Users must only use music and content they have proper rights or permissions to use.</li>
                <li>Users are responsible for ensuring their content usage complies with copyright and intellectual property laws in their region.</li>
                <li>Content must be appropriate for an educational environment.</li>
                <li>Users must obtain necessary licenses or permissions before using any third-party content.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-[#FF4081]">3. Service Terms</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>We reserve the right to moderate content to maintain an educational environment.</li>
                <li>The service is provided "as is" without any warranties.</li>
                <li>Users are responsible for complying with their local laws and regulations.</li>
                <li>We may update these terms at any time with or without notice to users.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-[#FF4081]">4. Privacy & Data</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>We collect minimal data necessary for educational purposes.</li>
                <li>User data is handled securely and confidentially in accordance with applicable privacy laws.</li>
                <li>Users or their guardians can request data deletion at any time.</li>
                <li>Data handling complies with international privacy standards and local regulations.</li>
              </ul>
            </section>
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
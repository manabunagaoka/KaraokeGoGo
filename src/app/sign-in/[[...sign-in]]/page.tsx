'use client';

import { useUser, SignIn } from '@clerk/nextjs';

export default function Home() {
  const { isLoaded } = useUser();

  console.log('Rendering home page');

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <SignIn 
        appearance={{
          baseTheme: 'dark',
          variables: {
            colorPrimary: '#FF4081',
            colorBackground: '#000000',
            colorInputBackground: '#374151',
            colorInputText: '#FFFFFF',
            colorText: '#FFFFFF',
            colorTextSecondary: '#FFFFFF',
          },
          elements: {
            formButtonPrimary: {
              backgroundColor: '#FF4081',
              color: 'white',
            },
            card: {
              backgroundColor: '#1F2937',
              borderRadius: '0.5rem',
            }
          }
        }}
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
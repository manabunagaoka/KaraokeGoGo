'use client';

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <SignUp 
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
            },
            headerTitle: {
              color: 'white',
            },
            headerSubtitle: {
              color: '#9CA3AF',
            },
            formFieldInput: {
              backgroundColor: '#374151',
              borderColor: '#4B5563',
              color: 'white',
            },
            formFieldLabel: {
              color: '#9CA3AF',
            },
            footer: {
              color: '#9CA3AF',
            },
            footerActionLink: {
              color: '#FF4081',
              textDecoration: 'none',
            },
            alternativeMethodsBlockButton: {
              color: '#FF4081 !important',  // "Use phone" link
              textDecoration: 'none',
            },
            phoneNumberInput: {
              backgroundColor: '#374151',
              borderColor: '#4B5563',
              color: 'white',
            }
          }
        }}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/policy"
        redirectUrl="/policy"
        signUpConfig={{
          authenticateWith: "email_or_phone"
        }}
      />
    </div>
  );
}
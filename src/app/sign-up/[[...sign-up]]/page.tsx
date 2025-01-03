'use client';
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
            colorSuccess: '#4CAF50',
            colorTextOnPrimaryBackground: '#FFFFFF',
          },
          elements: {
            formButtonPrimary: {
              backgroundColor: '#FF4081',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 64, 129, 0.9)',
              },
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
            },
            phoneNumberInput: {
              backgroundColor: '#374151',
              borderColor: '#4B5563',
              color: 'white',
              '& .cl-selectButton__countryCode': {
                color: 'white !important',
                '& p': { color: 'white !important' },
                '& svg': { color: 'white !important' }
              },
              '& .cl-internal-mladhl': { color: 'white !important' },
              '& .cl-internal-1uuhexx': { color: 'white !important' }
            },
            formFieldInfoText: {
              color: '#9CA3AF !important',
            },
            alertText: {
              color: '#9CA3AF !important',
            },
            formFieldSuccessText: {
              color: '#4CAF50 !important',
            }
          }
        }}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
        initialValues={{
          emailAddress: "",
          phoneNumber: ""
        }}
        formFieldsConfig={{
          emailAddress: {
            type: "email",
            required: false
          },
          phoneNumber: {
            type: "tel",
            required: false
          },
          password: {
            type: "password",
            required: true
          }
        }}
        signUpConfig={{
          authenticateWith: "any"
        }}
      />
    </div>
  );
}
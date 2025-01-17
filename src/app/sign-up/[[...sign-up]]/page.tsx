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
            },
            verifyPasswordText: {
              color: '#4CAF50 !important',
            },
            passwordStrengthText: {
              color: '#4CAF50 !important',
            },
            passwordRequirementsText: {
              color: '#4CAF50 !important',
            },
            otpInput: {
              backgroundColor: '#374151',
              borderColor: '#4B5563',
              color: 'white !important',
            },
            identityPreviewText: {
              color: 'white !important',
            },
            identityPreviewEditButton: {
              color: '#FF4081 !important',
            },
            formFieldAction: {
              color: '#FF4081 !important',
            },
            // Additional verification styles
            verificationCodeInput: {
              backgroundColor: '#374151',
              color: 'white !important',
              borderColor: '#4B5563',
            },
            input: {
              backgroundColor: '#374151',
              color: 'white',
            },
            dividerText: {
              color: '#9CA3AF',
            },
            formResendCodeLink: {
              color: '#FF4081 !important',
            }
          }
        }}
        localization={{
          signUp: {
            start: {
              title: "Create your account",
              subtitle: "to continue to KaraokeGoGo"
            },
            verifyEmailCode: {
              title: "Verify your email",
              subtitle: "Enter the verification code sent to your email",
              resendButton: "Didn't receive a code? Resend"
            },
            verifyPhoneCode: {
              title: "Verify your phone number",
              subtitle: "Enter the verification code sent to your phone",
              resendButton: "Didn't receive a code? Resend"
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
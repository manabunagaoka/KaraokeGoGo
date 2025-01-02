'use client';
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SignUp 
        appearance={{
          // ... keep your existing appearance config ...
        }}
        signInUrl="/sign-in"
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"
        unsafeMetadata={{
          requireOnlyOneContact: true
        }}
        formFields={{
          email: {
            required: false,
            label: "Email (or use phone instead)"
          },
          phoneNumber: {
            required: false,
            label: "Phone (or use email instead)"
          },
          password: {
            required: true,
            label: "Password (required)"
          }
        }}
      />
    </div>
  );
}
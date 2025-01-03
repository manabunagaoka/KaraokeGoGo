import { SignUp } from "@clerk/nextjs";

export const CustomSignUp = () => (
  <SignUp
    path="/sign-up"
    routing="path"
    signInUrl="/sign-in"
    afterSignUpUrl="/"
    appearance={{
      elements: {
        formButtonPrimary: 'bg-accent hover:bg-accent-hover',
        card: 'bg-dark-800',
        headerTitle: 'text-gray-100',
        headerSubtitle: 'text-gray-300',
      },
    }}
    formFields={[
      {
        name: "email_address",
        label: "Email address",
        type: "email",
        required: false,
      },
      {
        name: "phone_number",
        label: "Phone number",
        type: "tel",
        required: false,
      },
    ]}
  />
);
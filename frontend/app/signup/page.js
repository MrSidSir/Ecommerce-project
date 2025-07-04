// app/signup/page.js
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 sm:px-0">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
        <SignupForm />
      </div>
    </div>
  );
}
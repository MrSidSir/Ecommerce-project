 'use client';

import SignupForm from "@/components/auth/SignupForm";
import { useTranslation } from "react-i18next";

export default function SignupPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 sm:px-0">
      <div className="w-full">
        <SignupForm />
      </div>
    </div>
  );
}
'use client';
// ✅ WORKING FUNCTION: Login page rendering LoginForm
import LoginForm from "@/components/auth/LoginForm";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 sm:px-0 ">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}

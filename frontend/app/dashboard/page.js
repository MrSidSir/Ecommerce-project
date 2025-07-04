// ✅ WORKING FUNCTION: Renders Dashboard component as a page
"use client";
import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();
  return <Dashboard />;
}


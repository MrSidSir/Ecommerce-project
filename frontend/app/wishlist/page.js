"use client";

import React from "react";
import CompleteWishlistPage from "@/components/wishlist/wishlist";
import { useTranslation } from "react-i18next";

export default function WishlistPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 min-h-screen px-2 sm:px-0">
      <CompleteWishlistPage />
    </div>
  );
};

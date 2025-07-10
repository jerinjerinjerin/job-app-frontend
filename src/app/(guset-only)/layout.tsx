// app/(guest-only)/layout.tsx or similar
"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import Script from "next/script";
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { refreshUserToken } from '@/lib/redux/actions/auth';
import { AppDispatch, RootState } from "@/lib/redux/store";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    dispatch(refreshUserToken())
  }, [dispatch])

  if (currentUser?.refreshToken) {
    router.push('/')
  }

  return (
    <>
      {/* ✅ Use <Script> directly inside component */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />

      <div className="relative min-h-screen w-full overflow-hidden">
        <Image
          src="/images/auth.png"
          alt="Auth Background"
          fill
          priority
          className="object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/80 z-50" />
        <main className="relative z-60 flex justify-center items-center min-h-screen p-4">
          {children}
        </main>
      </div>
    </>
  );
}

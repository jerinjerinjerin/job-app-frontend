import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/redux/store";

const GuestHeroSection = () => {


  const { currentUser } = useSelector((state: RootState) => state.auth);

  const isUser = currentUser?.user.email

  console.log('user', isUser)

  return (
    <section
      className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center px-4
        bg-gradient-to-br from-indigo-200 via-purple-300 to-pink-200 
        dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500"
    >
      {/* ✅ Content */}
      <div className="relative z-10 text-center max-w-3xl px-4 space-y-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white leading-snug">
          Find your dream job or hire top talent with{" "}
          <span className="text-blue-700 dark:text-blue-400">Jerin Job App</span>
        </h1>

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Whether you&apos;re looking to launch your career or grow your team, Jerin connects passionate professionals with the right opportunities. Search jobs, apply in seconds, post openings, and hire faster — all in one modern platform.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href={isUser ? '/update-user' : '/login'}>
            <Button
              variant="outline"
              className="w-full sm:w-auto cursor-pointer bg-white text-black dark:bg-transparent dark:text-white dark:border-white px-6 py-3 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuestHeroSection;

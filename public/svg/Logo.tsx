// app/components/Logo.tsx or wherever you keep your components

"use client";

import React from "react";

const Logo = () => {
  return (
    <svg
      width="180"
      height="50"
      viewBox="0 0 300 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="jerinGrad" x1="0" y1="0" x2="300" y2="0">
          <stop offset="0%" stopColor="#6D28D9" />   {/* purple-700 */}
          <stop offset="50%" stopColor="#DB2777" />  {/* pink-600 */}
          <stop offset="100%" stopColor="#14B8A6" /> {/* teal-500 */}
        </linearGradient>
      </defs>
      <text
        x="0"
        y="40"
        fontFamily="Segoe UI, Roboto, sans-serif"
        fontSize="36"
        fontWeight="700"
        fill="url(#jerinGrad)"
      >
        Jerin Job
      </text>
    </svg>
  );
};

export default Logo;

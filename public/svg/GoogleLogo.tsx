import React from 'react';

const GoogleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-label="Google"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#4285F4" d="M23.4 12.2c0-0.6-0.1-1.2-0.1-1.8H12v3.4h6.5c-0.3 1.8-1 3.4-2.1 4.6l3.3 2.6c1.9-1.7 3.3-4.3 3.3-7.8z"/>
    <path fill="#34A853" d="M12 24c2.9 0 5.3-0.9 7-2.5l-3.3-2.6c-0.9 0.6-2 1-3.7 1-2.8 0-5.1-1.9-5.9-4.5L1.8 14.1C3.4 18.9 7.4 22 12 22z"/>
    <path fill="#FBBC05" d="M6.1 15.4c-0.2-1-0.2-2-0.2-3.1s0-2.1 0.2-3.1L1.8 6.7C1 8.4 1 10.3 1 12s0 3.6 0.8 5.3l4.3-2.7z"/>
    <path fill="#EA4335" d="M12 4.8c1.6 0 3 0.5 4.1 1.6l3.1-3.1C17.3 1.5 14.8 0 12 0 7.4 0 3.4 3.1 1.8 6.7l4.3 2.6C6.9 7 9.2 4.8 12 4.8z"/>
  </svg>
);

export default GoogleLogo;

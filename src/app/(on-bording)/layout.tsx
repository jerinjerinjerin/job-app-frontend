"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Theme from '@/components/theme/Theme';
import { Button } from '@/components/ui/button'; 
import { Loader } from '@/lib/loader/Loader';
import { refreshUserToken, logoutUser } from '@/lib/redux/actions/auth';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { ChildrenNode } from '@/utils/types';

import Logo from '../../../public/svg/Logo';

const OnBordingLayout: React.FC<ChildrenNode> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { currentUser, currentUserLoading } = useSelector(
    (state: RootState) => state.auth
  );

  React.useEffect(() => {
    dispatch(refreshUserToken());
  }, [dispatch]);

  React.useEffect(() => {
    if (!currentUserLoading && !currentUser?.user.email) {
      router.push('/');
    }
  }, [currentUserLoading, currentUser, router]);

  if(currentUserLoading){
    return <div className='w-full h-screen flex items-center justify-center'>
        <Loader/>
    </div>
  }

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Logo  />
              </div>
            </Link>
          </div>

          {/* Center - Welcome */}
          <div className="hidden sm:block text-center text-sm sm:text-base font-medium text-white">
            Welcome, {currentUser?.user?.name || currentUser?.user?.email || "User"}
          </div>

          {/* Right - Logout */}
          <div className='flex items-center gap-3'>
             <Theme />
            <Button
              variant="outline"
              className="dark:text-white text-black dark:border-white border-black dark:bg-black bg-white cursor-pointer transition"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="px-4 py-6">
        {children}
      </main>
    </>
  );
};

export default OnBordingLayout;

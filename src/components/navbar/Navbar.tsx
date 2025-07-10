"use client";

import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { refreshUserToken } from '@/lib/redux/actions/auth';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { navBarItems } from '@/utils/menu';

import Logo from '../../../public/svg/Logo';
import Theme from '../theme/Theme';
import { Button } from '../ui/button';
import  UserDropDown from '../user/UserDropdown';

import MobileNavItem from './MobileNaveItem';

const Navbar = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { currentUser } = useSelector((state:RootState) => state.auth)

  React.useEffect(() => {
  dispatch(refreshUserToken());
}, [dispatch]);

  return (
    <nav
  className="
    w-full h-[100px] shadow-md px-5
    bg-gradient-to-r
    from-purple-500 to-pink-500
    dark:from-slate-900 dark:to-slate-700
    flex items-center justify-between
  "
>
  {/* Logo */}
  <div className="flex items-center">
    <Logo />
  </div>

  {/* Desktop Nav */}
  <div className="hidden lg:flex items-center gap-4">
    {navBarItems.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className="flex items-center gap-2 px-4 py-2 rounded-md 
          text-slate-800 dark:text-white font-semibold 
          bg-transparent
          transition-colors duration-200"
      >
        {item.icon}
        <span>{item.name}</span>
      </Link>
    ))}
  </div>

  {/* Theme & Auth */}
  <div className="flex items-center gap-2 md:gap-3">
    <Theme />
    {currentUser ? (
      <UserDropDown 
        email={currentUser.user.email}
        name={currentUser.user.name}
        image={currentUser.user.profilePic}
      />
    ) : (
      <Link href={'/login'}>
      
        <Button className="dark:bg-slate-700 cursor-pointer dark:text-white bg-white dark:hover:bg-slate-800 hover:bg-white text-slate-900 rounded-sm border dark:border-white border-slate-900">
          Login
        </Button>
      </Link>
    )}
    <div className="block lg:hidden">
    <MobileNavItem/>
    </div>
  </div>
</nav>

  )
}

export default Navbar
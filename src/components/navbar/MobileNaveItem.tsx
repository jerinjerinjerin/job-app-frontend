"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { navBarItems } from "@/utils/menu";



const MobileNavItem:React.FC = () => {
  return (
    <div className="block lg:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <Menu className="w-6 h-6 text-white dark:text-slate-200 cursor-pointer" />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-52 bg-white dark:bg-slate-900 rounded-md shadow-md"
        >
          <div className="flex flex-col gap-2">
            {navBarItems.map((item, index) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-md
                    text-slate-800 dark:text-white font-medium
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    transition-colors duration-200"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
                {index !== navBarItems.length - 1 && (
                  <Separator className="my-1 dark:bg-slate-700 bg-slate-200" />
                )}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MobileNavItem;

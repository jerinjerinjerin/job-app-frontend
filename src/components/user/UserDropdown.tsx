"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader } from "@/lib/loader/Loader";
import { logoutUser } from "@/lib/redux/actions/auth";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { userDropDownData } from "@/utils/menu";

import { Button } from "../ui/button";

interface Props {
  email: string;
  image: string;
  name: string;
}

const UserDropDown: React.FC<Props> = ({ image }) => {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userLogOutLoading, userLogOutError } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success('logout successful')
      router.push("/login");
    } else {
      console.error("Logout failed:", result.payload);
      toast.error(userLogOutError)
    }
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={image ? image : "https://github.com/shadcn.png"} alt="profile image" />
            <AvatarFallback>JJ</AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent
          className="w-64 p-2 rounded-xl shadow-xl bg-white dark:bg-slate-900"
          align="end"
        >
          <div className="flex flex-col space-y-1 divide-y divide-muted/40 dark:divide-muted/30">
            {userDropDownData.map((item) => (
              <div key={item.name} className="pt-1.5">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted dark:hover:bg-slate-800 transition-colors"
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                ) : (
                  <Button
                    onClick={handleLogout}
                    disabled={userLogOutLoading}
                    className="w-full flex cursor-pointer items-center gap-3 p-2 rounded-md hover:bg-slate-200 bg-white text-black dark:hover:bg-slate-800 dark:bg-black dark:text-white dark:hover:text-white transition-colors text-left"
                  >

                    {
                      userLogOutLoading ? (<><Loader /></>) : (<>
                        {item.icon}
                        <span className="text-sm font-medium">{item.name}</span>
                      </>)
                    }

                  </Button>
                )}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

UserDropDown.displayName = 'userdropdown'

export default React.memo(UserDropDown)

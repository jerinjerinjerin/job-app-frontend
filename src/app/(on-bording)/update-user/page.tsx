"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader } from "@/lib/loader/Loader";
import { updateUser } from "@/lib/redux/actions/auth";
import { AppDispatch, RootState } from "@/lib/redux/store";

const Page = () => {
  const [selectedOption, setSelectedOption] = React.useState<"need" | "give">("need");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { updateUserLoading, currentUser } = useSelector((state: RootState) => state.auth);

  const id = currentUser?.user.id ?? "";
  const email = currentUser?.user.email ?? "";

  const handleUserUpdate = async () => {
    const role = selectedOption === "give" ? "AGENT" : "USER"; // 🧠 Mapping logic

    try {
      const updateUserResponse = await dispatch(
        updateUser({ email, userId: id, role })
      ).unwrap();

      if (updateUserResponse.success) {
        toast.success("User role updated successfully");

        router.push(role === "AGENT" ? "/agent" : "/user");
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
      console.error("Error from updateUser:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-8">Choose Your Role</h1>

      <RadioGroup
        value={selectedOption}
        onValueChange={(val) => setSelectedOption(val as "need" | "give")}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full"
      >
        {/* USER role */}
        <Card
          className={`group transition-all border-2 shadow-md dark:shadow-white/10 hover:shadow-xl dark:hover:shadow-blue-500/20 duration-200 rounded-xl overflow-hidden ${
            selectedOption === "need"
              ? "border-blue-600 shadow-blue-500/30"
              : "border-border"
          }`}
        >
          <CardHeader className="text-lg font-semibold">I need a job</CardHeader>
          <CardContent className="space-y-4">
            <div className="relative w-full h-48 rounded-md overflow-hidden">
              <Image
                src="/images/need.jpg"
                alt="Need a Job"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="need"
                id="need"
                className={`transition ring-2 ring-offset-2 cursor-pointer ${
                  selectedOption === "need"
                    ? "ring-blue-500 dark:ring-blue-400"
                    : "ring-transparent"
                }`}
              />
              <label htmlFor="need" className="text-sm font-medium cursor-pointer">
                Select
              </label>
            </div>
          </CardContent>
        </Card>

        {/* AGENT role */}
        <Card
          className={`group transition-all border-2 shadow-md dark:shadow-white/10 hover:shadow-xl dark:hover:shadow-green-500/20 duration-200 rounded-xl overflow-hidden ${
            selectedOption === "give"
              ? "border-green-600 shadow-green-500/30"
              : "border-border"
          }`}
        >
          <CardHeader className="text-lg font-semibold">I give a job</CardHeader>
          <CardContent className="space-y-4">
            <div className="relative w-full h-48 rounded-md overflow-hidden">
              <Image
                src="/images/give.jpg"
                alt="Give a Job"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="give"
                id="give"
                className={`transition ring-2 ring-offset-2 cursor-pointer ${
                  selectedOption === "give"
                    ? "ring-green-500 dark:ring-green-400"
                    : "ring-transparent"
                }`}
              />
              <label htmlFor="give" className="text-sm font-medium cursor-pointer">
                Select
              </label>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>

      <Button
        onClick={handleUserUpdate}
        className={`
          mt-6
          px-6 py-3
          rounded-xl 
          font-medium 
          cursor-pointer
          border-2
          dark:text-white 
          text-black
          dark:bg-black 
          bg-white 
          dark:border-white
          border-black
          hover:text-white
          dark:hover:shadow-[0_0_14px_4px_rgba(59,130,246,0.4)] 
          dark:hover:bg-white
          dark:hover:text-black
          transition duration-300 ease-in-out
        `}
        disabled={updateUserLoading}
      >
        {updateUserLoading ? <Loader /> : "Next"}
      </Button>
    </div>
  );
};

export default Page;

"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OtpFormValues, otpSchema } from "@/utils/schema/auth";



const OtpVerifyScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      digit0: "",
      digit1: "",
      digit2: "",
      digit3: "",
    },
  });

  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);


  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !getValues()[`digit${index}` as keyof OtpFormValues]) {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const onSubmit = (data: OtpFormValues) => {
    const otp = `${data.digit0}${data.digit1}${data.digit2}${data.digit3}`;
    console.log("✅ OTP Submitted:", otp);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center  px-4">
      <Card className="w-full max-w-md shadow-md dark:bg-slate-900 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Enter the 4-digit code sent to your email
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-6">
            <div className="flex justify-between gap-3">
              {[0, 1, 2, 3].map((index) => (
                <Controller
                  key={index}
                  name={`digit${index}` as keyof OtpFormValues}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      inputMode="numeric"
                      maxLength={1}
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                      className="w-16 h-16 text-2xl text-center border dark:bg-slate-800 bg-gray-50 dark:text-white"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d$/.test(val)) {
                          field.onChange(val); // ✅ triggers validation
                          if (index < 3) inputsRef.current[index + 1]?.focus();
                        } else if (val === "") {
                          field.onChange(""); // ✅ clear value correctly
                        }
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  )}

                />
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-5">
            <Button type="submit" className="w-full" disabled={!isValid}>
              Verify
            </Button>
            <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
              Didn’t receive the code?{" "}
              <span className="text-blue-600 cursor-pointer">Resend</span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OtpVerifyScreen;

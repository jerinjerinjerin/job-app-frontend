"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";

type FormInputProps = {
  label: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  className,
  error,
  placeholder,
  required,
  type = "text",
  name,
  ...rest
}, ref) => {
  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        ref={ref}
        className={cn(
          "dark:bg-slate-900 bg-white dark:text-white text-black",
          error && "border-red-500",
          className
        )}
        {...rest}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default React.memo(FormInput);

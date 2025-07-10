import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name is required"),
  confirmPassword: z.string().min(6, "Confirm your password"),profilePic: z.instanceof(File).nullable().optional().refine(
    (file) => !file || file instanceof File,
    { message: "Profile picture must be a valid file" }
  ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const otpSchema = z.object({
  digit0: z.string().length(1, "Required"),
  digit1: z.string().length(1, "Required"),
  digit2: z.string().length(1, "Required"),
  digit3: z.string().length(1, "Required"),
});


export type LoginFormValues = z.infer<typeof loginSchema>
export type SignupFormValues = z.infer<typeof signupSchema>
export type OtpFormValues = z.infer<typeof otpSchema>;

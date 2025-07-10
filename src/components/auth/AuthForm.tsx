"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm, FieldErrors } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

import ImageUploader from '@/components/forminput/ImageInput'
import FormInput from '@/components/forminput/Input'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader } from '@/lib/loader/Loader'
import { loginUser, signupUser } from '@/lib/redux/actions/auth'
import { AppDispatch, RootState } from '@/lib/redux/store'
import {
  loginSchema,
  signupSchema,
  LoginFormValues,
  SignupFormValues
} from '@/utils/schema/auth'

import GoogleAuth from "./GoogleAuth"


interface Props {
  type?: "sign-up" | "login"
}

function isSignUpForm(
  errors: FieldErrors<SignupFormValues | LoginFormValues>,
  isSignUp: boolean
): errors is FieldErrors<SignupFormValues> {
  return isSignUp
}

const AuthForm: React.FC<Props> = ({ type = "login" }) => {
  const isSignUp = type === "sign-up"

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>()
  const { error, loading, signUpLoading, signUpError } = useSelector((state: RootState) => state.auth)

  const schema = isSignUp ? signupSchema : loginSchema

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<SignupFormValues | LoginFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: isSignUp
      ? {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: undefined,
      }
      : {
        email: "",
        password: "",
      },
  })

 const onSubmit = async (data: SignupFormValues | LoginFormValues) => {
  console.log("✅ Form Data:", data);

  try {
    if (isSignUp) {
      const signUpFormData = data as SignupFormValues;
console.log("signUpFormData.profilePic:", signUpFormData.profilePic); 
      const signupResponse = await dispatch(signupUser(signUpFormData)).unwrap();

      if (signupResponse?.success) {
        toast.success('Registration successful! Check your email for OTP.');
        router.push('/otp');
      }
    } else {
      const loginData = data as LoginFormValues;

      const loginResponse = await dispatch(loginUser(loginData)).unwrap();

      if (loginResponse?.user) {
        toast.success('Login successful');
        router.push('/');
      }
    }
  } catch (error) {
    console.error("Auth Error:", error);

    if (typeof error === "string" && error.trim()) {
      toast.error(error);
    }
  }
};


  return (
    <div className="w-full flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg shadow-md dark:bg-slate-900 bg-white ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">
            {isSignUp ? "Sign Up" : "Login"}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            {isSignUp ? "Create your account" : "Welcome back! Please login."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            {isSignUp && (
              <>
                <ImageUploader
                  label="Profile Image"
                  multiple={false}
                  value={watch("profilePic") as File | null}
                  onChange={(file) => setValue("profilePic", Array.isArray(file) ? file[0] ?? null : file)}
                />

              </>
            )}
            <div className={isSignUp ? "md:grid md:grid-cols-2 md:gap-3" : ""}>
              {isSignUp && (
                <FormInput
                  type='text'
                  label="Name"
                  {...register("name")}
                  error={isSignUpForm(errors, isSignUp) ? errors.name?.message : undefined}
                  placeholder="Enter your name"
                />
              )}

              <FormInput
                label="Email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>

            <div className={isSignUp ? "md:grid md:grid-cols-2 md:gap-3" : ""}>
              <FormInput
                label="Password"
                {...register("password")}
                error={errors.password?.message}
                placeholder="Enter your password"
                type="password"
                required
              />

              {isSignUp && (
                <FormInput
                  label="Confirm Password"
                  {...register("confirmPassword")}
                  error={isSignUpForm(errors, isSignUp) ? errors.confirmPassword?.message : undefined}
                  placeholder="Confirm your password"
                  type="password"
                  required
                />
              )}
            </div>
          </CardContent>
          <Link href={'/forgot-password'} className='py-2 pl-10 dark:text-white text-slate-800 font-semibold'>
            Forgot password ?
          </Link>
          <CardFooter className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full cursor-pointer shadow-md hover:bg-white dark:bg-black dark:text-white bg-blue-600 text-black round-sm"
              disabled={loading || signUpLoading}
            >
              {
                loading || signUpLoading ? (
                  <>
                    <Loader />
                  </>
                ) : (
                  <>
                    {isSignUp ? "Sign Up" : "Login"}

                  </>
                )
              }
            </Button>
            <div className="w-full flex items-center justify-center mx-auto">
              <h5 className="text-center dark:text-white text-slate-800 font-semibold">
                OR
              </h5>
            </div>
            <div className="w-full cursor-pointer dark:text-white dark:bg-black bg-white text-black">

              <GoogleAuth />
            </div>

            <div className="dark:text-white text-slate-800 font-semibold text-sm text-center">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-700">
                    Login here
                  </Link>
                </>
              ) : (
                <>
                  Don&apos;t have an account{" "}?{" "}
                  <Link href="/signup" className="text-blue-700">
                    Signup here
                  </Link>
                </>
              )}
            </div>
            {
              error && (
                <p className='w-full mx-auto text-red-600 font-semibold py-5'>{isSignUp ? (<>{signUpError}</>) : (<>{error}</>)} </p>

              )
            }
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

AuthForm.displayName = 'auth form';

export default React.memo(AuthForm);
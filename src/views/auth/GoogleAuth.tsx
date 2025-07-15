"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

import { googleLoginUser } from "@/lib/redux/actions/auth"
import { AppDispatch } from "@/lib/redux/store"

export default function GoogleAuth() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { theme } = useTheme()

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                const idToken = credentialResponse.credential
                if (!idToken) {
                    toast.error("Missing Google credential")
                    return
                }

                try {
                    const result = await dispatch(googleLoginUser({ token: idToken })).unwrap();

                    if (result.user) {
                        toast.success("Logged in successfully")
                        router.push("/")
                    }


                } catch (err) {
                    toast.error("Google login failed")
                    console.error(err)
                }
            }}
            onError={() => {
                toast.error("Google Sign-In was cancelled")
            }}
            theme={theme === "dark" ? "filled_black" : "outline"} 
            width="100%"
        />
    )
}

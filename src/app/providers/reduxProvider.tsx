'use client'
import { GoogleOAuthProvider } from "@react-oauth/google"
import * as React from 'react'
import { Provider } from 'react-redux'

import { AppStore, makeStore } from '@/lib/redux/store'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = React.useRef<AppStore | undefined>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <Provider store={storeRef.current}>{children}</Provider>
    </GoogleOAuthProvider>
  )
}

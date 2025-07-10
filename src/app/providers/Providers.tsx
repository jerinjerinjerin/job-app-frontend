"use client";

import { ApolloProvider } from "@apollo/client";

import { Toaster } from "@/components/ui/sonner";

import client from "./graphql-provider";
import StoreProvider from "./reduxProvider";
import TanstackProvider from "./TanstackProvider";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ApolloProvider client={client}>
        <StoreProvider>
          <TanstackProvider>
            {children}
            <Toaster richColors />
          </TanstackProvider>
        </StoreProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

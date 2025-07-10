'use client'

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

export default function TanstackProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => 
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          toast.error((error as Error)?.message || 'Query Error')
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          toast.error((error as Error)?.message || 'Mutation Error')
        },
      }),
    })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

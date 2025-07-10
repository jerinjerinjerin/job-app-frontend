'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    toast.error(error.message || 'Something went wrong')
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-bold">Uh oh! An error occurred.</h2>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Try again
      </button>
    </div>
  )
}

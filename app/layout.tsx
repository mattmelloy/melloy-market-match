'use client'

import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  const [isClient, setIsClient] = useState(false)

  useEffect((): void => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <html lang="en">
        <body className={`${inter.className} bg-gray-100`}>
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <head>
        <title>Melloy Market Match</title>
        <meta name="description" content="Share market game simulation" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

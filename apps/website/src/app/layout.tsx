import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="h-14 fixed top-0 z-50 bg-background border-b w-full">
          <div className="mx-auto max-w-screen-xl px-5 flex justify-between items-center h-full lg:px-7">
            <Link href="/" className="font-bold text-primary text-xl">
              readrave
            </Link>
            <div>
              <Link href="/docs" className="mr-4">
                Docs
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

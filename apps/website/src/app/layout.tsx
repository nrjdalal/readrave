import type { Metadata } from 'next'
import './globals.css'
import { ReadraveNavbar } from '@/components/readrave/navbar'
import { cn } from '@/lib/utils'
import { JetBrains_Mono as FontMono, Inter as FontSans } from 'next/font/google'

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Readrave',
  description: 'Generated by readrave init',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-dvh bg-secondary/25 font-sans antialiased',
          fontMono.variable,
          fontSans.variable,
        )}
      >
        <ReadraveNavbar
          navbarConfig={{
            title: 'Test App',
            links: [
              { title: 'Home', href: '/' },
              { title: 'About', href: '/about' },
              { title: 'Contact', href: '/contact' },
            ],
            socials: { title: 'github' },
          }}
        />
        {children}
      </body>
    </html>
  )
}

// version: 1.0

'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const ReadraveMobilebar = ({
  sidebarConfig,
}: {
  sidebarConfig: { title: string; href?: string; css?: any }[]
}) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden fixed top-20 bg-background text-foreground border p-2 px-4 rounded-md right-6 flex gap-x-2 items-center">
        <svg
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 rotate-180"
        >
          <path
            d="M3 5H11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M3 12H16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M3 19H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span className="sr-only">Toggle Menu</span>
      </SheetTrigger>
      <SheetContent className="md:hidden w-72">
        <ScrollArea className="h-full">
          <nav className="flex flex-col space-y-2.5 text-sm text-foreground/50">
            {sidebarConfig.map((item, i) => (
              <span key={i}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'font-foreground/50 hover:text-primary hover:underline flex items-center gap-x-2',
                      pathname === item.href && 'text-primary',
                    )}
                    style={item.css}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={cn(
                        'hidden',
                        pathname === item.href &&
                          'inline-block w-2 h-2 rounded-full bg-green-600',
                      )}
                    />
                    {item.title}
                  </Link>
                ) : (
                  <p
                    className="font-semibold text-foreground/75 select-none"
                    style={item.css}
                  >
                    {item.title}
                  </p>
                )}
              </span>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

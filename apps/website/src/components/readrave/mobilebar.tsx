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
      <SheetTrigger className="fixed right-5 top-20 flex items-center gap-x-2 rounded-md border bg-background p-2 px-4 text-foreground md:hidden">
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
      <SheetContent className="w-72 md:hidden">
        <ScrollArea className="h-full">
          <nav className="flex flex-col space-y-2.5 text-sm text-foreground/50">
            {sidebarConfig.map((item, i) => (
              <span key={i}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'font-foreground/50 hover:text-primary hover:underline',
                      pathname === item.href && 'text-primary',
                    )}
                    style={item.css}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={cn(
                        'hidden',
                        pathname === item.href &&
                          'mb-px mr-1.5 inline-block h-2 w-2 rounded-full bg-green-600 dark:bg-green-500',
                      )}
                    />
                    {item.title}
                  </Link>
                ) : (
                  <p
                    className="select-none font-semibold text-foreground/75"
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

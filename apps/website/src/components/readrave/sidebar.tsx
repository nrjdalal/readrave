// version: 1.0

'use client'

import { ScrollArea } from '@/components/readrave/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/readrave/sheet'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export const ReadraveSidebar = ({
  sidebarConfig,
}: {
  sidebarConfig: { title: string; href?: string; css?: any }[]
}) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const NavLogic = () => {
    return (
      <ScrollArea className="h-full py-6">
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
                  className="select-none font-semibold text-primary"
                  style={item.css}
                >
                  {item.title}
                </p>
              )}
            </span>
          ))}
        </nav>
      </ScrollArea>
    )
  }

  return (
    <React.Fragment>
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
          <NavLogic />
        </SheetContent>
      </Sheet>
      <aside className="top-14 z-10 hidden h-[calc(100dvh-3.5rem)] md:sticky md:block">
        <NavLogic />
      </aside>
    </React.Fragment>
  )
}

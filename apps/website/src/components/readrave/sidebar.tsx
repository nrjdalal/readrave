// version: 1.0

'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ReadraveSidebar = ({
  sidebarConfig,
}: {
  sidebarConfig: { title: string; href?: string; css?: any }[]
}) => {
  const pathname = usePathname()

  return (
    <aside className="top-14 z-10 hidden h-[calc(100dvh-3.5rem)] md:sticky md:block">
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
    </aside>
  )
}

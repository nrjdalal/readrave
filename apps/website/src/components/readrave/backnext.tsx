// version: 1.0

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ReadraveBacknext = ({
  sidebarConfig,
}: {
  sidebarConfig: { title: string; href?: string; css?: any }[]
}) => {
  const pathname = usePathname()

  const filteredSidebarConfig = sidebarConfig.filter((item) => item.href)
  const indexOfHref = filteredSidebarConfig.findIndex(
    (item) => item.href === pathname,
  )
  const previous = (
    filteredSidebarConfig[indexOfHref - 1]?.href
      ? filteredSidebarConfig[indexOfHref - 1]
      : null
  ) as any
  const next = (filteredSidebarConfig[indexOfHref + 1] || null) as any

  return (
    <nav className="mt-10 grid flex-wrap gap-4 py-12 md:grid-cols-2">
      {previous ? (
        <Link
          className="flex select-none items-center justify-start gap-x-3 rounded-md border bg-background px-3 py-3 font-medium text-primary/75 hover:text-primary hover:underline md:py-6"
          href={previous.href}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {previous.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          className="flex select-none items-center justify-end gap-x-3 rounded-md border bg-background px-3 py-3 font-medium text-primary/75 hover:text-primary hover:underline md:py-6"
          href={next.href}
        >
          {next.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}

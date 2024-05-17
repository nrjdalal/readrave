// version: 1.0

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ReadraveBreadcrumb = ({
  sidebarConfig,
}: {
  sidebarConfig: { title: string; href?: string; css?: any }[]
}) => {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <nav className="mb-6 mt-3 flex items-center space-x-2 text-sm text-primary/50 md:mt-0">
      <Link href="/">
        <svg
          className="size-4 hover:text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.97 2.59a1.5 1.5 0 0 0-1.94 0l-7.5 6.363A1.5 1.5 0 0 0 3 10.097V19.5A1.5 1.5 0 0 0 4.5 21h4.75a.75.75 0 0 0 .75-.75V14h4v6.25c0 .414.336.75.75.75h4.75a1.5 1.5 0 0 0 1.5-1.5v-9.403a1.5 1.5 0 0 0-.53-1.144l-7.5-6.363Z" />
        </svg>
      </Link>

      {paths.map((path, index) => {
        const href = '/' + paths.slice(0, index + 1).join('/')
        return (
          <div className="flex items-center space-x-2" key={index}>
            <span className="select-none">/</span>
            {sidebarConfig.find((item) => item.href === href) ? (
              <Link href={href} className="hover:text-primary hover:underline">
                {path}
              </Link>
            ) : (
              <p className="select-none">{path}</p>
            )}
          </div>
        )
      })}
    </nav>
  )
}

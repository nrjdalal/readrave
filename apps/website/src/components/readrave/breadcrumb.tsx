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
    <nav className="mb-6 mt-3 md:mt-0 flex items-center text-sm text-primary/50 space-x-2">
      <Link className="hover:underline" href="/">
        home
      </Link>

      {paths.map((path, index) => {
        const href = '/' + paths.slice(0, index + 1).join('/')
        return (
          <div className="flex items-center space-x-2" key={index}>
            <span className="select-none">/</span>
            {sidebarConfig.find((item) => item.href === href) ? (
              <Link href={href} className="hover:underline">
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

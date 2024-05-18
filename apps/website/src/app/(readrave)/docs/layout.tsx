// version: 1.0

import { ReadraveBacknext } from '@/components/readrave/backnext'
import { ReadraveBreadcrumb } from '@/components/readrave/breadcrumb'
import { ReadraveSidebar } from '@/components/readrave/sidebar'
import { sidebarConfig } from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-screen-xl px-5 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-7">
      <ReadraveSidebar sidebarConfig={sidebarConfig} />
      <main className="py-20">
        <ReadraveBreadcrumb sidebarConfig={sidebarConfig} />
        <article className="prose max-w-none break-words dark:prose-invert">
          {children}
        </article>
        <ReadraveBacknext sidebarConfig={sidebarConfig} />
      </main>
    </div>
  )
}

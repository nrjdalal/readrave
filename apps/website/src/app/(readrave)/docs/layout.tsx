import { ReadraveMobilebar } from '@/components/readrave/mobilebar'
import { ReadraveSidebar } from '@/components/readrave/sidebar'
import { sidebarConfig } from './sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-xl px-5 pb-20 mt-14 md:grid md:grid-cols-[200px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-7">
      <ReadraveMobilebar sidebarConfig={sidebarConfig} />
      <ReadraveSidebar sidebarConfig={sidebarConfig} />
      <main className="pt-6">
        <article className="prose max-w-none dark:prose-invert">
          {children}
        </article>
      </main>
    </div>
  )
}

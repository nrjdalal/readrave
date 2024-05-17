import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-dvh p-10">
      <h1 className="text-xl font-bold">
        Go to{' '}
        <Link className="underline" href="/docs">
          Documentation
        </Link>
      </h1>
    </div>
  )
}

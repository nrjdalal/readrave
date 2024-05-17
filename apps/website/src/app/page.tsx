import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-10">
      <h1 className="text-xl font-bold">
        Go to{' '}
        <Link className="underline" href="/docs">
          Documentation
        </Link>
      </h1>
    </div>
  )
}

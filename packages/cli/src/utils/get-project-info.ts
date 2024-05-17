import { handleError } from './handle-error'

export const getProjectInfo = (files: string[]) => {
  const info = {
    nextConfig: files.find((file) => file === 'next.config.mjs') || null,
    appDir:
      (files.find((file) => file.startsWith('app/')) && 'app') ||
      (files.find((file) => file.startsWith('src/app/')) && 'src/app') ||
      null,
  }

  for (const key in info) {
    if (!info[key]) {
      handleError(
        "Not a valid Next.js project. Run 'bun create-next-app' and try again.",
      )
    }
  }

  return info
}

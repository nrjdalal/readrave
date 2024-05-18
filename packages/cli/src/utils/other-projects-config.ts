import fs from 'fs/promises'
import path from 'path'
import { execa } from 'execa'

export const otherProjectsConfig = async (cwd: string) => {
  await execa('bunx', ['shadcn-ui', 'init', '-d'], {
    cwd,
  })
  await execa('bun', ['add', '-D', '@tailwindcss/typography'], {
    cwd,
  })

  const tailwindPlugins = await fs.readFile(
    path.join(cwd, 'tailwind.config.ts'),
    'utf-8',
  )

  const findAndReplace = (file: string, find: string, replace: string) => {
    const updated = file.replace(find, replace)
    return updated
  }

  const updatedTailwindPlugins = findAndReplace(
    tailwindPlugins,
    `plugins: [require("tailwindcss-animate")],`,
    `plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],`,
  )

  await fs.writeFile(
    path.join(cwd, 'tailwind.config.ts'),
    updatedTailwindPlugins,
  )
}

import fs from 'fs/promises'
import path from 'path'
import { detect } from 'detect-package-manager'
import { execa } from 'execa'

export const otherProjectsConfig = async (cwd: string) => {
  const manager = await detect({
    cwd,
  })
  // set npm:npx bun:bunx yarn:yarn dlx pnpm:pnpm dlx according to the package manager
  const runner =
    manager === 'bun'
      ? 'bunx'
      : manager === 'pnpm'
        ? 'pnpm dlx'
        : manager === 'yarn'
          ? 'yarn dlx'
          : 'npx'

  await execa(runner, ['shadcn-ui', 'init', '-d'], {
    cwd,
  })
  await execa(
    manager,
    [manager === 'npm' ? 'install' : 'add', '-D', '@tailwindcss/typography'],
    {
      cwd,
    },
  )

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

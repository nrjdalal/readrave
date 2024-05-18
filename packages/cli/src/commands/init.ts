import { existsSync } from 'fs'
import path from 'path'
import {
  filesInCwd,
  getProjectInfo,
  handleError,
  readraveGenerator,
  resolveDirectory,
  writeFiles,
} from '@/src/utils'
import { Command } from 'commander'
import { detect } from 'detect-package-manager'
import { execa } from 'execa'
import { z } from 'zod'

const initOptionsSchema = z.object({
  cwd: z.string(),
})

export const init = new Command()
  .name('init')
  .option(
    '-c, --cwd <path>',
    'the working directory, default is the current working directory',
    process.cwd(),
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts)
      const cwd = resolveDirectory(options.cwd)

      if (existsSync(path.join(cwd, '.readrave'))) {
        handleError(
          `Readrave already initialized. Try running "readrave sync" instead.`,
        )
      }

      let files = await filesInCwd(cwd)
      const nextInfo = getProjectInfo(files)
      await writeFiles({ cwd, nextInfo })
      await readraveGenerator({ cwd, nextInfo })

      // ~ detect package manager and install dependencies
      const deps = [
        '@mdx-js/loader',
        '@mdx-js/react',
        '@next/mdx',
        'rehype-pretty-code',
        'rehype-slug',
        'remark-gfm',
        'unist-util-visit',

        '@radix-ui/react-dialog',
        '@radix-ui/react-icons',
        '@radix-ui/react-scroll-area',

        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ]

      const devDeps = [
        '@types/mdx',

        '@tailwindcss/typography',
        'tailwindcss-animate',
      ]

      const manager = await detect({
        cwd,
      })

      await execa(manager, [manager === 'npm' ? 'install' : 'add', ...deps], {
        cwd,
      })

      await execa(
        manager,
        [manager === 'npm' ? 'install' : 'add', '-D', ...devDeps],
        {
          cwd,
        },
      )
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })

import { existsSync } from 'fs'
import path from 'path'
import {
  filesInCwd,
  getProjectInfo,
  handleError,
  otherProjectsConfig,
  readraveGenerator,
  resolveDirectory,
  writeFiles,
} from '@/src/utils'
import { Command } from 'commander'
import { detect } from 'detect-package-manager'
import { execa } from 'execa'
import ora from 'ora'
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
      await otherProjectsConfig(cwd)
      await writeFiles({ cwd, nextInfo })
      await readraveGenerator({ cwd, nextInfo })

      // ~ detect package manager and install dependencies
      const deps = [
        '@mdx-js/loader',
        '@mdx-js/react',
        '@next/mdx',
        '@types/mdx',
        'rehype-pretty-code',
        'rehype-slug',
        'remark-gfm',
        'unist-util-visit',
      ]

      const manager = await detect({
        cwd,
      })

      await execa(manager, [manager === 'npm' ? 'install' : 'add', ...deps], {
        cwd,
      })
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })

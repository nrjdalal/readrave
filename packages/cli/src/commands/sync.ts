import {
  filesInCwd,
  getProjectInfo,
  readraveGenerator,
  resolveDirectory,
} from '@/src/utils'
import { Command } from 'commander'
import { z } from 'zod'

const syncOptionsSchema = z.object({
  cwd: z.string(),
})

export const sync = new Command()
  .name('sync')
  .option(
    '-c, --cwd <path>',
    'the working directory, default is the current working directory',
    process.cwd(),
  )
  .action(async (opts) => {
    try {
      const options = syncOptionsSchema.parse(opts)
      const cwd = resolveDirectory(options.cwd)
      let files = await filesInCwd(cwd)
      const nextInfo = getProjectInfo(files)
      await readraveGenerator({ cwd, nextInfo })
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })

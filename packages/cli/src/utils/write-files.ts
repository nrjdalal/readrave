import { promises as fs } from 'fs'
import path from 'path'
import fsex from 'fs-extra'
import { logger } from './logger'
import * as templates from './templates'

export const writeFiles = async ({ cwd, nextInfo }) => {
  await fs.writeFile(
    path.join(cwd, 'next.config.mjs'),
    templates.NEXT_CONFIG_MJS,
    'utf8',
  )
  logger.success('-  next.config.mjs rewritten')

  await fs.writeFile(
    path.join(cwd, 'tailwind.config.ts'),
    await fetch(
      `https://raw.githubusercontent.com/nrjdalal/readrave/main/apps/website/tailwind.config.ts`,
    ).then((res) => res.text()),
    'utf8',
  )
  logger.success('-  tailwind.config.ts rewritten')

  await fs.writeFile(
    path.join(cwd, nextInfo.appDir, 'globals.css'),
    await fetch(
      `https://raw.githubusercontent.com/nrjdalal/readrave/main/apps/website/src/app/globals.css`,
    ).then((res) => res.text()),
    'utf8',
  )
  logger.success('-  globals.css rewritten')

  await fs.writeFile(
    path.join(cwd, nextInfo.appDir, '../mdx-components.tsx'),
    templates.MDX_COMPONENT_TSX,
    'utf8',
  )
  logger.success('-  mdx-components.tsx added')

  await fsex.ensureFile(path.join(cwd, nextInfo.appDir, '..', 'lib/utils.ts'))
  await fs.writeFile(
    path.join(cwd, nextInfo.appDir, '..', 'lib/utils.ts'),
    await fetch(
      `https://raw.githubusercontent.com/nrjdalal/readrave/main/apps/website/src/lib/utils.ts`,
    ).then((res) => res.text()),
    'utf8',
  )
  logger.success('-  lib/utils.ts added')
  logger.break()
}

import { promises as fs } from 'fs'
import path from 'path'
import * as templates from './templates'

export const writeFiles = async ({ cwd, nextInfo }) => {
  await fs.writeFile(
    path.join(cwd, 'next.config.mjs'),
    templates.NEXT_CONFIG_MJS,
    'utf8',
  )

  await fs.writeFile(
    path.join(cwd, nextInfo.appDir, '../mdx-components.tsx'),
    templates.MDX_COMPONENT_TSX,
    'utf8',
  )
}

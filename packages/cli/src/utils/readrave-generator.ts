import { existsSync } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import FastGlob from 'fast-glob'
import fsex from 'fs-extra'
import YAML from 'yaml'
import { logger } from './logger'
import * as templates from './templates'

export const readraveGenerator = async ({
  cwd,
  nextInfo,
}: {
  cwd: string
  nextInfo: any
}) => {
  const sidebarComponent = existsSync(
    path.join(cwd, nextInfo.appDir, '..', 'components/readrave/sidebar.tsx'),
  )

  const mobilebarComponent = existsSync(
    path.join(cwd, nextInfo.appDir, '..', 'components/readrave/mobilebar.tsx'),
  )

  if (!sidebarComponent) {
    await fsex.ensureFile(
      path.join(cwd, nextInfo.appDir, '..', 'components/readrave/sidebar.tsx'),
    )
    await fs.writeFile(
      path.join(cwd, nextInfo.appDir, '..', 'components/readrave/sidebar.tsx'),
      templates.DEMO_SIDEBAR,
      'utf8',
    )
  }

  if (!mobilebarComponent) {
    await fsex.ensureFile(
      path.join(
        cwd,
        nextInfo.appDir,
        '..',
        'components/readrave/mobilebar.tsx',
      ),
    )
    await fs.writeFile(
      path.join(
        cwd,
        nextInfo.appDir,
        '..',
        'components/readrave/mobilebar.tsx',
      ),
      templates.DEMO_MOBILEBAR,
      'utf8',
    )
  }

  let SIDEBAR_FILES = await FastGlob.glob(cwd + '/.readrave/**/*.sidebar.yaml')

  if (!SIDEBAR_FILES.length) {
    await fsex.ensureFile(path.join(cwd, '.readrave/docs.sidebar.yaml'))
    await fs.writeFile(
      path.join(cwd, '.readrave/docs.sidebar.yaml'),
      templates.RDOCS_SIDEBAR_YAML,
      'utf8',
    )
  }

  SIDEBAR_FILES = await FastGlob.glob(cwd + '/.readrave/**/*.sidebar.yaml')

  SIDEBAR_FILES.forEach(async (file) => {
    const dirname = '/' + path.basename(file).split('.')[0]
    const layoutpath = path.join(
      cwd,
      nextInfo.appDir,
      '(readrave)',
      dirname,
      'layout.tsx',
    )

    if (!existsSync(layoutpath)) {
      await fsex.ensureFile(layoutpath)
      await fs.writeFile(layoutpath, templates.DEMO_LAYOUT_TSX, 'utf8')
    }

    const content = YAML.parse(await fs.readFile(file, 'utf8'))

    await fsex.ensureFile(
      path.join(cwd, nextInfo.appDir, '(readrave)', dirname, 'sidebar.ts'),
    )

    await fs.writeFile(
      path.join(cwd, nextInfo.appDir, '(readrave)', dirname, 'sidebar.ts'),
      `export const sidebarConfig = ${JSON.stringify(content, null, 2)}`,
      'utf8',
    )

    logger.info(`\nGenerating pages for ${dirname} ...`)

    let count = 0

    content.forEach(async (element: any) => {
      if (element.title && element.href?.startsWith(dirname)) {
        const filepath = path.join(
          cwd,
          nextInfo.appDir,
          '(readrave)',
          element.href,
          'page.mdx',
        )

        if (!existsSync(filepath)) {
          await fsex.ensureFile(filepath)

          await fs.writeFile(
            filepath,
            `# ${element.title}\n\n${templates.DEMO_MDX}`,
            'utf8',
          )

          logger.success(
            `${++count}. Generated https://localhost:3000${element.href} for ${element.title}!`,
          )
        }
      }
    })
  })
}

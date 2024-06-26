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
  // ~ default components generator
  const components = [
    'breadcrumb.tsx',
    'backnext.tsx',
    'navbar.tsx',
    'sidebar.tsx',
    'scroll-area.tsx',
    'sheet.tsx',
  ]

  const componentsPath = path.join(
    cwd,
    nextInfo.appDir,
    '..',
    'components/readrave',
  )

  for (const component of components) {
    if (!existsSync(path.join(componentsPath, component))) {
      await fsex.ensureFile(path.join(componentsPath, component))
      await fs.writeFile(
        path.join(componentsPath, component),
        await fetch(
          `https://raw.githubusercontent.com/nrjdalal/readrave/main/apps/website/src/components/readrave/${component}`,
        ).then((res) => res.text()),
        'utf8',
      )

      logger.info(`-  added components/readrave/${component}`)
    }
  }

  // ~ file generator from .readrave/configs
  const NAVBAR_FILE = path.join(cwd, '.readrave/navbar.yaml')

  if (existsSync(NAVBAR_FILE)) {
    logger.break()

    const content = YAML.parse(await fs.readFile(NAVBAR_FILE, 'utf8'))

    await fsex.ensureFile(
      path.join(cwd, nextInfo.appDir, '(readrave)/navbar.ts'),
    )

    await fs.writeFile(
      path.join(cwd, nextInfo.appDir, '(readrave)/navbar.ts'),
      `export const navbarConfig = ${JSON.stringify(content, null, 2)}`,
      'utf8',
    )

    logger.success('Generated navbar.tsx!')

    logger.info('Add the following import to layout.tsx to use the navbar:')
    logger.warn(
      `import { navbarConfig } from '@/app/(readrave)/navbar'`,
      `import { ReadraveNavbar } from '@/components/readrave/navbar'\n`,
    )

    logger.info(
      `Add the following code inside ${nextInfo.appDir}/layout.tsx's <body>...</body> tag to use the navbar:`,
    )
    logger.warn(`<ReadraveNavbar navbarConfig={navbarConfig} />`)
  }

  let SIDEBAR_FILES = await FastGlob.glob(cwd + '/.readrave/**/*.sidebar.yaml')

  if (!SIDEBAR_FILES.length) {
    logger.break()

    await fsex.ensureFile(path.join(cwd, '.readrave/docs.sidebar.yaml'))
    await fs.writeFile(
      path.join(cwd, '.readrave/docs.sidebar.yaml'),
      templates.RDOCS_SIDEBAR_YAML,
      'utf8',
    )

    logger.success('[[ Generating files via .readrave/docs.sidebar.yaml ]]')
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
      await fs.writeFile(
        layoutpath,
        await fetch(
          `https://raw.githubusercontent.com/nrjdalal/readrave/main/apps/website/src/app/(readrave)/docs/layout.tsx`,
        ).then((res) => res.text()),
        'utf8',
      )
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

    let count = 0

    if (content.length) {
      logger.break()
    }

    content.forEach(async (element: any, index: number) => {
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
            `export const metadata = {
  title: \`${element.title}\`,
  description: 'Add description for the page here!',
}

# {metadata.title}

{metadata.description}

---

${templates.DEMO_MDX}`,
            'utf8',
          )

          logger.info(
            `${++count}. generated app/(readrave)${element.href}/page.mdx`,
          )
        }
      }

      if (index === content.length - 1) {
        logger.break()

        logger.success(
          `Generated ${count} pages, layout & sidebar for app/(readrave)${dirname}`,
        )
      }
    })
  })
}

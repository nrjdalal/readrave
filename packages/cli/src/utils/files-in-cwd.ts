import FastGlob from 'fast-glob'

export const filesInCwd = async (cwd: string) => {
  return await FastGlob.glob('**/*', {
    cwd,
    deep: 3,
    ignore: ['node_modules', '.next', 'public', 'dist', 'build'],
  })
}

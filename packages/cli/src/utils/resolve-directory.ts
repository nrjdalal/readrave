import { existsSync } from 'fs'
import path from 'path'
import { handleError } from '.'

export const resolveDirectory = (cwd: string) => {
  const setCwd = path.resolve(cwd)

  if (!existsSync(setCwd)) {
    handleError(`Directory "${setCwd}" does not exist`)
  }

  return setCwd
}

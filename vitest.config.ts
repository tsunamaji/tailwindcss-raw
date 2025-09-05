import { defineConfig } from 'vitest/config'
import fs from 'fs'
import path from 'path'

const packagesDir = path.resolve(__dirname, 'packages')

const projects = fs.readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => path.join(packagesDir, dirent.name))

export default defineConfig({
  test: {
    projects,
  },
})
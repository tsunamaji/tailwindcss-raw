import { compile, optimize } from '@tailwindcss/node'
import { Scanner } from '@tailwindcss/oxide'

export const compileTw = async (content: string, css: string = '', minify: boolean = false) => {
  let scanner = new Scanner({ sources: [] })
  let candidates = scanner.scanFiles([{ content, extension: 'html' }])

  if (!css.includes('@import')) {
    css = `@import "tailwindcss";${css}`
  }

  let { build } = await compile(css, {
    base: process.cwd(),
    onDependency: () => {},
  })

  let { code: styles } = optimize(build(candidates), {
    minify,
  })

  return styles
}

export const minifyTw = async (content: string, css: string = '') => {
  return await compileTw(content, css, true)
}

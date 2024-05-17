import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeElement] = node.children
            if (codeElement.tagName !== 'code') return
            node.raw = codeElement.children[0]?.value
          }
        })
      },
      [
        rehypePrettyCode,
        {
          keepBackground: false,
        },
      ],
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'figure') {
            if ((!'data-rehype-pretty-code-figure') in node.properties) {
              return
            }
            const preElement = node.children.at(-1)
            if (preElement.tagName !== 'pre') return
            preElement.properties = {
              ...preElement.properties,
              raw: node.raw,
            }
          }
        })
      },
    ],
  },
})

export default withMDX(nextConfig)

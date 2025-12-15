import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: '**/blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lang: { type: 'enum', options: ['de', 'en'], required: true },
    slug: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    category: { type: 'string', required: false },
    cover: { type: 'string', required: false },
  },
  computedFields: {
    readingTime: {
      type: 'number',
      resolve: (doc) => {
        const minutes = readingTime(doc.body.raw).minutes
        return Math.max(1, Math.ceil(minutes))
      },
    },
    url: {
      type: 'string',
      resolve: (doc) => `/${doc.lang}/blog/${doc.slug}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
})

import { withContentlayer } from 'next-contentlayer'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['contentlayer/generated'] = path.join(
      process.cwd(),
      '.contentlayer/generated',
    )
    return config
  },
}

export default withContentlayer(nextConfig)

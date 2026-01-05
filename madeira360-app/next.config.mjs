import { withContentlayer } from 'next-contentlayer'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack }) => {
    config.resolve.alias['contentlayer/generated'] = path.join(
      process.cwd(),
      '.contentlayer/generated',
    )
    // Ignore tinacms if it's referenced but not installed
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^tinacms\/dist\/client$/,
      })
    )
    return config
  },
}

export default withContentlayer(nextConfig)

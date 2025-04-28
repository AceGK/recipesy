import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    if (config.resolve?.alias) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    }

    return config;
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
};

export default nextConfig;

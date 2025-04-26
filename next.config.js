/** @type {import('next').NextConfig} */

const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
};
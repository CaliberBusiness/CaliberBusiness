const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isProd ? '/careers-business-resource' : '',
  assetPrefix: isProd ? '/careers-business-resource/' : '',
};

module.exports = nextConfig;

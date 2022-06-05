/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  publicRuntimeConfig: {
    CALLBACK_URL: process.env.CALLBACK_URL || 'http://localhost:3000',
    SPLITBEE_TOKEN: process.env.SPLITBEE_TOKEN || '',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]',
      },
    });

    return config;
  },
};

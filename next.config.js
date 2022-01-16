/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  publicRuntimeConfig: {
    CALLBACK_URL: process.env.CALLBACK_URL || 'http://localhost:3000',
  },
};

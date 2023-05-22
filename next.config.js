/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: false,
  i18n: {
    locales: ["tr"],
    defaultLocale: "tr",
  },
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    
    config.plugins.push()

    return config;
  },
};

module.exports = nextConfig;

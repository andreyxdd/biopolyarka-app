/** @type {import('next').NextConfig} */
module.exports = {
  experimental: { esmExternals: false },
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
};

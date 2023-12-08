/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coincap.io",
        port: "",
        pathname: "/assets/icons/**",
      },
    ],
  },
};

module.exports = nextConfig;

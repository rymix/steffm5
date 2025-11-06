const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, "../../"),
  output: "standalone",
  // Enable HMR and fast refresh
  experimental: {
    // Ensure fast refresh is enabled
    optimizePackageImports: ["styled-components"],
  },
  compiler: {
    styledComponents: {
      displayName: process.env.NODE_ENV !== "production",
      fileName: process.env.NODE_ENV !== "production",
      minify: process.env.NODE_ENV === "production",
      transpileTemplateLiterals: false, // Set to false for better HMR support
      pure: false, // Set to false for better HMR support
      ssr: true,
    },
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        crypto: false,
        stream: false,
      };
    }

    // Improve HMR and file watching in development
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**"],
      };
    }

    // Add SVG handling using @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;

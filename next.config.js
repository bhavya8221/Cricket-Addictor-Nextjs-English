// const path = require("path");
// const webpack = require("webpack");
// module.exports = {
//   trailingSlash: true,
//   reactStrictMode: true,
//   swcMinify: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "*.cricketaddictor.com",
//         // port: '',
//         // pathname: '/account123/**',
//       },
//     ],
//     unoptimized: true,
//   },
//   webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
//     // Perform customizations to webpack config
//     // Important: return the modified config

//     // Example of using IgnorePlugin
//     config.plugins.push(
//       new webpack.IgnorePlugin({
//         resourceRegExp: /\/__tests__\//,
//       })
//     );

//     // Example of adding a new rule
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"],
//     });

//     return config;
//   },
// };


// const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cricketaddictor.com",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig

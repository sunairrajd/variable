// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Your existing configuration options...
  
//   // Tell Next.js to skip prerendering for pages that use window
//   reactStrictMode: true,
  
//   // Configure webpack to handle problematic modules
//   webpack: (config, { isServer }) => {
//     // If on the server, replace browser modules with empty objects
//     if (isServer) {
//       // Create a rule for problematic modules
//       config.module.rules.push({
//         test: [
//           /p5.*/, // Match any p5.js related files
//           /color-namer/, // Match color-namer module
//           /accessibility\/color_namer/, // Match the specific file causing issues
//           /constants/, // Match the constants file causing issues
//         ],
//         // Replace them with an empty module on the server
//         use: 'null-loader',
//       });
//     }
    
//     return config;
//   },
// }

// module.exports = nextConfig 
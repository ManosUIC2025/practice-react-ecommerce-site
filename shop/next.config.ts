import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    // Configure which external domains are allowed to be optimized
    // Each pattern must include at least protocol and hostname
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // The minimum number of seconds a cached optimized image should stay in the cache
    // Default is 60 seconds. Can be increased for better performance
    minimumCacheTTL: 60,

    // Allow SVG image optimization - should only be enabled if you trust the source
    // Values: true | false
    // this also makes the images available in next/image
    dangerouslyAllowSVG: true,

    // Controls how images are downloaded by the browser
    // Values: 'attachment' (force download) | 'inline' (display in browser)
    contentDispositionType: 'inline',

    // Array of image formats that should be generated
    // Supported values: ['image/webp', 'image/avif', 'image/png', 'image/jpeg']
    formats: ['image/webp'],
  },
};



export default nextConfig;

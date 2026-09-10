/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t7gx1q7p-5001.inc1.devtunnels.ms",
      },
      {
        protocol: "https",
        hostname: "z34dr4pd-5001.inc1.devtunnels.ms",
      },
      {
        protocol: "https",
        hostname: "api.thevedicstory.in",
      },

      // Local API / image servers
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",

      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    unoptimized:true
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 其他配置

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // 允許所有路徑
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**", // 允許所有路徑
      },

      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/**", // 允許所有路徑
      },
    ],
  },
};

export default nextConfig;

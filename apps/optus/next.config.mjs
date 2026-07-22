/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@demo/ui"],
  images: { remotePatterns: [], unoptimized: true },
};
export default nextConfig;

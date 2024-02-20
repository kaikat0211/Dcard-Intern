/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['avatars.githubusercontent.com'],
    },
    env: {
      GITHUB_CLIENT_ID: process.env.GITHUB_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_SECRET,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
    },
  };
  
  export default nextConfig;
  
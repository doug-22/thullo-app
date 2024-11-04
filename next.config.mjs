/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    reactCompiler: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**'
      }
    ]
  },
};

export default nextConfig;

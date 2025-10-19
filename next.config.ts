import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devServer: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1760862560163.cluster-sumfw3zmzzhzkx4mpvz3ogth4y.cloudworkstations.dev',
    ],
  },
  env: {
    NEXT_PUBLIC_ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    NEXT_PUBLIC_ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
};

export default nextConfig;

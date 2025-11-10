import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Izinkan semua path gambar dari hostname ini
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        port: '',
        pathname: '/**', // Izinkan semua path gambar dari hostname ini
      },
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**', // Izinkan semua path gambar dari hostname ini
      },
      // Anda bisa menambahkan domain lain di sini jika perlu
    ],
  },

  /* config options here */
};

export default nextConfig;

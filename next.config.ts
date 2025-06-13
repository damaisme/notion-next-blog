import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

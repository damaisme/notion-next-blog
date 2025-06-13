"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect hanya berjalan di sisi client, setelah komponen terpasang.
  // Ini untuk menghindari hydration mismatch error.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Selama komponen belum terpasang di client, render placeholder atau null
  // untuk memastikan UI konsisten dengan server.
  // if (!mounted) {
  //   // Render placeholder untuk menjaga layout agar tidak bergeser
  //   return <div className="w-9 h-9" />;
  // }
  //
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex text-white items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
      // Logika toggle: jika tema sekarang gelap, ubah ke terang, dan sebaliknya.
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {/* Tampilkan ikon yang sesuai dengan tema yang sedang aktif */}
      {resolvedTheme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-orange-300" />
      ) : (
        <MoonIcon className="h-5 w-5 text-slate-800" />
      )}
    </button>
  );
};

export default ThemeToggle;

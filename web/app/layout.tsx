// File: web/app/layout.tsx
'use client';

import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import SidebarAdmin from '../src/components/SidebarAdmin';
import SidebarMentor from '../src/components/SidebarMentor';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const showSidebar = path.startsWith('/admin') || path.startsWith('/mentor');

  return (
    <html lang="en">
      <head>
        {/* Tailwind via CDN for quick prototyping */}
        <script
          src="https://cdn.tailwindcss.com"
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: { extend: {} },
                plugins: [require('daisyui')],
                daisyui: { themes: ['light', 'dark'] },
              }
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-gray-50 antialiased">
        <Header />
        <div className="flex flex-1">
          {showSidebar
            ? path.startsWith('/admin')
              ? <SidebarAdmin />
              : <SidebarMentor />
            : null
          }
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
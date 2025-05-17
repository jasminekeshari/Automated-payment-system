/* File: web/src/components/SidebarMentor.tsx */
'use client';
import Link from 'next/link';
import { Home, FileText } from 'lucide-react';
export default function SidebarMentor() {
  return (
    <aside className="w-64 bg-white h-full shadow-md p-4">
      <nav className="space-y-4">
        <Link href="/mentor/dashboard" className="flex items-center gap-2 hover:text-blue-600">
          <Home size={20} /> My Sessions
        </Link>
        <Link href="/mentor/receipts" className="flex items-center gap-2 hover:text-blue-600">
          <FileText size={20} /> Receipts
        </Link>
      </nav>
    </aside>
  );
}
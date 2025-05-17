/* File: web/src/components/SidebarAdmin.tsx */
'use client';
import Link from 'next/link';
import { Home, FileText, Users } from 'lucide-react';
export default function SidebarAdmin() {
  return (
    <aside className="w-64 bg-white h-full shadow-md p-4">
      <nav className="space-y-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2 hover:text-blue-600">
          <Home size={20} /> Dashboard
        </Link>
        <Link href="/admin/payouts" className="flex items-center gap-2 hover:text-blue-600">
          <FileText size={20} /> Payouts
        </Link>
        <Link href="/admin/mentors" className="flex items-center gap-2 hover:text-blue-600">
          <Users size={20} /> Mentors
        </Link>
      </nav>
    </aside>
  );
}
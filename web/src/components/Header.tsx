// File: web/src/components/Header.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser, signOut } from '../lib/firebaseClient';
import { LogOut, Home, Users, FileText } from 'lucide-react';

const ADMIN_EMAILS = ['admin@test.dev'];

export default function Header() {
  const user = useUser();
  const router = useRouter();

  // Redirect after login
  useEffect(() => {
    if (user) {
      const role = ADMIN_EMAILS.includes(user.email || '') ? 'admin' : 'mentor';
      router.replace(`/${role}/dashboard`);
    }
  }, [user, router]);

  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center w-full fixed top-0 z-10 shadow-md">
    <div className="text-2xl font-bold text-purple-400 tracking-wide">
      <span className="text-white">Payout</span> <span className="text-purple-400">Pilot</span>
    </div>
    <nav className="space-x-6 text-sm">
      <a href="/" className="hover:text-purple-300">Home</a>
      <a href="/features" className="hover:text-purple-300">Features</a>
      <a href="/contact" className="hover:text-purple-300">Contact</a>
    </nav>
  </header>
  );
}
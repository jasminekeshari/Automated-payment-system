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
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Payout Automation</Link>
        <nav>
          {user ? (
            <button onClick={() => signOut()} className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded">
              <LogOut size={16} /> Sign Out
            </button>
          ) : (
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
/* File: web/src/components/Hero.tsx */
'use client';
import Link from 'next/link';
export default function Hero() {
  return (
    <div className="text-center py-20 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-5xl font-extrabold mb-4">Streamline Your Mentor Payouts</h1>
      <p className="text-lg text-gray-700 mb-6">
        Transparent, automated, and real-time payouts for EdTech mentors.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Get Started
      </Link>
    </div>
  );
}
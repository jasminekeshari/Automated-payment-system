/* File: web/src/components/Hero.tsx */
'use client';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="w-screen h-screen m-0 p-0 flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black overflow-hidden">
    <div className="text-center text-white max-w-4xl w-full px-4">
      <h1 className="text-5xl font-extrabold mb-6 leading-tight">
        Streamline Your Mentor Payouts
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Transparent, automated, and real-time payouts for EdTech mentors.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200 transition"
      >
        Get Started
      </Link>
    </div>
  </section>


  );
}
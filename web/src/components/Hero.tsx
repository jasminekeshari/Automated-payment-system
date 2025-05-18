/* File: web/src/components/Hero.tsx */
'use client';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-purple-900 to-black flex items-center justify-center overflow-hidden p-4">
      <div className="text-center text-white max-w-3xl w-full px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Streamline Your Mentor Payouts
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Transparent, automated, and real-time payouts for EdTech mentors.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-white text-purple-800 font-semibold rounded-full shadow-md hover:bg-purple-100 hover:scale-105 transition-transform duration-200"
        >
          Get Started
        </Link>
      </div>
    </section>



  );
}
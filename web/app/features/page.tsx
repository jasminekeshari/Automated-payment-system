// app/features/page.tsx

"use client";

import React from "react";

const features = [
  {
    title: "Automated Payout Calculation",
    description:
      "Smartly compute mentor payouts using customizable rates, session durations, and automatic tax handling.",
  },
  {
    title: "Receipt Generation & Sharing",
    description:
      "Generate structured, downloadable receipts with tax breakdowns, and share with mentors in one click.",
  },
  {
    title: "Mentor Dashboard",
    description:
      "Allow mentors to track sessions, payouts, and download receipts anytime with full transparency.",
  },
  {
    title: "Secure Admin-Mentor Chat",
    description:
      "Encrypted chat to clarify doubts, respond to disputes, and build trust between mentors and EdTech.",
  },
  {
    title: "Audit Logs & History",
    description:
      "Every change is logged — what changed, who changed it, and when. Admins can track modifications easily.",
  },
  {
    title: "Dry Run / Test Mode",
    description:
      "Preview payouts before sending — verify and correct mistakes with simulation mode before confirming.",
  },
];

const FeaturesPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(to bottom right, #2b2b44, #120012)",
        color: "white",
        overflow: "hidden",
        padding: 0,
        margin: 0,
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        Key Features of Payout Pilot
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-5 backdrop-blur-lg p-6 rounded-xl shadow-md hover:scale-105 transition-all border border-purple-700"
          >
            <h2 className="text-xl font-semibold mb-2 text-purple-300">
              {feature.title}
            </h2>
            <p className="text-sm text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const teamMembers = [
  {
    name: "Rufus Bright",
    email: "rufusbright595@gmail.com",
    linkedin: "https://www.linkedin.com/in/rufus-bright-77399a1a3/",
    github: "https://github.com/TheApostle-07",
    portfolio: "https://astonishing-buttercream-aea79d.netlify.app/",
    image: "/images/rufus.jpg",
  },
  {
    name: "Jasmine Keshari",
    email: "jasminekeshari2@gmail.com",
    linkedin: "https://www.linkedin.com/in/jasmine-keshari-950003229",
    github: "https://github.com/jasminekeshari",
    portfolio: "https://jasmine-portfolio-githubio.vercel.app/",
    image: "/images/jasmine.jpg",
  },
  {
    name: "Atharv Sawant",
    email: "atharva.saawant@gmail.com",
    linkedin: "https://www.linkedin.com/in/atharva-sawant-35626a209",
    github: "https://github.com/athu2773",
    portfolio: "https://atharvakrishnasawant.netlify.app/",
    image: "/images/atharv.jpg",
  },
];

const ContactPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-16"
      style={{
        background: "linear-gradient(to bottom right, #1f1f3a, #000010)",
        color: "white",
      }}
    >
      {/* Page Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-purple-300 text-center mb-4 drop-shadow-md">
        Contact Us
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-16">
        We value your questions, feedback, and insights. Let us know how we can assist you.
        We are here to help and would love to hear from you!
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transform hover:scale-105 transition duration-300 border border-purple-500/30 hover:border-purple-400"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mb-6 border-4 border-purple-400 shadow-md"
            />
            <h2 className="text-2xl font-bold text-purple-200 mb-1">{member.name}</h2>
            <p className="text-sm text-gray-300 mb-4">{member.email}</p>

            <div className="flex flex-col gap-2 text-sm w-full">
              <a
                href={member.linkedin}
                target="_blank"
                className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <FaLinkedin className="text-lg" /> LinkedIn
              </a>
              <a
                href={member.github}
                target="_blank"
                className="flex items-center justify-center gap-2 text-gray-300 hover:text-white"
              >
                <FaGithub className="text-lg" /> GitHub
              </a>
              <a
                href={member.portfolio}
                target="_blank"
                className="flex items-center justify-center gap-2 text-green-400 hover:text-green-300"
              >
                <FaGlobe className="text-lg" /> Portfolio
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
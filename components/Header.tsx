
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Smart News Briefing
      </h1>
      <p className="text-center text-gray-400 mt-2">Your AI-powered daily digest built by Pragyaditya using Gemini</p>
    </header>
  );
};

export default Header;

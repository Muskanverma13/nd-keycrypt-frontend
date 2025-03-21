// SectionHeader.js
import React from "react";

const SectionHeader = () => {
  return (
    <div className="text-center mb-20">
      <span className="inline-block bg-neutral-800 text-orange-500 rounded-full text-sm font-medium px-6 py-2 uppercase mb-8">
        Features
      </span>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wider mb-10">
        Interactive Crypto{" "}
        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          Learning Hub
        </span>
      </h2>
      <p className="max-w-3xl mx-auto text-neutral-400 text-lg leading-relaxed">
        Explore, learn, and experiment with symmetric and asymmetric encryption techniques
      </p>
    </div>
  );
};

export default SectionHeader;
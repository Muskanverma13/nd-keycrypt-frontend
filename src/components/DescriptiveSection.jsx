// DescriptiveSection.js
import React from "react";
import TheoryCard from "./TheoryCard";

const DescriptiveSection = ({ theoryTopics }) => {
  return (
    <div className="mt-12 max-w-6xl mx-auto">
      <h3 className="text-3xl font-semibold text-center text-orange-500 mb-10">Cryptography Theory</h3>
      <p className="text-center text-neutral-400 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
        Explore the theoretical foundations of cryptography with our comprehensive guides covering key concepts and principles.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {theoryTopics.map((topic, index) => (
          <TheoryCard key={index} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default DescriptiveSection;
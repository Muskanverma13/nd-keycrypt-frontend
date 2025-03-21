// SectionToggle.js
import React from "react";

const SectionToggle = ({ activeSection, setActiveSection, setSelectedAlgo }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-16">
      <button
        onClick={() => {
          setActiveSection("interactive");
          setSelectedAlgo(null);
        }}
        className={`px-8 py-4 border border-orange-500 rounded-full font-medium transition-all duration-300 ${
          activeSection === "interactive" 
            ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white" 
            : "bg-transparent text-orange-500 hover:bg-orange-500/10"
        }`}
      >
        Interactive Learning
      </button>
      <button
        onClick={() => {
          setActiveSection("visual");
          setSelectedAlgo(null);
        }}
        className={`px-8 py-4 border border-orange-500 rounded-full font-medium transition-all duration-300 ${
          activeSection === "visual" 
            ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white" 
            : "bg-transparent text-orange-500 hover:bg-orange-500/10"
        }`}
      >
        Visual Learners
      </button>
      <button
        onClick={() => {
          setActiveSection("descriptive");
          setSelectedAlgo(null);
        }}
        className={`px-8 py-4 border border-orange-500 rounded-full font-medium transition-all duration-300 ${
          activeSection === "descriptive" 
            ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white" 
            : "bg-transparent text-orange-500 hover:bg-orange-500/10"
        }`}
      >
        Descriptive
      </button>
    </div>
  );
};

export default SectionToggle;
// VisualSection.js
import React from "react";
import AlgorithmCard from "./AlgorithmCard";

// functions
const VisualSection = ({ 
  activeAlgorithm, 
  setActiveAlgorithm,
  symmetricAlgorithms,
  asymmetricAlgorithms
}) => {
  return ( // css
    <div className="mt-12 max-w-6xl mx-auto">
      <h3 className="text-3xl font-semibold text-center mb-12">Choose Encryption Type</h3>
      <div className="flex flex-wrap justify-center gap-10 mb-16">
        <button
          onClick={() => setActiveAlgorithm("symmetric")}
          className={`
            px-8 py-4 border-2 rounded-lg font-medium transition-all duration-500 
            relative overflow-hidden shadow-lg
            ${
              activeAlgorithm === "symmetric" 
                ? "border-teal-500 text-white" 
                : "border-teal-600 text-teal-400 hover:text-white"
            }
          `}
          style={{
            background: activeAlgorithm === "symmetric" 
              ? "linear-gradient(135deg, #2dd4bf, #0f766e)" 
              : "rgba(13, 148, 136, 0.2)"
          }}
        >
          <span className="relative z-10">Symmetric Encryption</span>
          {activeAlgorithm === "symmetric" && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white animate-ping"></span>
          )}
        </button>
        <button
          onClick={() => setActiveAlgorithm("asymmetric")}
          className={`
            px-8 py-4 border-2 rounded-lg font-medium transition-all duration-500 
            relative overflow-hidden shadow-lg
            ${
              activeAlgorithm === "asymmetric" 
                ? "border-amber-500 text-white" 
                : "border-amber-600 text-amber-400 hover:text-white"
            }
          `}
          style={{
            background: activeAlgorithm === "asymmetric" 
              ? "linear-gradient(135deg, #f59e0b, #d97706)" 
              : "rgba(217, 119, 6, 0.2)"
          }}
        >
          <span className="relative z-10">Asymmetric Encryption</span>
          {activeAlgorithm === "asymmetric" && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-white animate-ping"></span>
          )}
        </button>
      </div>

      {/* Algorithm List */}
      {/* heading  */}
      {activeAlgorithm && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center mb-10 text-orange-500">
            {activeAlgorithm === "symmetric" ? "Symmetric Algorithms" : "Asymmetric Algorithms"}
          </h3>
          {/* videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
            {(activeAlgorithm === "symmetric" ? symmetricAlgorithms : asymmetricAlgorithms).map((algo, index) => (
              <AlgorithmCard key={index} algo={algo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualSection;
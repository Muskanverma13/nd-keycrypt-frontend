// AlgorithmSelection.js
import React from "react";

const AlgorithmSelection = ({ algorithms, setSelectedAlgo }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
      {algorithms.map((algo, index) => (
        <div
          key={index}
          className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-800/50 shadow-md 
            hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer group"
          onClick={() => setSelectedAlgo(algo.name)}
        >
          <h4 className="font-bold text-xl py-4 px-6 bg-neutral-900 text-orange-500 group-hover:bg-orange-500 
            group-hover:text-white transition-colors duration-300">
            {algo.name}
          </h4>
          <div className="p-5">
            <p className="text-neutral-300 text-center mb-3">Try this algorithm</p>
            {/* <div className="bg-neutral-900 p-4 rounded-lg flex justify-center items-center "> */}
              {/* <span className="text-2xl">{algo.icon}</span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmSelection;
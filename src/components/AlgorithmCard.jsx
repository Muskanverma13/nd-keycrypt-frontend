// AlgorithmCard.js
import React from "react";

// css for card
const AlgorithmCard = ({ algo }) => {
  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-800 shadow-md hover:shadow-orange-500/10 transition-all duration-300">
      <h4 className="font-bold text-xl py-4 px-6 bg-neutral-900 text-orange-500">{algo.name}</h4>
      <div className="p-6">
        <div className="mb-5 bg-neutral-900 rounded overflow-hidden">
          <iframe
            className="w-full h-56"
            src={algo.video}
            title={algo.name}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCard;
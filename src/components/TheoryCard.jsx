// TheoryCard.js
import React from "react";

const TheoryCard = ({ topic }) => {
  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-800 shadow-md hover:shadow-orange-500/10 transition-all duration-300">
      <h4 className="font-bold text-xl py-4 px-6 bg-neutral-900 text-orange-500">{topic.name}</h4>
      <div className="p-6">
        <div className="bg-neutral-900 p-5 rounded-lg mb-6">
          <p className="text-base text-neutral-400 leading-relaxed">
            {topic.description}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-700">
          <button className="w-full py-3 bg-neutral-900 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300 text-base">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheoryCard;
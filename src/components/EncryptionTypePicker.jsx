// EncryptionTypePicker.js
import React from "react";

const EncryptionTypePicker = ({ setActiveAlgorithm }) => {
  return (
    <div className="flex flex-wrap justify-center gap-10 mb-16">
      <button
        onClick={() => setActiveAlgorithm("symmetric")}
        className="px-8 py-6 border-2 border-amber-600 rounded-lg font-medium transition-all duration-500 
          bg-neutral-900/80 hover:bg-amber-800/20 text-amber-400 shadow-lg hover:shadow-amber-500/20 w-64"
      >
        <div className="text-xl font-semibold mb-2">Symmetric</div>
        <div className="text-sm text-neutral-400">Same key for encryption and decryption</div>
      </button>
      
      <button
        onClick={() => setActiveAlgorithm("asymmetric")}
        className="px-8 py-6 border-2 border-amber-600 rounded-lg font-medium transition-all duration-500 
          bg-neutral-900/80 hover:bg-amber-800/20 text-amber-400 shadow-lg hover:shadow-amber-500/20 w-64"
      >
        <div className="text-xl font-semibold mb-2">Asymmetric</div>
        <div className="text-sm text-neutral-400">Public/private key pairs</div>
      </button>
    </div>
  );
};

export default EncryptionTypePicker;
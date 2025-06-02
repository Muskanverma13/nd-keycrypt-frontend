"use client"; // Essential for interactive components
import React, { useState } from "react";
import EncryptionTypePicker from "./EncryptionTypePicker";
import AlgorithmSelection from "./AlgorithmSelection";
import AlgorithmDemo from "./AlgorithmDemo";

const InteractiveSection = ({
  activeAlgorithm,
  setActiveAlgorithm,
  selectedAlgo,
  setSelectedAlgo,
  symmetricAlgorithms,
  asymmetricAlgorithms,
  inputText,
  setInputText,
  encryptedText,
  decryptedText,
  onEncrypt,
  onDecrypt,
  isProcessing
}) => {
  const [error, setError] = useState(null);

  return (
    <div className="mt-12 max-w-6xl mx-auto">
      <h3 className="text-3xl font-semibold text-center mb-12">
        Try Encryption Algorithms
      </h3>

      {error && (
        <div className="bg-red-900/50 text-red-100 p-4 mb-6 rounded-lg">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {!activeAlgorithm && (
        <EncryptionTypePicker setActiveAlgorithm={setActiveAlgorithm} />
      )}

      {activeAlgorithm && !selectedAlgo && (
        <div>
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setActiveAlgorithm(null)}
              className="text-orange-500 hover:text-orange-400 flex items-center gap-2"
            >
              <span>←</span> Back to encryption types
            </button>
          </div>
          
          <h4 className="text-2xl font-semibold text-center mb-8 text-orange-500">
            {activeAlgorithm === "symmetric" 
              ? "Symmetric Algorithms" 
              : "Asymmetric Algorithms"}
          </h4>
          
          <AlgorithmSelection 
            algorithms={
              activeAlgorithm === "symmetric" 
                ? symmetricAlgorithms.filter(algo => !algo.isCategory)
                : asymmetricAlgorithms.filter(algo => !algo.isCategory)
            } 
            setSelectedAlgo={setSelectedAlgo} 
          />
        </div>
      )}

      {activeAlgorithm && selectedAlgo && (
        <AlgorithmDemo
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          inputText={inputText}
          setInputText={setInputText}
          encryptedText={encryptedText}
          decryptedText={decryptedText}
          onEncrypt={onEncrypt}
          onDecrypt={onDecrypt}
          activeAlgorithm={activeAlgorithm}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
};

export default InteractiveSection;
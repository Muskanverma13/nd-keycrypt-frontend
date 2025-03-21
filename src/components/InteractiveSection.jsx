// InteractiveSection.js
import React from "react";
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
  getEncryptedText,
  getDecryptedText
}) => {
  return (
    <div className="mt-12 max-w-6xl mx-auto">
      <h3 className="text-3xl font-semibold text-center mb-12">Try Encryption Algorithms</h3>
      
      {!activeAlgorithm && (
        <EncryptionTypePicker setActiveAlgorithm={setActiveAlgorithm} />
      )}

      {/* Algorithm Selection */}
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
            {activeAlgorithm === "symmetric" ? "Symmetric Algorithms" : "Asymmetric Algorithms"}
          </h4>
          
          <AlgorithmSelection 
            algorithms={activeAlgorithm === "symmetric" ? symmetricAlgorithms : asymmetricAlgorithms} 
            setSelectedAlgo={setSelectedAlgo} 
          />
        </div>
      )}

      {/* Interactive Demo for Selected Algorithm */}
      {activeAlgorithm && selectedAlgo && (
        <AlgorithmDemo
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          inputText={inputText}
          setInputText={setInputText}
          getEncryptedText={getEncryptedText}
          getDecryptedText={getDecryptedText}
          activeAlgorithm={activeAlgorithm}
        />
      )}
    </div>
  );
};

export default InteractiveSection;
"use client";
import { useState, useEffect } from "react";
import AlgorithmSelection from "./AlgorithmSelection";
import InteractiveSection from "./InteractiveSection";
import VisualSection from "./VisualSection";
import SectionHeader from "./SectionHeader";
import SectionToggle from "./SectionToggle";
import DescriptiveSection from "./DescriptiveSection";
import theoryTopics from "./theoryTopics";

// FIXED: Changed to your deployed backend URL
const API_BASE_URL = "https://nd-keycrypt-backend.onrender.com/api/crypto";

const Features = () => {
  const [activeSection, setActiveSection] = useState("interactive");
  const [activeAlgorithm, setActiveAlgorithm] = useState(null);
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [inputText, setInputText] = useState("Hello");
  const [algorithms, setAlgorithms] = useState({
    symmetric: [],
    asymmetric: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [encryptionResult, setEncryptionResult] = useState("");
  const [decryptionResult, setDecryptionResult] = useState("");

  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/algorithms`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }
        const data = await response.json();
        setAlgorithms(data);
      } catch (err) {
        setError(`Failed to load algorithms: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlgorithms();
  }, []);

  const handleEncrypt = async () => {
    if (!selectedAlgo || !inputText.trim()) {
      setError("Please select an algorithm and enter valid text");
      return false;
    }
    
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/encrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          algorithm: selectedAlgo,
          type: activeAlgorithm
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Encryption failed');
      }
      
      const data = await response.json();
      console.log("Encryption response:", data); // Helpful for debugging
      
      // Ensure we're always setting a string value to encryptionResult
      if (typeof data.encrypted === 'object') {
        // Convert object to JSON string
        setEncryptionResult(JSON.stringify(data.encrypted));
      } else if (selectedAlgo === '3DES') {
        // Special handling for 3DES
        if (data.encrypted && data.encrypted.includes("|")) {
          // If the encrypted result already includes the key separation
          setEncryptionResult(data.encrypted);
        } else if (data.encrypted && data.key) {
          // If key is provided separately
          setEncryptionResult(`${data.encrypted}|${data.key}`);
        } else {
          // Fallback case
          setEncryptionResult(String(data.encrypted || ""));
        }
      } else {
        // Standard case for other algorithms
        setEncryptionResult(String(data.encrypted || ""));
      }
      
      // Clear any previous decryption results
      setDecryptionResult("");
      setError(null);
      return true;
    } catch (err) {
      setError(`Encryption error: ${err.message}`);
      setEncryptionResult("");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptionResult) {
      setError("No encrypted text to decrypt");
      return false;
    }

    try {
      setIsLoading(true);
      let requestBody = {
        text: encryptionResult,
        algorithm: selectedAlgo,
        type: activeAlgorithm
      };

      // Special handling for 3DES
      if (selectedAlgo === '3DES' && encryptionResult.includes('|')) {
        const [encryptedText, key] = encryptionResult.split('|');
        requestBody = {
          text: encryptedText,
          key: key,
          algorithm: selectedAlgo,
          type: activeAlgorithm
        };
      }

      console.log("Decryption request:", requestBody); // Helpful for debugging

      const response = await fetch(`${API_BASE_URL}/decrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Decryption failed');
      }
      
      const data = await response.json();
      console.log("Decryption response:", data); // Helpful for debugging
      
      // Ensure we always set a string value
      setDecryptionResult(String(data.decrypted || ""));
      setError(null);
      return true;
    } catch (err) {
      setError(`Decryption failed: ${err.message}`);
      setDecryptionResult("");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="features-container py-24 px-8 text-white">
      {error && (
        <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded shadow-lg z-50">
          {error}
          <button 
            onClick={() => setError(null)}
            className="ml-4 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-xl">
            <p className="text-orange-500">Processing...</p>
          </div>
        </div>
      )}

      <SectionHeader />

      <SectionToggle 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        setSelectedAlgo={setSelectedAlgo}
      />

      {activeSection === "interactive" && (
        <InteractiveSection 
          activeAlgorithm={activeAlgorithm}
          setActiveAlgorithm={setActiveAlgorithm}
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          symmetricAlgorithms={algorithms.symmetric.filter(algo => !algo.isCategory)}
          asymmetricAlgorithms={algorithms.asymmetric.filter(algo => !algo.isCategory)}
          inputText={inputText}
          setInputText={setInputText}
          encryptedText={encryptionResult}
          decryptedText={decryptionResult}
          onEncrypt={handleEncrypt}
          onDecrypt={handleDecrypt}
          isProcessing={isLoading}
        />
      )}

      {activeSection === "visual" && (
        <VisualSection 
          activeAlgorithm={activeAlgorithm}
          setActiveAlgorithm={setActiveAlgorithm}
          symmetricAlgorithms={algorithms.symmetric}
          asymmetricAlgorithms={algorithms.asymmetric}
        />
      )}

      {activeSection === "descriptive" && (
        <DescriptiveSection theoryTopics={theoryTopics} />
      )}
    </div>
  );
};

export default Features;
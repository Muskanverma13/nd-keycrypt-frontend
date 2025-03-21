import { useState } from "react";
import AlgorithmSelection from "./AlgorithmSelection";
import InteractiveSection from "./InteractiveSection";
import VisualSection from "./VisualSection";
import DescriptiveSection from "./DescriptiveSection";
import SectionHeader from "./SectionHeader";
import SectionToggle from "./SectionToggle";
import { symmetricAlgorithms, asymmetricAlgorithms, theoryTopics } from "./data";

const Features = () => {
  const [activeSection, setActiveSection] = useState("interactive");
  const [activeAlgorithm, setActiveAlgorithm] = useState(null);
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [inputText, setInputText] = useState("Hello");
  
  // Helper function to get current algorithm selected
  const getCurrentAlgorithm = () => {
    if (!selectedAlgo) return null;
    
    if (activeAlgorithm === "symmetric") {
      return symmetricAlgorithms.find(algo => algo.name === selectedAlgo);
    } else {
      return asymmetricAlgorithms.find(algo => algo.name === selectedAlgo);
    }
  };

  // Calculate encrypted and decrypted text based on input and selected algorithm
  const getEncryptedText = () => {
    const algo = getCurrentAlgorithm();
    if (!algo || !inputText) return "";
    return algo.encrypt(inputText);
  };

  const getDecryptedText = () => {
    const algo = getCurrentAlgorithm();
    if (!algo) return "";
    const encrypted = getEncryptedText();
    return algo.decrypt(encrypted);
  };

  return (
    <div className="features-container py-24 px-8 text-white">
      {/* Header Section */}
      <SectionHeader />

      {/* Main Section Buttons */}
      <SectionToggle 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        setSelectedAlgo={setSelectedAlgo}
      />

      {/* Interactive Section */}
      {activeSection === "interactive" && (
        <InteractiveSection 
          activeAlgorithm={activeAlgorithm}
          setActiveAlgorithm={setActiveAlgorithm}
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          symmetricAlgorithms={symmetricAlgorithms}
          asymmetricAlgorithms={asymmetricAlgorithms}
          inputText={inputText}
          setInputText={setInputText}
          getEncryptedText={getEncryptedText}
          getDecryptedText={getDecryptedText}
        />
      )}

      {/* Visual Learners Section */}
      {activeSection === "visual" && (
        <VisualSection 
          activeAlgorithm={activeAlgorithm}
          setActiveAlgorithm={setActiveAlgorithm}
          symmetricAlgorithms={symmetricAlgorithms}
          asymmetricAlgorithms={asymmetricAlgorithms}
        />
      )}

      {/* Descriptive Section */}
      {activeSection === "descriptive" && (
        <DescriptiveSection theoryTopics={theoryTopics} />
      )}
    </div>
  );
};

export default Features;
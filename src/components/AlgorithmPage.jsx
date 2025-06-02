import React from 'react';
import { useParams } from 'react-router-dom';
import CaesarCipherCompiler from './CaesarCipherCompiler';
import TranspositionCipherCompiler from './TranspositionCipherCompiler';
import PlayfairCipherCompiler from './PlayfairCipherCompiler';
import TripleDESCipherCompiler  from './TripleDESCipherCompiler';
import AESCipherCompiler from './AESCipherCompiler';
import RSACipherComponent from './RSACipherComponent';
import DiffieHellmanComponent from './DiffieHellmanComponent';
import CrystalsKyberComponent from './CrystalsKyberComponent';

const AlgorithmPage = () => {
  const { algorithmId } = useParams();
  
  // Map of algorithm IDs to their respective components
  // Add to algorithmComponents object
  const algorithmComponents = {
    'caesar-cipher': <CaesarCipherCompiler />,
    'transposition-cipher': <TranspositionCipherCompiler />,
    'playfair-cipher': <PlayfairCipherCompiler/>,
    '3des': <TripleDESCipherCompiler/>,
    'aes': <AESCipherCompiler/>,
    'rsa': <RSACipherComponent/>,
    'diffie-hellman': <DiffieHellmanComponent/>,
    'crystals-kyber': <CrystalsKyberComponent/>,
  //  'ecc': <ECCipherComponent/>,
 
   
    // Add other algorithms as they are developed
    // 'transposition-cipher': <TranspositionCipherCompiler />,
    // 'playfair-cipher': <PlayfairCipherCompiler />,
    // 'des': <DESCompiler />,
    // etc.
  };
  
  // Show the appropriate component or a placeholder for algorithms not yet implemented
  const selectedComponent = algorithmComponents[algorithmId];
  
  if (selectedComponent) {
    return selectedComponent;
  } else {
    return (
      <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-lg w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-orange-500">{algorithmId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
        <div className="bg-neutral-800 p-8 rounded-lg text-center">
          <p className="text-xl mb-4">This algorithm implementation is coming soon!</p>
          <p className="text-neutral-400">
            We're working on adding interactive examples for all encryption algorithms.
            Currently, only Caesar Cipher is available for hands-on exploration.
          </p>
        </div>
      </div>
    );
  }
};

export default AlgorithmPage;
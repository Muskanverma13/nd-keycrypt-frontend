import React from "react";

// Create an object that maps algorithm names to their descriptions
const algorithmDescriptions = {
  "Caesar Cipher": "The Caesar Cipher is one of the simplest encryption techniques where each letter in the plaintext is shifted a certain number of places down or up the alphabet. Named after Julius Caesar, who used it with a shift of 3 to protect messages of military significance. Despite its simplicity, it's easily broken through brute force as there are only 25 possible shifts.",
  
  "Transposition Cipher": "The Transposition Cipher rearranges the positions of characters in the plaintext without changing the actual characters themselves. It works by placing the message in a grid and then reading it out in a different order or pattern. This creates ciphertext that contains all the original characters but in a completely different sequence.",
  
  "Playfair Cipher": "The Playfair Cipher encrypts pairs of letters (digraphs) instead of single letters. It uses a 5×5 grid of letters constructed using a keyword, with the remaining letters of the alphabet filling the grid. This technique was the first practical digraph substitution cipher and provided significantly improved security over simple monoalphabetic substitution ciphers.",
  
  "3DES": "Triple DES (3DES) applies the Data Encryption Standard (DES) cipher algorithm three times to each data block. It uses a 'key bundle' that comprises three DES keys, each of 56 bits. While slower than its successors, 3DES provides a relatively high level of security through its triple-encryption process, though it's being phased out in favor of more efficient algorithms.",
  
  "AES": "Advanced Encryption Standard (AES) is a symmetric block cipher adopted worldwide as the successor to DES. It processes data in fixed-size blocks (128 bits) using key sizes of 128, 192, or 256 bits. AES uses a substitution-permutation network with multiple rounds of transformations including SubBytes, ShiftRows, MixColumns, and AddRoundKey operations, making it both efficient and highly secure.",
  
  "RSA": "RSA (Rivest–Shamir–Adleman) is an asymmetric cryptosystem that uses two different but mathematically linked keys. It's based on the practical difficulty of factoring the product of two large prime numbers. The public key is used for encryption and can be shared openly, while the private key is kept secret and used for decryption. RSA is widely used for secure data transmission and digital signatures.",
  
  "ECC": "Elliptic Curve Cryptography (ECC) is an approach to public-key cryptography based on the algebraic structure of elliptic curves over finite fields. ECC requires smaller keys compared to non-EC cryptography to provide equivalent security. It's particularly valuable in environments with limited processing power, memory, or bandwidth, such as mobile devices and IoT applications.",
  
  "EdDSA": "Edwards-curve Digital Signature Algorithm (EdDSA) is a digital signature scheme using a variant of Schnorr signatures based on twisted Edwards curves. Most commonly implemented as Ed25519, it offers high security, fast performance, and resistance against side-channel attacks. EdDSA signatures are deterministic, eliminating the need for a secure random number generator during signing.",
  
  "Diffie-Hellman": "The Diffie-Hellman key exchange protocol allows two parties to securely establish a shared secret key over an unsecured communication channel. It works by having parties exchange public values while each keeping their own private value secret. Using mathematical properties, both parties can independently compute the same shared secret, which can then be used for symmetric encryption, without ever having transmitted the secret itself.",
  
  "Crystals-Kyber": "CRYSTALS-Kyber is a post-quantum key encapsulation mechanism (KEM) designed to be secure against attacks from quantum computers. Based on the hardness of the learning-with-errors (LWE) problem on module lattices, it was selected by NIST as the standard for post-quantum key establishment. Kyber offers a balance of security, performance, and key size that makes it practical for real-world implementation while providing protection against future quantum computing threats."
};

const AlgorithmDemo = ({
  selectedAlgo,
  setSelectedAlgo,
  inputText,
  setInputText,
  getEncryptedText,
  getDecryptedText,
  activeAlgorithm
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center mb-10">
        <button
          onClick={() => setSelectedAlgo(null)}
          className="text-orange-500 hover:text-orange-400 flex items-center gap-2"
        >
          <span>←</span> Back to algorithm selection
        </button>
      </div>

      <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-8 shadow-lg">
        <h4 className="text-2xl font-semibold mb-8 text-orange-500 text-center">{selectedAlgo}</h4>
        
        <div className="mb-8">
          <label className="block text-neutral-300 mb-2 font-medium">Your Message</label>
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white"
            placeholder="Enter text to encrypt"
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-neutral-300 mb-2 font-medium">Encrypted Result</label>
          <div className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-orange-400 font-mono">
            {getEncryptedText() || "Enter text above to see encryption"}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-neutral-300 mb-2 font-medium">Decrypted Result</label>
          <div className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-teal-400 font-mono">
            {getDecryptedText() || "Enter text above to see decryption"}
          </div>
        </div>
        
        <div className="mt-8 bg-neutral-800/50 rounded-lg p-4">
          <h5 className="font-medium text-orange-500 mb-2">How {selectedAlgo} Works</h5>
          <p className="text-neutral-400 text-sm">
            {algorithmDescriptions[selectedAlgo] || 
              (activeAlgorithm === "symmetric"
                ? "This symmetric algorithm uses the same key for both encryption and decryption processes."
                : "This asymmetric algorithm uses different keys for encryption (public key) and decryption (private key).")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDemo;
// data.js
export const symmetricAlgorithms = [
    { 
      name: "Caesar Cipher", 
      video: "https://www.youtube.com/embed/video1",
      encrypt: (text, key = 3) => {
        return text.split('').map(char => {
          if (!/[a-zA-Z]/.test(char)) return char;
          
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          
          return String.fromCharCode(((code - offset + key) % 26) + offset);
        }).join('');
      },
      decrypt: (text, key = 3) => {
        return text.split('').map(char => {
          if (!/[a-zA-Z]/.test(char)) return char;
          
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const offset = isUpperCase ? 65 : 97;
          
          return String.fromCharCode(((code - offset - key + 26) % 26) + offset);
        }).join('');
      }
    },
    { 
      name: "Transposition Cipher", 
      video: "https://www.youtube.com/embed/video2",
      encrypt: (text, key = 3) => {
        const columns = [];
        for (let i = 0; i < key; i++) {
          columns.push([]);
        }
        
        for (let i = 0; i < text.length; i++) {
          const column = i % key;
          columns[column].push(text[i]);
        }
        
        return columns.flat().join('');
      },
      decrypt: (text, key = 3) => {
        if (!text) return '';
        const numRows = Math.ceil(text.length / key);
        const numColumns = key;
        const numFilledCells = text.length;
        const numEmptyCells = (numRows * numColumns) - numFilledCells;
        
        const columns = [];
        let textIndex = 0;
        
        for (let i = 0; i < numColumns; i++) {
          const column = [];
          for (let j = 0; j < numRows; j++) {
            if (i >= numColumns - numEmptyCells && j === numRows - 1) {
              column.push('');
            } else {
              column.push(text[textIndex++]);
            }
          }
          columns.push(column);
        }
        
        let result = '';
        for (let row = 0; row < numRows; row++) {
          for (let col = 0; col < numColumns; col++) {
            if (columns[col][row]) {
              result += columns[col][row];
            }
          }
        }
        
        return result;
      }
    },
    { 
      name: "Playfair Cipher", 
      video: "https://www.youtube.com/embed/video3",
      encrypt: (text) => {
        // Simplified implementation
        return text.split('').reverse().join(''); 
      },
      decrypt: (text) => {
        // Simplified implementation
        return text.split('').reverse().join('');
      }
    },
    { 
      name: "3DES", 
      video: "https://www.youtube.com/embed/video4",
      encrypt: (text) => {
        // Simplified implementation
        return btoa(text);
      },
      decrypt: (text) => {
        try {
          return atob(text);
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "AES", 
      video: "https://www.youtube.com/embed/video5",
      encrypt: (text) => {
        // Simplified implementation for demo only
        return btoa(text);
      },
      decrypt: (text) => {
        try {
          return atob(text);
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
  ];
  
  export const asymmetricAlgorithms = [
    { 
      name: "RSA", 
      video: "https://www.youtube.com/embed/video6",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==RSA==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==RSA==")) return "Invalid RSA ciphertext";
        try {
          return atob(text.replace("==RSA==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "ECC", 
      video: "https://www.youtube.com/embed/video7",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==ECC==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==ECC==")) return "Invalid ECC ciphertext";
        try {
          return atob(text.replace("==ECC==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "EDDSA", 
      video: "https://www.youtube.com/embed/video8",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==EDDSA==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==EDDSA==")) return "Invalid EDDSA ciphertext";
        try {
          return atob(text.replace("==EDDSA==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "Diffie-Hellman", 
      video: "https://www.youtube.com/embed/video9",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==DH==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==DH==")) return "Invalid Diffie-Hellman ciphertext";
        try {
          return atob(text.replace("==DH==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
    { 
      name: "Crystals-Kyber", 
      video: "https://www.youtube.com/embed/video10",
      encrypt: (text) => {
        // Simplified implementation for demo
        return btoa(text) + "==KYBER==";
      },
      decrypt: (text) => {
        if (!text.endsWith("==KYBER==")) return "Invalid Kyber ciphertext";
        try {
          return atob(text.replace("==KYBER==", ""));
        } catch (e) {
          return "Invalid input for decryption";
        }
      }
    },
  ];
  
  // Theory topics for descriptive section
  export const theoryTopics = [
    "Cryptography Basics",
    "Symmetric Encryption Principles",
    "Asymmetric Encryption Principles",
    "Hash Functions",
    "Digital Signatures",
    "Key Management",
    "Cryptanalysis",
    "Quantum Cryptography",
    "Blockchain Cryptography"
  ];
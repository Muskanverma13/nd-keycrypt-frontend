const CryptoJS = require('crypto-js');

// Add a general symmetric encryption category with video
const symmetricEncryption = {
  name: "Symmetric Encryption",
  video: "https://www.youtube.com/embed/Q0Rp8yX5qEk?si=gVgYci2Ycl81VktE",
  description: "Encryption where the same key is used for both encryption and decryption",
  example: "Includes ciphers like AES, 3DES, Caesar, and Playfair",
  isCategory: true  // Flag to identify this as a category card
};

// Caesar Cipher
const caesarCipher = {
    name: "Caesar Cipher",
    video: "https://www.youtube.com/embed/sMOZf4GN3oc?si=cULJb5Tq4qt0YaYn",
    description: "Caesar cipher shifts letters by a fixed number, wrapping around the alphabet cyclically.",
    example: "Encrypting 'HELLO' → 'IFMMP', Decrypting 'IFMMP' → 'HELLO'",
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
  };
  
  // Transposition Cipher
  const transpositionCipher = {
    name: "Transposition Cipher",
    video: "https://www.youtube.com/embed/bcyUJK1BvHw?si=H7n1aLz6JQRoOWXd",
    description: "Rearranges characters based on columns for encryption.",
    example: "Encrypting 'HELLOWORLD' with key 3 → 'HOREL OLLWD'",
    encrypt: (text, key = 3) => {
      // Remove spaces and normalize text
      const cleanText = text.replace(/\s+/g, '').toUpperCase();
      
      // Pad text if needed
      const paddedText = cleanText + 'X'.repeat((key - (cleanText.length % key)) % key);
      
      // Create matrix
      const matrix = [];
      for (let i = 0; i < paddedText.length; i += key) {
        matrix.push(paddedText.slice(i, i + key));
      }
      
      // Read by columns
      let result = '';
      for (let col = 0; col < key; col++) {
        for (let row = 0; row < matrix.length; row++) {
          if (matrix[row][col]) result += matrix[row][col];
        }
      }
      
      return result;
    },
    decrypt: (text, key = 3) => {
      if (!text) return '';
      
      const rows = Math.ceil(text.length / key);
      const cols = key;
      const matrix = Array(rows).fill().map(() => Array(cols).fill(''));
      
      // Calculate last row padding
      const lastRowLength = text.length % key || key;
      
      let pos = 0;
      for (let col = 0; col < cols; col++) {
        const colHeight = col < lastRowLength ? rows : rows - 1;
        for (let row = 0; row < colHeight; row++) {
          matrix[row][col] = text[pos++];
        }
      }
      
      return matrix.map(row => row.join('')).join('');
    }
};

// Playfair Cipher object
const playfairCipher = {
  name: "Playfair Cipher",
  video: "https://www.youtube.com/embed/quKhvu2tPy8?si=8M60o9WUPgkEZNaN",
  description: "Uses a 5x5 grid of letters for encryption",
  example: "Encrypts digraphs (letter pairs) instead of single letters",
  encrypt: (text, key = "MONARCHY") => {
    const createMatrix = (key) => {
      const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
      const keySet = new Set(key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, ''));
      const matrix = [...keySet, ...alphabet].filter((c, i, arr) => arr.indexOf(c) === i).slice(0, 25);
      return Array(5).fill().map((_, i) => matrix.slice(i * 5, (i + 5) * 5));
    };

    const findPosition = (matrix, char) => {
      for (let i = 0; i < 5; i++)
        for (let j = 0; j < 5; j++)
          if (matrix[i][j] === char) return [i, j];
      return null;
    };

    try {
      const matrix = createMatrix(key);
      const cleanText = text.toUpperCase()
        .replace(/J/g, 'I')
        .replace(/[^A-Z]/g, '')
        .split('')
        .reduce((acc, curr, i, arr) => {
          if (i % 2 === 0) {
            if (i === arr.length - 1) return [...acc, curr + 'X'];
            return curr === arr[i + 1] ? [...acc, curr + 'X'] : [...acc, curr + arr[i + 1]];
          }
          return acc;
        }, []).join('');

      let result = '';
      for (let i = 0; i < cleanText.length; i += 2) {
        const pos1 = findPosition(matrix, cleanText[i]);
        const pos2 = findPosition(matrix, cleanText[i + 1]);

        if (!pos1 || !pos2) continue;

        const [row1, col1] = pos1;
        const [row2, col2] = pos2;

        if (row1 === row2) {
          result += matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
        } else if (col1 === col2) {
          result += matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
        } else {
          result += matrix[row1][col2] + matrix[row2][col1];
        }
      }
      return result;
    } catch (e) {
      console.error('Playfair encryption error:', e);
      return null;
    }
  },
  decrypt: (text, key = "MONARCHY") => {
    const createMatrix = (key) => {
      const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
      const keySet = new Set(key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, ''));
      const matrix = [...keySet, ...alphabet].filter((c, i, arr) => arr.indexOf(c) === i).slice(0, 25);
      return Array(5).fill().map((_, i) => matrix.slice(i * 5, (i + 5) * 5));
    };

    const findPosition = (matrix, char) => {
      for (let i = 0; i < 5; i++)
        for (let j = 0; j < 5; j++)
          if (matrix[i][j] === char) return [i, j];
      return null;
    };

    try {
      const matrix = createMatrix(key);
      const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');

      let result = '';
      for (let i = 0; i < cleanText.length; i += 2) {
        const pos1 = findPosition(matrix, cleanText[i]);
        const pos2 = findPosition(matrix, cleanText[i + 1]);

        if (!pos1 || !pos2) continue;

        const [row1, col1] = pos1;
        const [row2, col2] = pos2;

        if (row1 === row2) {
          result += matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
        } else if (col1 === col2) {
          result += matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2];
        } else {
          result += matrix[row1][col2] + matrix[row2][col1];
        }
      }
      return result.replace(/X$/, '');
    } catch (e) {
      console.error('Playfair decryption error:', e);
      return null;
    }
  }
};

// 3DES object
const threeDES = {
  name: "3DES",
  video: "https://www.youtube.com/embed/-tRekrZJyBQ?si=zB-ylJtXIwVRKB32",
  description: "Triple Data Encryption Standard",
  example: "Applies DES algorithm three times to each data block",
  
  // Custom separator that's unlikely to appear in encrypted content
  SEPARATOR: "::3DES_KEY::",
  
  encrypt: (text) => {
    try {
      if (!text) return "Error: Empty input";
      
      // Generate a random key
      const key = CryptoJS.lib.WordArray.random(16).toString();
      
      // Encrypt the text
      const encrypted = CryptoJS.TripleDES.encrypt(text, key).toString();
      
      // Return with a unique separator that's unlikely to be part of the encrypted text
      return `${encrypted}${threeDES.SEPARATOR}${key}`;
    } catch (e) {
      console.error("3DES encryption error:", e);
      return "Error: Encryption failed";
    }
  },
  
  decrypt: (text) => {
    try {
      console.log("Input for decryption:", text);
      
      // Check if text contains the separator
      if (!text || !text.includes(threeDES.SEPARATOR)) {
        // Fall back to pipe separator for backward compatibility
        if (text.includes("|")) {
          console.log("Using fallback pipe separator");
          const [encryptedText, key] = text.split("|");
          try {
            const bytes = CryptoJS.TripleDES.decrypt(encryptedText, key);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if (decrypted) return decrypted;
          } catch (e) {
            console.error("Fallback decryption failed:", e);
          }
        }
        
        console.log("Invalid input format, missing separator:", text);
        return "Error: Invalid input format. Please re-encrypt your message.";
      }
      
      // Split the encrypted text and key
      const [encryptedText, key] = text.split(threeDES.SEPARATOR);
      
      if (!encryptedText || !key) {
        console.log("Invalid input parts after split:", { encryptedText, key });
        return "Error: Invalid encryption data or key";
      }
      
      // Decrypt using the extracted key
      const bytes = CryptoJS.TripleDES.decrypt(encryptedText, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decrypted) {
        console.log("Decryption produced empty result");
        return "Error: Decryption failed. The key may be incorrect.";
      }
      
      return decrypted;
    } catch (e) {
      console.error("3DES decryption error:", e);
      return `Error: Decryption failed (${e.message})`;
    }
  },
  
  // Debug function to test encryption and decryption directly
  testEncryptDecrypt: (text) => {
    const encrypted = threeDES.encrypt(text);
    console.log("Test encryption result:", encrypted);
    const decrypted = threeDES.decrypt(encrypted);
    console.log("Test decryption result:", decrypted);
    return { encrypted, decrypted };
  }
};

// AES (Simplified version for demo)
const aes = {
  name: "AES",
  video: "https://www.youtube.com/embed/gP4PqVGudtg?si=xWc3j1GLv9AZD9YM",
  description: "Advanced Encryption Standard - industry standard for secure encryption",
  example: "Uses substitution-permutation network with multiple rounds",
  encrypt: (text, key = "defaultKey123") => {
    return CryptoJS.AES.encrypt(text, key).toString();
  },
  decrypt: (text, key = "defaultKey123") => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return "Invalid input for decryption";
    }
  }
};

// Export all algorithms
module.exports = [
  symmetricEncryption,  // Added at the beginning for category
  caesarCipher,
  transpositionCipher,
  playfairCipher,
  threeDES,
  aes
];
const CryptoJS = require('crypto-js');

// Generate a 24-character key
const generateKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 24; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

// Encrypt
const encrypt3DES = (text, key) => {
  try {
    const encrypted = CryptoJS.TripleDES.encrypt(text, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
    return encrypted;
  } catch (e) {
    console.error("Encryption failed:", e.message);
    return null;
  }
};

// Decrypt
const decrypt3DES = (cipherText, key) => {
  try {
    const decrypted = CryptoJS.TripleDES.decrypt(cipherText, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (e) {
    console.error("Decryption failed:", e.message);
    return null;
  }
};

// Test it
const myKey = generateKey();
const myText = "Hello, this is Muskan!";
console.log("Key:", myKey);

const encrypted = encrypt3DES(myText, myKey);
console.log("Encrypted:", encrypted);

const decrypted = decrypt3DES(encrypted, myKey);
console.log("Decrypted:", decrypted);

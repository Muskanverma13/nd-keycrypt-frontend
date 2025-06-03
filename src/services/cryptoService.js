const API_BASE_URL = 'https://nd-keycrypt-backend.onrender.com/api/crypto';

export const getAlgorithms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch algorithms:", error);
    return { symmetric: [], asymmetric: [] };
  }
};

export const encryptText = async (text, algorithm, type, key = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/encrypt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, algorithm, type, key })
    });
    const data = await response.json();
    
    // Special handling for 3DES response
    if (algorithm === '3DES' && data.encrypted && data.key) {
      return {
        encrypted: `${data.encrypted}|${data.key}`
      };
    }
    return data;
  } catch (error) {
    console.error("Encryption failed:", error);
    return { error: "Encryption failed" };
  }
};

export const decryptText = async (text, algorithm, type, key = null) => {
  try {
    // Special handling for 3DES input
    let requestBody = { text, algorithm, type, key };
    if (algorithm === '3DES' && text.includes('|')) {
      const [encryptedText, encryptionKey] = text.split('|');
      requestBody = {
        text: encryptedText,
        key: encryptionKey,
        algorithm,
        type
      };
    }

    const response = await fetch(`${API_BASE_URL}/decrypt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    return await response.json();
  } catch (error) {
    console.error("Decryption failed:", error);
    return { error: "Decryption failed" };
  }
};
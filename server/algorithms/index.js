const symmetricAlgorithms = require('./symmetric');
const asymmetricAlgorithms = require('./asymmetric');

// Debug log to see what's being exported
console.log('Symmetric algorithms loaded:', symmetricAlgorithms.map(algo => algo.name));
console.log('Asymmetric algorithms loaded:', asymmetricAlgorithms.map(algo => algo.name));

module.exports = {
  symmetricAlgorithms,
  asymmetricAlgorithms,
  getAlgorithmByName: (name, type) => {
    const algorithms = type === 'symmetric' ? symmetricAlgorithms : asymmetricAlgorithms;
    return algorithms.find(algo => algo.name === name);
  }
};
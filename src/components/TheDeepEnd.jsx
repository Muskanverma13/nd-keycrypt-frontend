// CryptoFeed.jsx
import { useNavigate } from 'react-router-dom';
import blockchainImage from '../assets/blockchain.png';
import hsmImage from '../assets/hsm.png';
import quantumImage from '../assets/QuantumComputing.png';
import apiImage from '../assets/api.png';
import ccsImage from '../assets/ccs.png'
import IsometricBackground from './IsometricBackground';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const TheDeepEnd = () => {
  const navigate = useNavigate();
  const [showBlockchainInfo, setShowBlockchainInfo] = useState(false);
  // Add this near your other useState declarations
const [showHsmInfo, setShowHsmInfo] = useState(false);
// Add this with your other useState declarations
const [showQuantumInfo, setShowQuantumInfo] = useState(false);
const [showApiInfo, setShowApiInfo] = useState(false);
const [showCommunityInfo, setShowCommunityInfo] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full fixed inset-0 overflow-auto">
       <IsometricBackground /> 
      {/* Back button in top left corner - changed text color to black */}
      <div className="fixed top-4 left-4 z-50">
        <button 
          onClick={handleBackClick}
          className="text-black hover:text-blue-600 transition-colors bg-white/50 backdrop-blur-sm py-2 px-4 rounded-full"
        >
          ← Surface
        </button>
      </div>

      {/* Main Content Area - removed the thin black line by adjusting container styles */}
      <div className="container mx-auto pt-24 pb-16 px-4">
     
       
        
        {/* Content Cards */}
        <div className="flex flex-col gap-8 max-w-[600px] mx-auto">
          {/* Blockchain Card - Only shows heading and image initially */}
          <div 
            onClick={() => setShowBlockchainInfo(true)}
            className="bg-white rounded-2xl shadow-md p-6 w-full cursor-pointer transition-all duration-300 h-[500px] overflow-hidden"
          >
            <div className="text-sm text-gray-500 mb-2">
              LearnCrypt <span className="mx-2">›</span> Keep Learning
            </div>
            <h3 className="text-3xl font-semibold mb-6 text-black">What is Blockchain?</h3>
            <div className="mb-4">
              <img 
                src={blockchainImage} 
                alt="Blockchain Illustration" 
                className="w-[650px] h-[300px] object-contain rounded-3xl mb-4 mx-auto"
              />
            </div>
          </div>

          {/* Blockchain Info Overlay - Shows only when card is clicked */}
          <AnimatePresence>
            {showBlockchainInfo && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-[100]"
                  onClick={() => setShowBlockchainInfo(false)}
                />
                
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed inset-0 flex items-center justify-center z-[101] p-4 pt-20"
                >
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="bg-white rounded-2xl overflow-auto p-8 relative w-full max-w-4xl max-h-[85vh] mt-8 custom-scrollbar"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#CBD5E0 #F7FAFC',
                    }}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBlockchainInfo(false);
                      }}
                      className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
                    >
                      ×
                    </button>
                    
                    <div className="text-sm text-gray-500 mb-2">
                      LearnCrypt <span className="mx-2">›</span> Keep Learning
                    </div>
                    <h3 className="text-4xl font-semibold mb-8 text-black">What is Blockchain?</h3>
                    <img 
                      src={blockchainImage} 
                      alt="Blockchain Illustration" 
                      className="w-full max-h-[400px] object-contain rounded-3xl mb-8"
                    />
                    
                    {/* Blockchain content that appears when the card is clicked */}
                    <div className="space-y-4 text-gray-700">
                      <p>
                        Blockchain is a type of database, but instead of storing data in tables like traditional databases, 
                        it stores data in blocks. These blocks are connected (or chained) together in order, creating a 
                        timeline of information. Once data is added to a block and that block is added to the chain, 
                        it cannot be changed. That makes it super trustworthy.
                      </p>
                      
                      <h4 className="text-xl font-semibold text-black mt-6">How Does Blockchain Work?</h4>
                      <p>Let's break this down into simple steps:</p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>A transaction is requested. 
                          <br/>
                        <br/> ○ For example, Person A wants to send money to Person B.</li>
                        <br/>
                        <li>The request is shared with a network of computers (called nodes).
                          <br/>
                         <br/> ○ These nodes check if the transaction is valid.</li>
                         <br/> 
                        <li>If the transaction is valid, it is grouped with other transactions into a block.</li>
                        <br/>
                        <li>The block is then added to the blockchain.
                          <br/>
                        <br/> ○ This happens only after a process called "consensus," where nodes agree that the transaction is legit.</li>
                        <br/>
                        <li>Now, the transaction is complete and recorded forever.</li>
                      </ol>
                      
                      <p className="mt-4">Each block contains:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>The data (like transaction details)</li>
                        <li>A unique code called a hash</li>
                        <li>The hash of the previous block, linking them together</li>
                      </ul>
                      <p className="mt-2">
                        This system ensures that no one can tamper with past records without changing all the blocks 
                        that follow, which is nearly impossible.
                      </p>
                      
                      <h4 className="text-xl font-semibold text-black mt-6">What Kind of Encryption Does Blockchain Use?</h4>
                      <p>Blockchain uses cryptography to keep data secure. Two important techniques are:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <span className="font-medium">SHA-256 (Secure Hash Algorithm):</span>
                          <ul className="pl-6 mt-1">
                            <li> ○ Used to create a unique digital fingerprint of the data.</li>
                            <br/>
                            <li> ○ Even the smallest change in data produces a totally different hash.</li>
                          </ul>
                        </li>
                        <br/>
                        <li>
                          <span className="font-medium">ECDSA (Elliptic Curve Digital Signature Algorithm):</span>
                          <ul className="pl-6 mt-1">
                            <li>○ This is used to sign transactions.</li>
                            <br/>
                            <li>○ Only someone with the correct private key can create a valid signature.</li>
                          </ul>
                        </li>
                      </ul>
                      <p className="mt-2">
                        These techniques ensure that only the rightful owner can initiate a transaction, 
                        and no one can tamper with the data.
                      </p>
                      
                      <h4 className="text-xl font-semibold text-black mt-6">How Does Blockchain Keep Data Safe and Authentic?</h4>
                      <ol className="list-decimal pl-6 space-y-3">
                        <li>
                          <span className="font-medium">Authentication:</span>
                          <ul className="pl-6 mt-1">
                            <li>○ Every user has a unique digital identity using public and private keys.</li>
                            <br/>
                            <li>○ Transactions are signed with a private key and can be verified with the public key.</li>
                          </ul>
                        </li>
                        <li>
                          <span className="font-medium">Integrity:</span>
                          <ul className="pl-6 mt-1">
                            <li>○ Each block's data is linked to the previous block.</li>
                            <br/>
                            <li>○ If anyone tries to change one block, it changes the hash and breaks the chain.</li>
                          </ul>
                        </li>
                        <li>
                          <span className="font-medium">Decentralization:</span>
                          <ul className="pl-6 mt-1">
                            <li>○ No single person or organization controls the blockchain.</li>
                            <br/>
                            <li>○ Copies of the blockchain exist on thousands of computers.</li>
                            <br/>
                            <li>○Hacking all of them at once is practically impossible.</li>
                          </ul>
                        </li>
                      </ol>
                      
                      <h4 className="text-xl font-semibold text-black mt-6">Learn More About Blockchain</h4>
                      <p className="font-medium mt-2">Great websites for better understanding:</p>
<ul className="list-disc pl-6">
  <li><a href="https://www.investopedia.com/terms/b/blockchain.asp" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">What is Blockchain?</a></li>
  <li><a href="https://builtin.com/blockchain/blockchain-applications" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Applications and Real World use-cases</a></li>
  <li><a href="https://www.upgrad.com/blog/cryptography-in-blockchain/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Exploring Cryptography in Blockchain</a></li>
</ul>
                      <p className="font-medium mt-4">Research papers available for further reading:</p>
<ul className="list-disc pl-6">
  <li><a href="https://blockchain.ubc.ca/research/research-papers" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">UBC Blockchain Research Papers</a></li>
  <li><a href="https://www.sciencedirect.com/journal/blockchain-research-and-applications" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Blockchain Research and Applications Journal</a></li>
</ul>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

       {/* HSM Info Overlay - Shows only when card is clicked */}
<AnimatePresence>
  {showHsmInfo && (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[100]"
        onClick={() => setShowHsmInfo(false)}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 flex items-center justify-center z-[101] p-4 pt-20"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl overflow-auto p-8 relative w-full max-w-4xl max-h-[85vh] mt-8 custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #F7FAFC',
          }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowHsmInfo(false);
            }}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
          
          <div className="text-sm text-gray-500 mb-2">
            LearnCrypt <span className="mx-2">›</span> Keep Learning
          </div>
          <h3 className="text-4xl font-semibold mb-8 text-black">Hardware Security Module (HSM)</h3>
          <img 
            src={hsmImage} 
            alt="HSM Illustration" 
            className="w-full max-h-[400px] object-contain rounded-3xl mb-8"
          />
          
          {/* HSM content that appears when the card is clicked */}
          <div className="space-y-4 text-gray-700">
            {/* Write your HSM content here */}
            <div className="space-y-4 text-gray-700">
                      <p>
                      Think of an HSM like a super-secure digital safe — but instead of storing cash or gold, it stores something even more valuable in the tech world: cryptographic keys. These keys are like secret codes used to lock and unlock digital data. 

Just like you’d store your important documents or jewelry in a locker at a bank to protect them, big companies use HSMs to protect their secret keys — which are used to encrypt/decrypt sensitive data, verify identity, and more. 
                      </p>
                      
                      <h4 className="text-xl font-semibold text-black mt-6"> Why Do We Need an HSM? </h4>
                      <p>Imagine you're using online banking. Every time you log in, check your balance, or transfer money — there’s a lot happening in the background to secure your identity and keep your transaction private. HSMs are the devices banks use to keep all the encryption and decryption secure and tamper-proof.</p>
                     
                     
                      
                      <h4 className="text-xl font-semibold text-black mt-6">What Does an HSM Actually Do? </h4>
                      <p>Here’s what an HSM typically handles: </p>
                      <ul className="list-disc pl-6 space-y-2">
                       
              
                          <ul className="pl-6 mt-1">
                            <li> ○ Key Generation: It creates cryptographic keys in a secure way. </li>
                            <br/>
                            <li> ○ Key Storage: Keeps the keys inside a locked “hardware box” where no one can steal them. </li>
                            <br/>
                            <li> ○ Encryption/Decryption: It can use the stored keys to lock (encrypt) or unlock (decrypt) information. </li>
                            <br/>
                            <li> ○ Digital Signatures: It can sign data to prove it's genuine and hasn’t been altered. </li>
                            <br/>
                            <li> ○ Authentication: Confirms that people or systems are who they say they are. </li>
                          </ul>
                      
                       </ul>
              
                      
                      <h4 className="text-xl font-semibold text-black mt-6">Real-World Example</h4>
                
                      <p> Let’s say Amazon has millions of users shopping every second. Every user’s credit card info, passwords, and personal data need to be stored securely. </p>
                      <ol className="list-decimal pl-6 space-y-3">
                       
                          <span className="font-medium"> So, Amazon uses HSMs to:  </span>

                          <ul className="pl-6 mt-1">
                            <li>○ Store the encryption keys that protect your card info </li>
                            <br/>
                            <li>○ Decrypt it only when needed (e.g., during checkout) </li>
                            <br/>
                            <li>○ Make sure nobody — not even Amazon employees — can access those raw details  </li>
                            <br/>
                            <li>○ Sign digital receipts and validate identities securely </li>
                          </ul>
                        <p>Even if someone hacks Amazon’s servers, they still can’t steal your data unless they physically steal the HSM — and even then, most HSMs are designed to self-destruct (wipe the keys) if tampered with. </p>
                       
                      </ol>
                      
                      <h4 className="text-xl font-semibold text-black mt-6">What Kinds of Encryption Are Used? </h4>
                      <p className="font-medium mt-2">HSMs support different types of encryption depending on the need. The main ones include: </p>
                      <div className="overflow-x-auto mt-6">
  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
    <thead>
      <tr className="bg-gray-50">
        <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Algorithm</th>
        <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Type</th>
        <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Used For</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="py-3 px-4 border-b">AES (Advanced Encryption Standard)</td>
        <td className="py-3 px-4 border-b">Symmetric</td>
        <td className="py-3 px-4 border-b">Fast encryption of large amounts of data (e.g. files, backups)</td>
      </tr>
      <tr className="bg-gray-50">
        <td className="py-3 px-4 border-b">RSA (Rivest-Shamir-Adleman)</td>
        <td className="py-3 px-4 border-b">Asymmetric</td>
        <td className="py-3 px-4 border-b">Digital signatures and secure communication (e.g., HTTPS)</td>
      </tr>
      <tr>
        <td className="py-3 px-4 border-b">ECC (Elliptic Curve Cryptography)</td>
        <td className="py-3 px-4 border-b">Asymmetric</td>
        <td className="py-3 px-4 border-b">Same purpose as RSA but faster and lighter, great for mobile & IoT</td>
      </tr>
      <tr className="bg-gray-50">
        <td className="py-3 px-4 border-b">SHA (Secure Hash Algorithm)</td>
        <td className="py-3 px-4 border-b">Hashing</td>
        <td className="py-3 px-4 border-b">Verifies data integrity, ensures nothing was changed</td>
      </tr>
    </tbody>
  </table>
</div>
<h4 className="text-xl font-semibold text-black mt-6"> How Does HSM Actually Secure Everything?  </h4>
<p className="font-medium mt-2">Let’s walk through this step by step:  </p>
<ul className="pl-6 mt-1">
                            <li>1. Encryption & Decryption </li>
                              <br/>
                            <li>  Say you want to store a password securely. The HSM stores the key and performs encryption inside itself, so your actual password never touches your system memory in plain form. It becomes a locked message.  
                          
                            <br/> When needed, the HSM can decrypt it — again, without ever exposing the secret key to your code or your server. </li>
                            <br/>
                            <li> 2. Authentication</li>
                          
                            <br/> <li>When your app or a user tries to access sensitive data, HSM checks their credentials by comparing digital signatures or key verifications. <br/>
                            So if an imposter tries to act like you, the HSM can say “Nope! Not the real one” because the key won’t match. </li>
                            <br/>
                            <li>3. Tamper-Proof Design </li>
                            <br/> <li>Most real HSMs come with hardware-level protection: </li>
                            <br/>
                            <li>○ If someone tries to physically open the device →  it automatically deletes all the keys inside.  </li>
                            <br/>
                            <li>○ If the device is moved or the environment changes unexpectedly → it locks itself or wipes data.  </li>
                            <br/>
                            <li>This ensures nobody can steal or misuse the secrets, even with physical access. </li>
                          </ul>
                          <h4 className="text-xl font-semibold text-black mt-6"> Why Companies Use HSMs?</h4>
                          <ul className="pl-6 mt-1">
                            <li>○ <b>Banks–</b> for securing money transfers and ATM keys </li>
                            <br/>
                            <li>○ <b>Healthcare –</b> to keep patient records encrypted </li>
                            <br/><li>○ <b>E-commerce –</b> for credit card encryption </li>
                            <br/> <li>○ <b> Cloud platforms –</b> for secure API communication and data storage </li>


                          </ul>
                          <h4 className="text-xl font-semibold text-black mt-6">Learn More About HSM</h4>
                      <p className="font-medium mt-2">Great websites for better understanding:</p>
<ul className="list-disc pl-6">
  <li><a href="https://cpl.thalesgroup.com/resources/encryption/what-is-a-hardware-security-module-video" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">What is Hardware Security Module?</a></li>
  <li><a href="https://www.sciencedirect.com/topics/computer-science/hardware-security-module" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Hardware Security Module</a></li>
  <li><a href="https://www.entrust.com/resources/learn/what-are-hardware-security-modules" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">What is Hardware Security Module and its services?</a></li>
</ul>
                      <p className="font-medium mt-4">Research papers available for further reading:</p>
<ul className="list-disc pl-6">
  <li><a href="https://www.encryptionconsulting.com/the-essential-role-of-hsm-in-pki/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">The Essential Role of Hardware Security Modules (HSMs) in Public Key Infrastructures (PKI) </a></li>
  <li><a href="https://www.researchgate.net/publication/364915312_Integration_of_Hardware_Security_Modules_and_Permissioned_Blockchain_in_Industrial_IoT_Networks" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">ntegration of Hardware Security Modules and Permissioned Blockchain in Industrial IoT Networks</a></li>
</ul>
                    </div>
            
            {/* Add more HSM content sections here */}
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>
         {/* Hardware Security Module Card */}
<div 
  onClick={() => setShowHsmInfo(true)}
  className="bg-white rounded-2xl shadow-md p-6 w-full cursor-pointer transition-all duration-300 h-[500px] overflow-hidden"
>
  <div className="text-sm text-gray-500 mb-2">
    LearnCrypt <span className="mx-2">›</span> Keep Learning
  </div>
  <h3 className="text-3xl font-semibold mb-6 text-black">Hardware Security Module (HSM)</h3>
  <div className="rounded-3xl overflow-hidden">
  <img
    src={hsmImage}
    alt="  HSM Illustration"
    className="w-[650px] h-[300px] object-cover mx-auto"
  />
</div>
</div>
{/* Quantum Computing Info Overlay - Shows only when card is clicked */}
<AnimatePresence>
  {showQuantumInfo && (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[100]"
        onClick={() => setShowQuantumInfo(false)}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 flex items-center justify-center z-[101] p-4 pt-20"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl overflow-auto p-8 relative w-full max-w-4xl max-h-[85vh] mt-8 custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #F7FAFC',
          }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowQuantumInfo(false);
            }}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
          
          <div className="text-sm text-gray-500 mb-2">
            LearnCrypt <span className="mx-2">›</span> Keep Learning
          </div>
          <h3 className="text-4xl font-semibold mb-8 text-black">Quantum Computing & Cryptography</h3>
          
          {/* Quantum Computing content that appears when the card is clicked */}
          <div className="space-y-4 text-gray-700">
            <h4 className="text-xl font-semibold text-black">What Is Quantum Computing? Let's Start From The Beginning</h4>
            <p>
              Okay, so you've probably heard of normal computers — the ones we use every day. They work using <strong>bits</strong>, which can be either a <strong>0 or a 1</strong>. That's the language they speak. Everything from your games to your WhatsApp messages gets broken down into millions of these 0s and 1s.
            </p>
            <p>
              Now, <strong>quantum computers</strong> are a whole new level. They work on something called <strong>qubits</strong> (quantum bits). What makes qubits cool — and a little crazy — is that they can be <strong>0, 1, or both at the same time</strong>. This is because of something called <strong>superposition</strong>, a concept from quantum physics.
            </p>
            <p>
              Because of that, quantum computers can <strong>try out many possibilities at once</strong>. Imagine trying every possible key to unlock a safe at the same time — that's basically what a quantum computer does when it tries to break encryption.
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">Why Should You Care? What's the Threat?</h4>
            <p>
              Here's the issue: Today's security systems — whether it's your online banking, private messages, government files — rely on encryption that would take <strong>thousands of years</strong> for a normal computer to break. So we feel safe.
            </p>
            <p>
              But a quantum computer, if it becomes powerful enough, could break those systems in <strong>minutes or hours</strong>. That's the threat. It's not just about the future — even now, people could be <strong>stealing encrypted data</strong> and waiting for the day quantum computers can <strong>unlock it</strong>.
            </p>
            <p>
              This idea has a name: <strong>"Harvest now, decrypt later."</strong>
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">Real-World Example You Can Relate To</h4>
            <p>
              Let's say you're sending an important document over email — like your PAN card, Aadhar details, or a contract.
            </p>
            <p>
              Right now, encryption like RSA makes sure only the person you send it to can open it.
            </p>
            <p>
              But if someone <strong>intercepts</strong> that email and stores it — even if they can't open it today, they could in the future when quantum computers are ready. That's scary, right?
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">What Does "Quantum Threat Visualization" Mean?</h4>
            <p>
              Great question. It sounds fancy, but here's a simple way to understand it:
            </p>
            <p>
              It's just a way to <strong>show people how vulnerable our current systems are</strong> when quantum computers arrive. Instead of just explaining with words, we use:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Graphs</strong></li>
              <li><strong>Animations</strong></li>
              <li><strong>Simulations</strong></li>
              <li><strong>Simple demos</strong></li>
            </ul>
            <p>
              These help non-experts <strong>see with their own eyes</strong> how quantum computers will change the game.
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">Which Encryption Methods Are at Risk?</h4>
            <p>
              Let's talk about the ones being used <strong>right now</strong> on most websites, apps, and networks:
            </p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Algorithm</th>
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">What it does</th>
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Quantum-safe?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b"><strong>RSA</strong></td>
                    <td className="py-3 px-4 border-b">Used in secure websites (HTTPS) and email</td>
                    <td className="py-3 px-4 border-b">Not safe. Can be broken by Shor's algorithm</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 border-b"><strong>ECC</strong></td>
                    <td className="py-3 px-4 border-b">Used in apps and messaging systems</td>
                    <td className="py-3 px-4 border-b">Also at risk</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b"><strong>AES</strong></td>
                    <td className="py-3 px-4 border-b">Used in file encryption and cloud storage</td>
                    <td className="py-3 px-4 border-b">Safer, but key length must be longer</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 border-b"><strong>SHA</strong></td>
                    <td className="py-3 px-4 border-b">Used for password hashing and digital signatures</td>
                    <td className="py-3 px-4 border-b">Needs stronger variants (like SHA-512)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h4 className="text-xl font-semibold text-black mt-6">So, How Do We Protect Ourselves?</h4>
            <p>
              This is where <strong>post-quantum cryptography</strong> comes in. That just means:
            </p>
            <p>
              "Let's build new encryption systems that even quantum computers can't break."
            </p>
            <p>
              These new algorithms are being tested by cryptography experts and governments. Some examples:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Kyber</strong> (for encrypting data)</li>
              <li><strong>Dilithium</strong> (for digital signatures)</li>
              <li><strong>SPHINCS+</strong> (for secure authentication)</li>
            </ul>
            <p>
              These aren't science fiction — they're real, and they're already being used in test environments by companies like <strong>Google</strong>, <strong>IBM</strong>, and <strong>Microsoft</strong>.
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">How Encryption Actually Works (Beginner-Friendly)</h4>
            <p>
              Let's simplify how encryption protects and authenticates information:
            </p>
            <div className="mt-4">
              <p><strong>1. Encryption = Locking Information</strong></p>
              <p>
                Say you have a diary entry. You put it in a box and lock it with a key — that's encryption. Only someone with the correct key can open it.
              </p>
              <p>
                Quantum computers? They're like master lock pickers — able to try <strong>all the keys at once</strong>.
              </p>
            </div>
            <div className="mt-4">
              <p><strong>2. Authentication = Proving Identity</strong></p>
              <p>
                Encryption also helps verify who sent the message. Think of it like a digital signature that proves "Yes, this message is really from me."
              </p>
              <p>
                With quantum, someone might be able to <strong>forge that signature</strong> unless we use quantum-safe methods.
              </p>
            </div>
            <div className="mt-4">
              <p><strong>3. Data Integrity</strong></p>
              <p>
                Encryption ensures your data hasn't been changed on the way. Any tiny change in the message will be detected — just like a tamper-proof seal.
              </p>
            </div>
            
            <h4 className="text-xl font-semibold text-black mt-6">Learn More About Quantum Computing & Cryptography</h4>
            <p className="font-medium mt-2">Great websites for better understanding:</p>
            <ul className="list-disc pl-6">
              <li><a href="https://medium.com/quantum-untangled/unveiling-the-quantum-world-visualization-as-a-bridge-and-beneficiary-87f9e89fd241" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Unveiling the Quantum World: Visualization as a Bridge and Beneficiary</a></li>
              <li><a href="https://cybersecurityventures.com/top-threats-in-quantum-computing-and-the-future-of-cybersecurity/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Top Threats in Quantum Computing and the Future of Cybersecurity</a></li>
              <li><a href="https://aws.amazon.com/what-is/post-quantum-cryptography/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">What Are the Security Implications of Quantum Computing?</a></li>
            </ul>
            <p className="font-medium mt-4">Research papers available for further reading:</p>
            <ul className="list-disc pl-6">
              <li><a href="https://www.researchgate.net/publication/324997635_A_study_on_the_use_of_quantum_computers_risk_assessment_and_security_problems" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">A study on the use of quantum computers risk assessment and security problems</a></li>
              <li><a href="https://www.sciencedirect.com/science/article/abs/pii/S0378437122003466" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Quantum Computing: Implications for Information Security</a></li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>
          {/* Quantum Computing Card */}
         
<div 
  onClick={() => setShowQuantumInfo(true)}
  className="bg-white rounded-2xl shadow-md p-6 w-full cursor-pointer transition-all duration-300 h-[500px] overflow-hidden"
>
  <div className="text-sm text-gray-500 mb-2">
    LearnCrypt <span className="mx-2">›</span> Keep Learning
  </div>
  <h3 className="text-3xl font-semibold mb-6 text-black">Quantum Computing & Cryptography</h3>
  <div className="rounded-3xl overflow-hidden">
  <img
    src={quantumImage}
    alt="Quantum Computing Illustration"
    className="w-[650px] h-[300px] object-cover mx-auto"
  />
</div>
</div>
{/* API Info Overlay - Shows only when card is clicked */}
<AnimatePresence>
  {showApiInfo && (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[100]"
        onClick={() => setShowApiInfo(false)}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 flex items-center justify-center z-[101] p-4 pt-20"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl overflow-auto p-8 relative w-full max-w-4xl max-h-[85vh] mt-8 custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #F7FAFC',
          }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowApiInfo(false);
            }}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
          
          <div className="text-sm text-gray-500 mb-2">
            LearnCrypt <span className="mx-2">›</span> Keep Learning
          </div>
          <h3 className="text-4xl font-semibold mb-8 text-black">API Security & Encryption</h3>
          <img 
            src={apiImage} // Replace with your actual API image
            alt="API Security Illustration" 
            className="w-full max-h-[400px] object-contain rounded-3xl mb-8"
          />
          
          {/* API content that appears when the card is clicked */}
          <div className="space-y-4 text-gray-700">
            <h4 className="text-xl font-semibold text-black">What is an API?</h4>
            <p>
              An <strong>API (Application Programming Interface)</strong> is like a <strong>bridge</strong> that lets two software systems talk to each other.
            </p>
            <p>
              Imagine a food delivery app. You tap your order, and it magically reaches the restaurant's system — that's thanks to an API working in the background.
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">What is LMS?</h4>
            <p>
              An <strong>LMS (Learning Management System)</strong> is an online platform that helps <strong>manage, deliver, and track educational content</strong>.
            </p>
            <p>Examples:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Moodle</li>
              <li>Google Classroom</li>
              <li>Canvas</li>
              <li>Blackboard</li>
            </ul>
            
            <h4 className="text-xl font-semibold text-black mt-6">API Access for Educators to Integrate with LMS</h4>
            <p><strong>➤ What does it mean?</strong></p>
            <p>
              Educators can use <strong>LMS APIs</strong> to <strong>connect other tools or apps</strong> to their LMS.
            </p>
            <p>For example:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Auto-push grades from a coding platform to Moodle</li>
              <li>Sync class schedules from Google Calendar into the LMS</li>
              <li>Pull student progress from LMS into a personal dashboard</li>
            </ul>
            
            <h4 className="text-xl font-semibold text-black mt-6">Real-World Example</h4>
            <p>
              Imagine you're using a quiz platform like <strong>Kahoot or Google Forms</strong>, and you want the scores to appear directly in your Moodle gradebook.
            </p>
            <p>
              With <strong>API integration</strong>, this becomes possible automatically — no manual work needed!
            </p>
            <p>
              Another case: A college uses a <strong>custom-built attendance tracker</strong>. Using the LMS API, the tracker can push data into the LMS, making the system more unified.
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">What Kind of Encryption is Used?</h4>
            <p>
              To keep this data <strong>safe and private</strong>, LMS APIs use <strong>encryption algorithms</strong> and <strong>security protocols</strong> like:
            </p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Protocol</th>
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">What it does</th>
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Where you see it</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b"><strong>HTTPS (SSL/TLS)</strong></td>
                    <td className="py-3 px-4 border-b">Encrypts the data between client and server</td>
                    <td className="py-3 px-4 border-b">The lock icon in your browser's address bar</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 border-b"><strong>OAuth 2.0</strong></td>
                    <td className="py-3 px-4 border-b">Secure way to authorize users without sharing passwords</td>
                    <td className="py-3 px-4 border-b">"Login with Google" buttons</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b"><strong>JWT</strong></td>
                    <td className="py-3 px-4 border-b">Compact, secure way to pass user identity</td>
                    <td className="py-3 px-4 border-b">Used in single sign-on systems</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h4 className="text-xl font-semibold text-black mt-6">How It Protects and Authenticates Data</h4>  
            <div className="space-y-4">
              <div>
                <p className="font-medium">Authentication</p>
                <ul className="pl-6 mt-1">
                  <li>○ Only verified users or apps (like trusted educators or systems) can access the API.</li>
                  <br/>
                  <li>○ OAuth tokens and API keys ensure that the request comes from a legitimate source.</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium">Encryption</p>
                <ul className="pl-6 mt-1">
                  <li>○ All data is encrypted before being sent, so even if someone intercepts it, they can't read it.</li>
                  <br/>
                  <li>○ APIs only allow access to what the user or system is authorized for (e.g., an educator can access grades but not admin settings).</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium">Logging and Monitoring</p>
                <ul className="pl-6 mt-1">
                  <li>○ Every API call is recorded for auditing and security tracking.</li>
                </ul>
              </div>
            </div>
            
            <h4 className="text-xl font-semibold text-black mt-6">Learn More About API Security & Integration</h4>
            <p className="font-medium mt-2">Great websites for better understanding:</p>
            <ul className="list-disc pl-6">
              <li><a href="https://elearningindustry.com/directory/software-categories/learning-management-systems/integrations/api" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Learning Management Systems (LMS) with API Integration</a></li>
              <li><a href="https://getstream.io/blog/10-top-apis-for-learning-management-systems/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">10 Top APIs for Learning Management Systems</a></li>
              <li><a href="https://www.netexlearning.com/en/blog/optimising-lms-performance-with-api-integrations-and-automation/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Optimising LMS Performance with API Integrations and Automation</a></li>
            </ul>
            <p className="font-medium mt-4">Research papers available for further reading:</p>
            <ul className="list-disc pl-6">
              <li><a href="https://arxiv.org/html/2405.15165v1" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">API Security Models in Educational Technology (arXiv)</a></li>
              <li><a href="https://lnu.diva-portal.org/smash/get/diva2:1801354/FULLTEXT01.pdf" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Integration of APIs in Learning Management Systems</a></li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>
          {/* API Card */}
<div 
  onClick={() => setShowApiInfo(true)}
  className="bg-white rounded-2xl shadow-md p-6 w-full cursor-pointer transition-all duration-300 h-[500px] overflow-hidden"
>
  <div className="text-sm text-gray-500 mb-2">
    LearnCrypt <span className="mx-2">›</span> Keep Learning
  </div>
  <h3 className="text-3xl font-semibold mb-6 text-black">API Security & Encryption</h3>
   <div className="rounded-3xl overflow-hidden">
  <img
    src={apiImage}
    alt=" API SecurityIllustration"
    className="w-[650px] h-[300px] object-cover mx-auto"
  />
</div>
         
</div>
          
            {/* Community Contribution Systems Info Overlay - Shows only when card is clicked */}
<AnimatePresence>
  {showCommunityInfo && (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[100]"
        onClick={() => setShowCommunityInfo(false)}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 flex items-center justify-center z-[101] p-4 pt-20"
      >
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl overflow-auto p-8 relative w-full max-w-4xl max-h-[85vh] mt-8 custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 #F7FAFC',
          }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowCommunityInfo(false);
            }}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
          
          <div className="text-sm text-gray-500 mb-2">
            LearnCrypt <span className="mx-2">›</span> Keep Learning
          </div>
          <h3 className="text-4xl font-semibold mb-8 text-black">Community Contribution Systems</h3>
          <img 
            src={ccsImage}
            alt="Community Contribution Systems" 
            className="w-full max-h-[400px] object-contain rounded-3xl mb-8"
          />
          
          {/* Community content that appears when the card is clicked */}
          <div className="space-y-4 text-gray-700">
            <h4 className="text-xl font-semibold text-black">What is a Community Contribution System?</h4>
            <p>
              Think of it like <strong>GitHub for algorithms</strong> — a shared platform where <strong>developers, researchers, or educators can upload, suggest, or improve algorithms</strong> (like encryption techniques, sorting algorithms, etc.) to be used in your project or app.
            </p>
            <p>
              It's a <strong>collaborative space</strong> where the community helps make the system smarter and more up-to-date.
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">Why is it Useful?</h4>
            <p>
              No one person can build everything. With a community system:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>People from around the world can <strong>submit their own algorithms</strong>.</li>
              <li>Others can <strong>review, improve, or rate them</strong>.</li>
              <li>Maintainers can choose to <strong>approve and integrate</strong> high-quality contributions.</li>
            </ul>
            <p>
              This boosts innovation, keeps the system flexible, and allows quick adoption of new techniques (especially in cryptography and data security).
            </p>
            
            <h4 className="text-xl font-semibold text-black mt-6">Basic Working: Step-by-Step</h4>
            <ol className="list-decimal pl-6 space-y-3">
              <li><strong>User signs in securely</strong> (via email, Google, or other identity provider).</li>
              <li><strong>User submits a new algorithm</strong> (code, documentation, test cases).</li>
              <li>The system <strong>validates the submission</strong> (basic security checks, style guidelines).</li>
              <li>A group of reviewers or moderators <strong>review and approve/reject</strong> the submission.</li>
              <li>Approved algorithms become <strong>available for use</strong> in the system.</li>
            </ol>
            
            <h4 className="text-xl font-semibold text-black mt-6">Real-World Examples</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>GitHub & GitLab:</strong> Community-driven platforms where developers share and collaborate on code.</li>
              <li><strong>Kaggle Notebooks:</strong> Data scientists share models and solutions for challenges.</li>
              <li><strong>Python Package Index (PyPI):</strong> Developers contribute Python packages, which others can use securely.</li>
            </ul>
            
            <h4 className="text-xl font-semibold text-black mt-6">What Encryption & Security Methods Are Used?</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium"><strong>1. HTTPS (TLS)</strong></p>
                <ul className="pl-6 mt-1">
                  <li>○ Encrypts all communication between user and server</li>
                  <li>○ Keeps login and submission data safe from hackers</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium"><strong>2. OAuth 2.0 / OpenID Connect</strong></p>
                <ul className="pl-6 mt-1">
                  <li>○ Used for secure logins via Google, GitHub, etc.</li>
                  <li>○ Ensures users are who they say they are</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium"><strong>3. JWT (JSON Web Tokens)</strong></p>
                <ul className="pl-6 mt-1">
                  <li>○ Securely passes user identity and roles (e.g., "moderator", "contributor")</li>
                  <li>○ Used to restrict actions (like only reviewers can approve submissions)</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium"><strong>4. Digital Signatures (Optional for Algorithms)</strong></p>
                <ul className="pl-6 mt-1">
                  <li>○ Contributors can optionally <strong>digitally sign</strong> their submissions using their private key</li>
                  <li>○ Anyone can verify that the algorithm hasn't been tampered with using the public key</li>
                </ul>
              </div>
            </div>
            
            <h4 className="text-xl font-semibold text-black mt-6">How It Protects & Authenticates the System</h4>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">Feature</th>
                    <th className="py-3 px-4 border-b text-left font-semibold text-gray-700">How It Helps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b"><strong>Authentication</strong></td>
                    <td className="py-3 px-4 border-b">Ensures only verified users can submit or review algorithms</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 border-b"><strong>Authorization</strong></td>
                    <td className="py-3 px-4 border-b">Different permissions for contributors, reviewers, and admins</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b"><strong>Encryption</strong></td>
                    <td className="py-3 px-4 border-b">Protects submitted data and communications during upload/download</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 border-b"><strong>Audit Logs</strong></td>
                    <td className="py-3 px-4 border-b">Keeps a history of who submitted or modified what and when</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b"><strong>Automated Testing</strong></td>
                    <td className="py-3 px-4 border-b">Submitted code is checked for security risks, bugs, or malicious behavior</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 border-b"><strong>Manual Review</strong></td>
                    <td className="py-3 px-4 border-b">Trusted reviewers manually verify sensitive algorithm submissions</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h4 className="text-xl font-semibold text-black mt-6">Learn More About Community Contribution Systems</h4>
            <p className="font-medium mt-2">Great websites for better understanding:</p>
            <ul className="list-disc pl-6">
              <li><a href="https://www.sciencedirect.com/science/article/abs/pii/S095741742401056X" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Community-Based Detection Systems</a></li>
              <li><a href="https://dgraph.io/blog/post/community-detection-algorithms/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Community Detection Algorithms</a></li>
              <li><a href="https://www.nature.com/articles/s41598-024-55190-7" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Community Systems in Scientific Research</a></li>
            </ul>
            <p className="font-medium mt-4">Research papers available for further reading:</p>
            <ul className="list-disc pl-6">
              <li><a href="https://www.researchgate.net/publication/327333221_Research_Review_on_Algorithms_of_Community_Detection_in_Complex_Networks" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Research Review on Algorithms of Community Detection in Complex Networks</a></li>
              <li><a href="https://link.springer.com/article/10.1007/s44196-024-00715-1" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Modern Community Contribution Systems in Software Development</a></li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>

          {/* Community Contribution Card */}
          <div 
  onClick={() => setShowCommunityInfo(true)}
  className="bg-white rounded-2xl shadow-md p-6 w-full cursor-pointer transition-all duration-300 h-[500px] overflow-hidden"
>
  <div className="text-sm text-gray-500 mb-2">
    LearnCrypt <span className="mx-2">›</span> Keep Learning
  </div>
  <h3 className="text-3xl font-semibold mb-6 text-black">Community Contribution Systems</h3>
  <div className="rounded-3xl overflow-hidden">
    <img
      src={ccsImage}
      alt="Community Contribution Systems"
      className="w-[650px] h-[300px] object-cover mx-auto"
    />
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default TheDeepEnd;
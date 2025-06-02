import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CodeLab = () => {
  // Navigation hook
  const navigate = useNavigate();

  // Algorithm data (unchanged)
  const algorithms = [
    {
      id: 1,
      name: "Caesar Cipher",
      description: "A substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet.",
      bgColor: "bg-green-600",
      category: "Classical",
    },
    {
      id: 2,
      name: "Transposition Cipher",
      description: "A method that rearranges the positions of characters according to a regular system rather than replacing them.",
      bgColor: "bg-blue-600",
      category: "Classical",
    },
    {
      id: 3,
      name: "Playfair Cipher",
      description: "A manual symmetric encryption technique that encrypts pairs of letters instead of single letters.",
      bgColor: "bg-purple-600",
      category: "Classical",
    },
    {
      id: 4,
      name: "3DES",
      description: "Triple Data Encryption Standard applies the DES cipher algorithm three times to each data block for enhanced security.",
      bgColor: "bg-red-600",
      category: "Symmetric",
    },
    {
      id: 5,
      name: "AES",
      description: "Advanced Encryption Standard, a symmetric block cipher used by the U.S. government to protect classified information.",
      bgColor: "bg-amber-500",
      category: "Symmetric",
    },
    {
      id: 6,
      name: "RSA",
      description: "A public-key cryptosystem widely used for secure data transmission and digital signatures.",
      bgColor: "bg-orange-600",
      category: "Asymmetric",
    },
    
    {
      id: 9,
      name: "Diffie-Hellman",
      description: "A method for securely exchanging cryptographic keys over a public channel without requiring a pre-shared secret.",
      bgColor: "bg-pink-600",
      category: "Key Exchange",
    },
    {
      id: 10,
      name: "CRYSTALS-Kyber",
      description: "A post-quantum key encapsulation mechanism resistant to attacks from quantum computers.",
      bgColor: "bg-cyan-600",
      category: "Post-Quantum",
    },
  ];

  // State for active algorithm index and mouse position
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const carouselRef = useRef(null);
  const totalAlgorithms = algorithms.length;
  
  // Calculate offset based on mouse position
  const [offsetX, setOffsetX] = useState(0);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!carouselRef.current) return;
    
    const carouselRect = carouselRef.current.getBoundingClientRect();
    const mouseX = e.clientX - carouselRect.left;
    const carouselWidth = carouselRect.width;
    
    // Calculate normalized position (-1 to 1)
    const normalizedPosition = (mouseX / carouselWidth) * 2 - 1;
    
    setMousePosition(normalizedPosition);
    
    // Calculate offset based on mouse position (max ±0.4 of an item)
    const newOffset = normalizedPosition * 0.4;
    setOffsetX(newOffset);
  };

  // Calculate positions for carousel items
  const getCarouselItemStyles = (index) => {
    const position = (index - activeIndex + totalAlgorithms) % totalAlgorithms;
    
    // Apply mouse position offset only when mouse is over carousel
    const mouseOffset = isMouseOver ? offsetX : 0;
    
    // Determine if the item should be visible
    const visiblePositions = [0, 1, 2, totalAlgorithms - 2, totalAlgorithms - 1];
    const isVisible = visiblePositions.includes(position);
    
    // Create circular positioning
    let translateX = 0;
    let translateY = 0;
    let scale = 0.6;
    let zIndex = 0;
    let opacity = 0;
    
    if (position === 0) { // Active item (center)
      translateX = mouseOffset * 30; // Move slightly with mouse
      scale = 1;
      zIndex = 10;
      opacity = 1;
    } else if (position === 1) { // Right item
      translateX = 80 + (mouseOffset * 40); // Adjust position based on mouse
      scale = 0.8;
      zIndex = 5;
      opacity = 0.8;
    } else if (position === totalAlgorithms - 1) { // Left item
      translateX = -80 + (mouseOffset * 40); // Adjust position based on mouse
      scale = 0.8;
      zIndex = 5;
      opacity = 0.8;
    } else if (position === 2) { // Far right item
      translateX = 150 + (mouseOffset * 50); // Adjust position based on mouse
      scale = 0.6;
      zIndex = 1;
      opacity = 0.5;
    } else if (position === totalAlgorithms - 2) { // Far left item
      translateX = -150 + (mouseOffset * 50); // Adjust position based on mouse
      scale = 0.6;
      zIndex = 1;
      opacity = 0.5;
    }
    
    return {
      transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`,
      zIndex: zIndex,
      opacity: isVisible ? opacity : 0,
      transition: isMouseOver ? "transform 0.2s ease" : "all 0.5s ease",
      position: "absolute",
      width: "100%",
      maxWidth: "400px",
    };
  };

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalAlgorithms) % totalAlgorithms);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalAlgorithms);
  };

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-light mb-4">
          <span className="text-white">Code </span>
          <span className="text-orange-500">Lab</span>
        </h1>
        <p className="text-neutral-400 max-w-3xl mx-auto text-lg">
          Explore, learn, and experiment with various encryption algorithms through our interactive code lab. Select an algorithm to get started.
        </p>
      </div>

      {/* Circular Carousel */}
      <div 
        className="relative h-96 w-full max-w-4xl mx-auto mb-16"
        ref={carouselRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <div className="absolute w-full h-full">
          {/* Large circular background - moves slightly with cursor */}
          <div 
            className="absolute w-full h-full rounded-full bg-neutral-800 opacity-10"
            style={{
              transform: `translate(${offsetX * -10}px, 0) translate(-50%, -50%)`,
              top: '50%',
              left: '50%',
              transition: isMouseOver ? 'transform 0.2s ease' : 'transform 0.5s ease'
            }}
          ></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center">
          {algorithms.map((algo, index) => (
            <div
              key={algo.id}
              style={getCarouselItemStyles(index)}
              className="rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <div className={`${algo.bgColor} p-8 h-64 relative`}>
                <div className="absolute top-4 right-4 text-xs font-semibold bg-black bg-opacity-40 px-3 py-1 rounded-full">
                  {algo.category}
                </div>
                <div className="absolute bottom-8 left-8">
                  <h2 className="text-3xl font-bold mb-2">{algo.name}</h2>
                  <p className="text-sm text-white text-opacity-80 mb-4 line-clamp-2">
                    {algo.description}
                  </p>
                  <button 
                    className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 transition-all"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onClick
                      navigate(`/codelab/${algo.name.toLowerCase().replace(/\s+/g, '-')}`);
                    }}
                  >
                    Try it
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-8">
         {/* Navigation buttons - moved down and away from cards */}
          <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 flex space-x-8">
            <button 
              className="w-12 h-12 rounded-full border border-orange-500 flex items-center justify-center hover:bg-orange-500 transition-colors"
              onClick={handlePrev}
            >
              <ArrowLeft size={24} />
            </button>
            
            <button 
              className="w-12 h-12 rounded-full border border-orange-500 flex items-center justify-center hover:bg-orange-500 transition-colors"
              onClick={handleNext}
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Active algorithm details */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{algorithms[activeIndex].name}</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          {algorithms[activeIndex].description}
        </p>
        <div className="mt-8">
          <button 
            className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-orange-600 transition-all"
            onClick={() => navigate(`/codelab/${algorithms[activeIndex].name.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            Explore {algorithms[activeIndex].name}
          </button>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center space-x-2">
        {algorithms.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === activeIndex ? "bg-orange-500" : "bg-neutral-700 hover:bg-orange-500/50"
            } transition-colors`}
            aria-label={`Algorithm ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CodeLab;
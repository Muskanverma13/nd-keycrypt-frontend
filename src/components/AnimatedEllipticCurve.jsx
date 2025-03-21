import React from 'react';

const EllipticCurveBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 w-full h-full bg-black" 
        style={{
          backgroundImage: "url('https://nathanielbd.github.io/ec.gif')",
          backgroundSize: "center",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
    </div>
  );
};

export default EllipticCurveBackground;
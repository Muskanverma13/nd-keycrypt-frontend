import { useEffect, useRef } from 'react';
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const triangles = [];
    
    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8; // 80% of viewport height
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create triangles
    const createTriangles = () => {
      const count = Math.floor(canvas.width * canvas.height / 15000); // Adjust density
      
      for (let i = 0; i < count; i++) {
        triangles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 10 + 5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          opacity: Math.random() * 0.3 + 0.1 // Lower opacity for subtle effect
        });
      }
    };
    
    // Draw triangles
    const drawTriangle = (x, y, size, rotation, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
      ctx.lineTo(-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6));
      ctx.closePath();
      ctx.strokeStyle = `rgba(255, 100, 50, ${opacity})`; // Orange-red to match theme
      ctx.stroke();
      ctx.restore();
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < triangles.length; i++) {
        const t = triangles[i];
        t.x += t.speedX;
        t.y += t.speedY;
        t.rotation += t.rotationSpeed;
        
        // Wrap around edges
        if (t.x < -t.size) t.x = canvas.width + t.size;
        if (t.x > canvas.width + t.size) t.x = -t.size;
        if (t.y < -t.size) t.y = canvas.height + t.size;
        if (t.y > canvas.height + t.size) t.y = -t.size;
        
        drawTriangle(t.x, t.y, t.size, t.rotation, t.opacity);
      }
      
      requestAnimationFrame(animate);
    };
    
    createTriangles();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      {/* Content */}
      <div className="flex flex-col items-center mt-6 lg:mt-20 z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide text-white">
          From Ciphers to 
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            {" "}
            Quantum Security
          </span>
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-400 max-w-4xl">
          N&D-Crypt is an interactive platform to explore, learn, and experiment with symmetric and asymmetric encrypt, from classical ciphers to advanced quantum-secure cryptographic techniques.
        </p>
        
        <div className="flex mt-20 justify-center w-full">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-5/12 border border-orange-700 shadow-sm shadow-orange-400 mx-3"
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-5/12 border border-orange-700 shadow-sm shadow-orange-400 mx-3"
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
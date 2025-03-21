document.addEventListener('DOMContentLoaded', function() {
    const background = document.createElement('div');
    background.className = 'crypto-background';
    
    // Add hex pattern overlay
    const hexPattern = document.createElement('div');
    hexPattern.className = 'hex-pattern';
    background.appendChild(hexPattern);
    
    // Add binary scan effect
    const binaryPattern = document.createElement('div');
    binaryPattern.className = 'binary-pattern';
    background.appendChild(binaryPattern);
    
    // Create digital rain characters
    const characters = '01サイバーセキュリティΦΨΩαβγπ√∞≈≠∫∂∑∏τθλζδ#$&%*(){}[]<>~|';
    const raindropsCount = 50;
    
    for (let i = 0; i < raindropsCount; i++) {
      createRaindrop(background, characters);
    }
    
    document.body.insertBefore(background, document.body.firstChild);
    
    // Continuously create new raindrops
    setInterval(() => {
      if (document.querySelectorAll('.digital-rain').length < 100) {
        createRaindrop(background, characters);
      }
    }, 500);
  });
  
  function createRaindrop(parent, characters) {
    const raindrop = document.createElement('div');
    raindrop.className = 'digital-rain';
    
    // Random position
    const xPos = Math.random() * 100;
    raindrop.style.left = `${xPos}%`;
    
    // Random speed
    const duration = 5 + Math.random() * 10;
    raindrop.style.animationDuration = `${duration}s`;
    
    // Random delay
    const delay = Math.random() * 5;
    raindrop.style.animationDelay = `${delay}s`;
    
    // Generate random string
    let text = '';
    const length = 5 + Math.floor(Math.random() * 20);
    for (let i = 0; i < length; i++) {
      text += characters[Math.floor(Math.random() * characters.length)];
    }
    raindrop.textContent = text;
    
    // Remove after animation completes
    raindrop.addEventListener('animationend', function() {
      this.remove();
    });
    
    parent.appendChild(raindrop);
  }
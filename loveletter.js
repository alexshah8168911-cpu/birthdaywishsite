// Love letter page functionality

// Go back to sweetheart page
function backToSweetheart() {
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        window.location.href = 'sweetheart.html';
    }, 200);
}

// Create floating hearts
function createFloatingHeart() {
    const hearts = ['💕', '💖', '💗', '💝', '💘'];
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 7000);
}

// Typewriter effect for letter text
function typewriterEffect() {
    const letterText = document.getElementById('letter-text');
    const originalHTML = letterText.innerHTML;
    letterText.innerHTML = '';
    
    let i = 0;
    const speed = 30; // milliseconds per character
    
    function typeChar() {
        if (i < originalHTML.length) {
            letterText.innerHTML += originalHTML.charAt(i);
            i++;
            setTimeout(typeChar, speed);
            
            // Auto-scroll to bottom as text appears
            const letterScroll = document.querySelector('.letter-scroll');
            letterScroll.scrollTop = letterScroll.scrollHeight;
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeChar, 1000);
}

// Add sparkle effect when hovering over love image
function addSparkleEffect(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: gold;
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        animation: sparkleEffect 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500);
}

// Add sparkle CSS animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Start floating hearts
    setInterval(createFloatingHeart, 2000);
    
    // Add sparkle effect to love image
    const loveImg = document.getElementById('love-img');
    loveImg.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                addSparkleEffect(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 200);
        }
    });
    
    // Optional: Enable typewriter effect (uncomment to use)
    // typewriterEffect();
});

// Add smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const letterScroll = document.querySelector('.letter-scroll');
    
    // Add scroll indicators
    letterScroll.addEventListener('scroll', function() {
        const scrollPercent = (this.scrollTop / (this.scrollHeight - this.clientHeight)) * 100;
        
        // Change border color based on scroll position
        if (scrollPercent > 80) {
            this.style.borderColor = '#228b22'; // Green when near end
        } else if (scrollPercent > 40) {
            this.style.borderColor = '#ffa500'; // Orange in middle
        } else {
            this.style.borderColor = '#ff69b4'; // Pink at start
        }
    });
});

// Add reading progress indicator
function addProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(to right, #ff69b4, #ffb6c1);
        transition: width 0.3s ease;
        z-index: 1000;
        width: 0%;
    `;
    
    document.body.appendChild(progressBar);
    
    const letterScroll = document.querySelector('.letter-scroll');
    letterScroll.addEventListener('scroll', function() {
        const scrollPercent = (this.scrollTop / (this.scrollHeight - this.clientHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize progress indicator
document.addEventListener('DOMContentLoaded', addProgressIndicator);

// Add gentle background music (optional, needs audio file)
function playBackgroundMusic() {
    // const audio = new Audio('love-theme.mp3');
    // audio.loop = true;
    // audio.volume = 0.3;
    // audio.play().catch(e => console.log('Audio not available'));
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        backToSweetheart();
    }
    
    const letterScroll = document.querySelector('.letter-scroll');
    if (e.key === 'Home') {
        letterScroll.scrollTop = 0;
    } else if (e.key === 'End') {
        letterScroll.scrollTop = letterScroll.scrollHeight;
    }
});
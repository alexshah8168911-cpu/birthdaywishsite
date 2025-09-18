// Birthday page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Split text into individual letters for wave animation
    const h1 = document.querySelector('.birthday-text h1');
    if (h1) {
        const text = h1.textContent;
        h1.innerHTML = '';
        
        // Split text into spans for individual letter animation
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            if (text[i] === ' ') {
                span.innerHTML = '&nbsp;'; // Preserve spaces
            }
            h1.appendChild(span);
        }
    }
    
    // After animation completes, redirect to sweetheart page
    setTimeout(() => {
        window.location.href = 'sweetheart.html';
    }, 9000); // Extended time for better text animation viewing
});

// Enhanced sparkle effects with different colors and sizes
function createSparkle() {
    const sparkle = document.createElement('div');
    const sparkleTypes = ['✨', '⭐', '💫', '🌟', '💖'];
    const randomType = sparkleTypes[Math.random() * sparkleTypes.length | 0];
    
    sparkle.innerHTML = randomType;
    sparkle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 10}px;
        pointer-events: none;
        animation: sparkleFall ${Math.random() * 3 + 2}s linear forwards;
        left: ${Math.random() * 100}vw;
        top: -20px;
        z-index: 5;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    `;
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 5000);
}

// Create rainbow sparkles
function createRainbowSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff20b2'];
    const randomColor = colors[Math.random() * colors.length | 0];
    
    sparkle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 15 + 8}px;
        color: ${randomColor};
        pointer-events: none;
        animation: rainbowSparkleFall ${Math.random() * 4 + 3}s ease-out forwards;
        left: ${Math.random() * 100}vw;
        top: -20px;
        z-index: 5;
        filter: drop-shadow(0 0 5px ${randomColor});
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 7000);
}

// Floating hearts effect
function createFloatingHeart() {
    const heart = document.createElement('div');
    const hearts = ['💕', '💖', '💗', '💘', '💝', '💞'];
    const randomHeart = hearts[Math.random() * hearts.length | 0];
    
    heart.innerHTML = randomHeart;
    heart.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 25 + 15}px;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        pointer-events: none;
        animation: floatUpHeart ${Math.random() * 4 + 5}s linear forwards;
        opacity: 0.8;
        z-index: 3;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 9000);
}

// Add enhanced animation styles
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes sparkleFall {
        0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: scale(1);
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes rainbowSparkleFall {
        0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
        }
        15% {
            opacity: 1;
            transform: scale(1.2);
        }
        85% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes floatUpHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-120vh) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(enhancedStyles);

// Start all effects
document.addEventListener('DOMContentLoaded', function() {
    // Regular sparkles
    setInterval(createSparkle, 200);
    
    // Rainbow sparkles
    setInterval(createRainbowSparkle, 800);
    
    // Floating hearts
    setInterval(createFloatingHeart, 1500);
});

// Add text typing effect
function createTypingEffect() {
    const h1 = document.querySelector('.birthday-text h1');
    if (h1) {
        // Add cursor blink effect
        const cursor = document.createElement('span');
        cursor.innerHTML = '|';
        cursor.style.cssText = `
            animation: blink 1s infinite;
            font-weight: normal;
        `;
        h1.appendChild(cursor);
    }
}

// Add cursor blink animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createTypingEffect, 1000);
});
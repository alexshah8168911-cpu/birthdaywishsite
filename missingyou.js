// Missing you page functionality

// Navigation functions
function goBackToStart() {
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        window.location.href = 'splash.html';
    }, 200);
}

function goToSweetheart() {
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        window.location.href = 'sweetheart.html';
    }, 200);
}

// Create twinkling stars
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 3}s;
        animation-duration: ${Math.random() * 2 + 2}s;
    `;
    
    return star;
}

// Create floating hearts
function createFloatingHeart() {
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '💙', '💜'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    
    document.getElementById('floating-elements').appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 10000);
}

// Create floating messages
function createFloatingMessage() {
    const messages = [
        'thinking of you...',
        'missing your smile...',
        'love you forever...',
        'you are my world...',
        'come back soon...',
        'my heart beats for you...',
        'you complete me...',
        'forever yours...'
    ];
    
    const message = document.createElement('div');
    message.className = 'floating-message';
    message.innerHTML = messages[Math.floor(Math.random() * messages.length)];
    message.style.top = Math.random() * 80 + 10 + '%';
    message.style.animationDuration = (Math.random() * 8 + 10) + 's';
    
    document.getElementById('floating-elements').appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 18000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const starsBackground = document.getElementById('stars-background');
    
    // Create stars
    for (let i = 0; i < 100; i++) {
        starsBackground.appendChild(createStar());
    }
    
    // Start floating elements
    setInterval(createFloatingHeart, 2000);
    setInterval(createFloatingMessage, 4000);
    
    // Add typing effect to main message
    setTimeout(addTypingEffect, 1000);
    
    // Create initial floating elements
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 500);
    }
    
    for (let i = 0; i < 3; i++) {
        setTimeout(createFloatingMessage, i * 1500);
    }
});

// Add typing effect to the main message
function addTypingEffect() {
    const h1 = document.querySelector('.main-message h1');
    const h2 = document.querySelector('.main-message h2');
    
    const originalH1 = h1.textContent;
    const originalH2 = h2.textContent;
    
    h1.textContent = '';
    h2.textContent = '';
    
    let i = 0;
    const typeH1 = setInterval(() => {
        if (i < originalH1.length) {
            h1.textContent += originalH1.charAt(i);
            i++;
        } else {
            clearInterval(typeH1);
            // Start typing h2 after h1 is complete
            setTimeout(() => {
                let j = 0;
                const typeH2 = setInterval(() => {
                    if (j < originalH2.length) {
                        h2.textContent += originalH2.charAt(j);
                        j++;
                    } else {
                        clearInterval(typeH2);
                    }
                }, 100);
            }, 500);
        }
    }, 80);
}

// Add sparkle effect when hovering over heart
function createSparkleEffect(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: gold;
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        animation: sparkleEffect 1.5s ease-out forwards;
        z-index: 1000;
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
            transform: scale(2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Add heart click effect
document.addEventListener('DOMContentLoaded', function() {
    const beatingHeart = document.querySelector('.beating-heart');
    
    beatingHeart.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        
        // Create multiple sparkles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createSparkleEffect(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 100);
        }
        
        // Add temporary scale effect
        this.style.transform = 'scale(1.5)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
    
    beatingHeart.style.cursor = 'pointer';
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'h':
        case 'Home':
            goBackToStart();
            break;
        case 's':
        case 'Escape':
            goToSweetheart();
            break;
        case ' ':
            // Trigger heart click effect
            const beatingHeart = document.querySelector('.beating-heart');
            beatingHeart.click();
            break;
    }
});

// Add mouse trail effect
let mouseTrail = [];

document.addEventListener('mousemove', function(e) {
    // Add current position to trail
    mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
    });
    
    // Remove old trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
    
    // Create trail sparkle occasionally
    if (Math.random() < 0.1) {
        createTrailSparkle(e.clientX, e.clientY);
    }
});

function createTrailSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        animation: trailSparkle 1s ease-out forwards;
        z-index: 999;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Add trail sparkle animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailSparkle {
        0% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Add button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.nav-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Create sparkles around button
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createSparkleEffect(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 50);
            }
        });
    });
});

// Add window focus/blur effects
document.addEventListener('DOMContentLoaded', function() {
    let originalTitle = document.title;
    
    window.addEventListener('blur', function() {
        document.title = '💕 Come back, I miss you! 💕';
    });
    
    window.addEventListener('focus', function() {
        document.title = originalTitle;
    });
});

// Add automatic message updates
function updateMissingMessage() {
    const additionalMessages = document.querySelectorAll('.additional-message p');
    const newMessages = [
        'Distance means nothing when someone means everything...',
        'You are the missing piece of my heart...',
        'Every second feels like forever without you...',
        'My love for you grows stronger with each passing moment...'
    ];
    
    additionalMessages.forEach((msg, index) => {
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => {
                msg.textContent = newMessages[index] || msg.textContent;
                msg.style.opacity = '1';
            }, 500);
        }, index * 2000);
    });
}

// Start message updates after initial load
setTimeout(updateMissingMessage, 10000);
setInterval(updateMissingMessage, 20000);
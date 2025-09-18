// Enhanced Sweetheart page functionality

// Navigation functions with enhanced effects
function goToMemories() {
    addMagicalButtonEffect(event.target);
    createBurstEffect(event.target);
    setTimeout(() => {
        window.location.href = 'memories.html';
    }, 300);
}

function goToLoveLetter() {
    addMagicalButtonEffect(event.target);
    createBurstEffect(event.target);
    setTimeout(() => {
        window.location.href = 'loveletter.html';
    }, 300);
}

function goToPerformance() {
    addMagicalButtonEffect(event.target);
    createBurstEffect(event.target);
    setTimeout(() => {
        window.location.href = 'performance.html';
    }, 300);
}

// Enhanced button click effect
function addMagicalButtonEffect(button) {
    button.style.transform = 'scale(0.95) translateY(-2px)';
    button.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.8), 0 0 30px rgba(240, 147, 251, 0.6)';
    
    setTimeout(() => {
        button.style.transform = 'translateY(-5px) scale(1.08)';
        button.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6), 0 0 30px rgba(118, 75, 162, 0.5)';
    }, 150);
}

// Create burst effect on button click
function createBurstEffect(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #fff, #ff69b4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (360 / 12) * i;
        const velocity = 100 + Math.random() * 50;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle * Math.PI / 180) * velocity}px, ${Math.sin(angle * Math.PI / 180) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }
}

// Enhanced floating hearts with variety
function createFloatingHeart() {
    const hearts = ['💖', '💕', '💗', '💘', '💝', '💞', '💟', '❤️', '🧡', '💛'];
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 25 + 20}px;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        pointer-events: none;
        animation: enhancedFloatUp ${Math.random() * 4 + 5}s ease-out forwards;
        opacity: 0.8;
        z-index: 5;
        filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.7));
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 9000);
}

// Create magical sparkles
function createMagicalSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = Math.random() > 0.5 ? '✨' : '⭐';
    sparkle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 15}px;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        pointer-events: none;
        animation: magicalSparkle ${Math.random() * 3 + 2}s ease-out forwards;
        z-index: 3;
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 5000);
}

// Create trailing stars on mouse move
function createTrailingStar(x, y) {
    const star = document.createElement('div');
    star.innerHTML = '⭐';
    star.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 12px;
        pointer-events: none;
        animation: trailFade 1.5s ease-out forwards;
        z-index: 4;
        color: rgba(255, 255, 255, 0.7);
    `;
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 1500);
}

// Add enhanced animations CSS
const enhancedAnimations = document.createElement('style');
enhancedAnimations.textContent = `
    @keyframes enhancedFloatUp {
        0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0.8;
        }
        10% {
            opacity: 1;
            transform: translateY(-20vh) rotate(36deg) scale(1);
        }
        90% {
            opacity: 0.9;
            transform: translateY(-90vh) rotate(324deg) scale(1.1);
        }
        100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes magicalSparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        25% {
            transform: scale(1.2) rotate(90deg);
            opacity: 0.9;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        75% {
            transform: scale(1.1) rotate(270deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes trailFade {
        0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: scale(0.3) rotate(180deg);
            opacity: 0;
        }
    }
    
    .burst-particle {
        animation: burstOut 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    @keyframes burstOut {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(enhancedAnimations);

// Mouse trail effect
let mouseTrailTimeout;
document.addEventListener('mousemove', function(e) {
    clearTimeout(mouseTrailTimeout);
    mouseTrailTimeout = setTimeout(() => {
        if (Math.random() > 0.95) {
            createTrailingStar(e.clientX, e.clientY);
        }
    }, 10);
});

// Enhanced profile image hover effect
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.3) drop-shadow(0 0 20px rgba(255, 105, 180, 0.8))';
            createImageSparkles(this);
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    }
});

// Create sparkles around profile image
function createImageSparkles(img) {
    const rect = img.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: 16px;
                pointer-events: none;
                animation: imageSparkle 2s ease-out forwards;
                z-index: 15;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Add image sparkle animation
const imageSparkleStyle = document.createElement('style');
imageSparkleStyle.textContent = `
    @keyframes imageSparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(imageSparkleStyle);

// Add button hover sound effect and enhanced interactions
function playHoverSound() {
    // Create a soft beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not available or blocked
        console.log('Audio not available');
    }
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.nav-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            playHoverSound();
            this.style.animation = 'none';
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)';
            this.style.backgroundSize = '600% 600%';
            this.style.animation = 'buttonFlow 2s ease-in-out infinite';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)';
            this.style.backgroundSize = '400% 400%';
            this.style.animation = 'buttonFlow 6s ease-in-out infinite';
        });
    });
});

// Create romantic ambient effects
function createRomanticAmbience() {
    // Create floating petals
    function createPetal() {
        const petal = document.createElement('div');
        petal.innerHTML = '🌸';
        petal.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 15 + 10}px;
            left: ${Math.random() * 100}vw;
            top: -50px;
            pointer-events: none;
            animation: petalFall ${Math.random() * 8 + 10}s linear forwards;
            opacity: 0.6;
            z-index: 2;
        `;
        
        document.body.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 18000);
    }
    
    // Create bubbles
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            width: ${Math.random() * 30 + 10}px;
            height: ${Math.random() * 30 + 10}px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 182, 193, 0.3));
            border-radius: 50%;
            pointer-events: none;
            animation: bubbleRise ${Math.random() * 6 + 8}s ease-out forwards;
            opacity: 0.7;
            z-index: 2;
            box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
        `;
        
        document.body.appendChild(bubble);
        
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 14000);
    }
    
    // Add petal and bubble animations
    const romanticAnimations = document.createElement('style');
    romanticAnimations.textContent = `
        @keyframes petalFall {
            0% {
                transform: translateY(0) rotateZ(0deg);
                opacity: 0.6;
            }
            100% {
                transform: translateY(110vh) rotateZ(360deg);
                opacity: 0;
            }
        }
        
        @keyframes bubbleRise {
            0% {
                transform: translateY(0) scale(0.5);
                opacity: 0.7;
            }
            50% {
                opacity: 0.9;
                transform: translateY(-50vh) scale(1);
            }
            100% {
                transform: translateY(-110vh) scale(0.3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(romanticAnimations);
    
    // Start effects
    setInterval(createPetal, 4000);
    setInterval(createBubble, 3000);
}

// Initialize all effects when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start floating hearts
    setInterval(createFloatingHeart, 2500);
    
    // Start magical sparkles
    setInterval(createMagicalSparkle, 3500);
    
    // Start romantic ambience
    createRomanticAmbience();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add page transition effect
    const pageTransition = document.createElement('div');
    pageTransition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255, 105, 180, 0.9) 0%, rgba(255, 20, 147, 0.7) 50%, transparent 100%);
        pointer-events: none;
        z-index: 9999;
        opacity: 1;
        transition: opacity 2s ease-out;
    `;
    
    document.body.appendChild(pageTransition);
    
    setTimeout(() => {
        pageTransition.style.opacity = '0';
        setTimeout(() => {
            if (pageTransition.parentNode) {
                pageTransition.parentNode.removeChild(pageTransition);
            }
        }, 2000);
    }, 500);
});

// Add keyboard interactions
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('nav-button')) {
            focusedElement.click();
        }
    }
});

// Add touch effects for mobile
document.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('nav-button')) {
        createBurstEffect(e.target);
    }
});

// Performance optimization - limit effects on slower devices
const isSlowDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isSlowDevice) {
    // Reduce effect frequency on mobile devices
    const style = document.createElement('style');
    style.textContent = `
        .floating-heart { animation-duration: 20s !important; }
        .letter { animation-duration: 6s !important; }
        .word { animation-duration: 8s !important; }
    `;
    document.head.appendChild(style);
}
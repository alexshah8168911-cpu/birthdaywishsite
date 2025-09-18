// Music control variables
let backgroundMusic;
let musicToggle;
let musicIcon;
let isMusicPlaying = false;

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Get audio and control elements
    backgroundMusic = document.getElementById('backgroundMusic');
    musicToggle = document.getElementById('musicToggle');
    musicIcon = document.getElementById('musicIcon');
    
    // Set initial volume
    backgroundMusic.volume = 0.5;
    
    // Add event listeners
    setupEventListeners();
    
    // Add entrance animation to heart
    animateHeartEntrance();
    
    // Try to start music automatically (will be blocked by most browsers)
    attemptAutoplay();
});

// Setup all event listeners
function setupEventListeners() {
    // Heart click event
    const heart = document.querySelector('.heart');
    heart.addEventListener('click', goToBirthday);
    
    // Music toggle button
    musicToggle.addEventListener('click', toggleMusic);
    
    // Handle music events
    backgroundMusic.addEventListener('canplay', function() {
        console.log('Music is ready to play');
    });
    
    backgroundMusic.addEventListener('play', function() {
        isMusicPlaying = true;
        updateMusicButton();
    });
    
    backgroundMusic.addEventListener('pause', function() {
        isMusicPlaying = false;
        updateMusicButton();
    });
    
    backgroundMusic.addEventListener('error', function(e) {
        console.log('Music failed to load:', e);
        musicToggle.style.display = 'none'; // Hide button if no music
    });
    
    // Handle user interaction for autoplay
    document.addEventListener('click', handleFirstUserInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
}

// Attempt to autoplay music (modern browsers will block this)
function attemptAutoplay() {
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Autoplay started successfully');
                isMusicPlaying = true;
                updateMusicButton();
            })
            .catch(error => {
                console.log('Autoplay was prevented:', error);
                isMusicPlaying = false;
                updateMusicButton();
                // Show a subtle prompt for user interaction
                showMusicPrompt();
            });
    }
}

// Handle first user interaction to enable music
function handleFirstUserInteraction() {
    if (!isMusicPlaying) {
        backgroundMusic.play()
            .then(() => {
                isMusicPlaying = true;
                updateMusicButton();
                hideMusicPrompt();
            })
            .catch(error => {
                console.log('Failed to start music on user interaction:', error);
            });
    }
}

// Toggle music on/off
function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play()
            .then(() => {
                isMusicPlaying = true;
                updateMusicButton();
            })
            .catch(error => {
                console.log('Failed to play music:', error);
            });
    }
}

// Update music button appearance
function updateMusicButton() {
    if (isMusicPlaying) {
        musicIcon.textContent = '🔊';
        musicToggle.classList.remove('muted');
        musicToggle.title = 'Mute Music';
    } else {
        musicIcon.textContent = '🔇';
        musicToggle.classList.add('muted');
        musicToggle.title = 'Play Music';
    }
}

// Show subtle music prompt
function showMusicPrompt() {
    // Create a subtle notification
    const prompt = document.createElement('div');
    prompt.id = 'musicPrompt';
    prompt.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: rgba(255, 105, 180, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 999;
        animation: fadeInOut 4s ease-in-out;
        pointer-events: none;
    `;
    prompt.textContent = 'Click to enable music';
    document.body.appendChild(prompt);
    
    // Remove prompt after animation
    setTimeout(() => {
        if (document.getElementById('musicPrompt')) {
            document.body.removeChild(prompt);
        }
    }, 4000);
}

// Hide music prompt
function hideMusicPrompt() {
    const prompt = document.getElementById('musicPrompt');
    if (prompt) {
        document.body.removeChild(prompt);
    }
}

// Splash page functionality
function goToBirthday() {
    // Add click effect
    const heart = document.querySelector('.heart');
    heart.style.transform = 'scale(0.95)';
    
    // Play click sound effect
    playClickSound();
    
    setTimeout(() => {
        heart.style.transform = 'scale(1)';
        // Navigate to birthday page
        window.location.href = 'birthday.html';
    }, 200);
}

// Add sound effect for heart click
function playClickSound() {
    // Create a short beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        console.log('Could not play click sound:', error);
    }
}

// Add entrance animation to heart
function animateHeartEntrance() {
    const heart = document.querySelector('.heart');
    heart.style.transform = 'scale(0)';
    heart.style.opacity = '0';
    
    setTimeout(() => {
        heart.style.transition = 'all 1s ease-out';
        heart.style.transform = 'scale(1)';
        heart.style.opacity = '1';
    }, 500);
}

// Add CSS animation for music prompt
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(-10px); }
        20%, 80% { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
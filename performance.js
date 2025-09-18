// Performance page functionality for two videos
let currentVideo = 1;
let totalVideos = 2;
let videosEnded = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupVideoHandlers(1);
    setupVideoHandlers(2);
    
    // Hide loading indicator initially
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.classList.add('hidden');
    
    // Show video progress indicator
    const videoProgress = document.getElementById('video-progress');
    videoProgress.classList.remove('hidden');
    
    // Start floating hearts
    setInterval(createFloatingHeart, 1500);
    
    // Auto-play first video when page loads
    setTimeout(() => {
        const video1 = document.getElementById('love-video-1');
        if (video1.readyState >= 2) {
            playVideo(1);
        }
    }, 1000);
});

// Setup video handlers for each video
function setupVideoHandlers(videoNum) {
    const video = document.getElementById(`love-video-${videoNum}`);
    const overlay = document.getElementById(`video-overlay-${videoNum}`);
    
    // Video event listeners
    video.addEventListener('loadstart', () => handleVideoLoadStart(videoNum));
    video.addEventListener('canplay', () => handleVideoCanPlay(videoNum));
    video.addEventListener('ended', () => handleVideoEnd(videoNum));
    video.addEventListener('error', () => handleVideoError(videoNum));
    video.addEventListener('play', () => handleVideoPlay(videoNum));
    video.addEventListener('pause', () => handleVideoPause(videoNum));
    
    // Click to play/pause
    video.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.paused) {
            playVideo(videoNum);
        } else {
            this.pause();
        }
    });
    
    // Volume fade-in effect
    video.addEventListener('play', function() {
        this.volume = 0;
        const fadeIn = setInterval(() => {
            if (this.volume < 1) {
                this.volume = Math.min(this.volume + 0.1, 1);
            } else {
                clearInterval(fadeIn);
            }
        }, 100);
    });
}

// Handle video loading start
function handleVideoLoadStart(videoNum) {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.classList.remove('hidden');
}

// Handle video ready to play
function handleVideoCanPlay(videoNum) {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.classList.add('hidden');
}

// Handle video play
function handleVideoPlay(videoNum) {
    const overlay = document.getElementById(`video-overlay-${videoNum}`);
    overlay.classList.add('hidden');
}

// Handle video pause
function handleVideoPause(videoNum) {
    const overlay = document.getElementById(`video-overlay-${videoNum}`);
    const video = document.getElementById(`love-video-${videoNum}`);
    
    // Only show overlay if video hasn't ended
    if (!video.ended) {
        overlay.classList.remove('hidden');
    }
}

// Play video function
function playVideo(videoNum) {
    const video = document.getElementById(`love-video-${videoNum}`);
    const overlay = document.getElementById(`video-overlay-${videoNum}`);
    
    overlay.classList.add('hidden');
    video.play().catch(e => {
        console.log(`Video ${videoNum} play failed:`, e);
        handleVideoError(videoNum);
    });
}

// Handle video end
function handleVideoEnd(videoNum) {
    videosEnded++;
    
    if (videoNum === 1) {
        // First video ended, transition to second video
        transitionToNextVideo();
    } else if (videoNum === 2) {
        // Both videos ended, show final message
        showFinalMessage();
    }
}

// Transition from first video to second video
function transitionToNextVideo() {
    const container1 = document.getElementById('video-container-1');
    const container2 = document.getElementById('video-container-2');
    const progressDot1 = document.getElementById('dot-1');
    const progressDot2 = document.getElementById('dot-2');
    const currentVideoNum = document.getElementById('current-video-num');
    
    // Create transition effect
    createTransitionEffect();
    
    setTimeout(() => {
        // Hide first video container
        container1.classList.add('fade-out');
        
        setTimeout(() => {
            container1.classList.add('hidden');
            
            // Show second video container
            container2.classList.remove('hidden');
            container2.classList.add('fade-in');
            
            // Update progress indicator
            progressDot1.classList.remove('active');
            progressDot2.classList.add('active');
            currentVideoNum.textContent = '2';
            
            // Auto-play second video
            setTimeout(() => {
                playVideo(2);
            }, 500);
        }, 500);
    }, 1000);
}

// Create transition effect between videos
function createTransitionEffect() {
    // Create hearts burst effect
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
    
    // Flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, rgba(255, 105, 180, 0.3), rgba(255, 182, 193, 0.3));
        z-index: 20;
        animation: flashEffect 1s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 1000);
}

// Show final message after both videos
function showFinalMessage() {
    const loveMessage = document.getElementById('love-message');
    const container2 = document.getElementById('video-container-2');
    const videoProgress = document.getElementById('video-progress');
    
    // Hide video progress
    videoProgress.classList.add('hidden');
    
    // Show love message with animation
    setTimeout(() => {
        container2.classList.add('fade-out');
        
        setTimeout(() => {
            container2.classList.add('hidden');
            loveMessage.classList.remove('hidden');
            
            // Add sparkle effects
            createSparkleShow();
            
            // After 8 seconds, redirect to missing page (if exists)
            setTimeout(() => {
                if (window.location.href.includes('missingyou.html')) {
                    window.location.href = 'missingyou.html';
                }
            }, 8000);
        }, 500);
    }, 1000);
}

// Handle video error
function handleVideoError(videoNum) {
    console.log(`Video ${videoNum} failed to load`);
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.classList.add('hidden');
    
    // If first video fails, try second video
    if (videoNum === 1) {
        setTimeout(() => {
            transitionToNextVideo();
        }, 2000);
    } else {
        // If second video also fails, show final message
        setTimeout(() => {
            showFinalMessage();
        }, 2000);
    }
}

// Create floating hearts
function createFloatingHeart() {
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 8000);
}

// Create sparkle show when message appears
function createSparkleShow() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createSparkle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 200);
    }
}

// Create individual sparkle
function createSparkle(x, y) {
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
        animation: sparkleAnimation 2s ease-out forwards;
        z-index: 30;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 2000);
}

// Add flash effect CSS
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flashEffect {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
document.head.appendChild(flashStyle);

// Keyboard controls
document.addEventListener('keydown', function(e) {
    const video1 = document.getElementById('love-video-1');
    const video2 = document.getElementById('love-video-2');
    const currentVideoElement = currentVideo === 1 ? video1 : video2;
    
    // Only control the currently visible video
    if (!document.getElementById(`video-container-${currentVideo}`).classList.contains('hidden')) {
        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                if (currentVideoElement.paused) {
                    playVideo(currentVideo);
                } else {
                    currentVideoElement.pause();
                }
                break;
            case 'f':
                if (currentVideoElement.requestFullscreen) {
                    currentVideoElement.requestFullscreen();
                }
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
            case 'ArrowRight':
                // Skip to next video (if on first video)
                if (currentVideo === 1 && videosEnded === 0) {
                    e.preventDefault();
                    currentVideoElement.currentTime = currentVideoElement.duration;
                }
                break;
        }
    }
});

// Add video progress tracking
document.addEventListener('DOMContentLoaded', function() {
    const video1 = document.getElementById('love-video-1');
    const video2 = document.getElementById('love-video-2');
    
    // Track progress for background changes
    video1.addEventListener('timeupdate', function() {
        const progress = (this.currentTime / this.duration) * 100;
        if (progress > 50) {
            document.body.style.background = 'linear-gradient(135deg, #4a6741, #2c3e50)';
        }
    });
    
    video2.addEventListener('timeupdate', function() {
        const progress = (this.currentTime / this.duration) * 100;
        if (progress > 50) {
            document.body.style.background = 'linear-gradient(135deg, #2c3e50, #ff69b4)';
        }
    });
});
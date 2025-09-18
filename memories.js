// Mobile Birthday Slide Gallery with Title/Description Above Photos
class MobileSlideGallery {
    constructor() {
        this.currentSlide = 0;
        // *** CHANGE THIS NUMBER TO ADD MORE PHOTOS ***
        this.totalSlides = 100; // Change this to your desired number of photos
        this.isAnimating = false;
        this.autoSlideInterval = null;
        this.isAutoPlaying = true;
        this.memories = this.generateMemories();
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchStartTime = 0;
        
        this.init();
    }
    
    init() {
        this.createSlides();
        this.setupEventListeners();
        this.updateUI();
        this.startAutoSlide();
        this.preloadImages();
        this.updateSlideContainerWidth();
    }
    
    generateMemories() {
        // *** CUSTOMIZE YOUR TITLE AND DESCRIPTION HERE ***
        const singleTitle = "Birthday Memories";
        const singleDescription = "Sweet moments captured forever";

        return Array.from({ length: this.totalSlides }, (_, i) => ({
            id: i + 1,
            title: singleTitle,
            description: singleDescription,
            // *** CHANGE IMAGE PATH AND NAMES HERE ***
            // Currently cycles through ishwa1.jpg to ishwa20.jpg
            // Add your own image names/paths here
            image: `assert/ishwa${(i % 52) + 1}.jpg`
            
            // *** EXAMPLE: To use your own images, replace the line above with: ***
            // image: `images/photo${i + 1}.jpg`  // For photo1.jpg, photo2.jpg, etc.
            // OR
            // image: `photos/birthday_${i + 1}.jpg` // For birthday_1.jpg, birthday_2.jpg, etc.
            // OR
            // image: `my-gallery/memory${i + 1}.png` // For memory1.png, memory2.png, etc.
        }));
    }
    
    updateSlideContainerWidth() {
        const container = document.getElementById('slidesContainer');
        const slides = document.querySelectorAll('.slide');
        
        // Update container width based on total slides
        container.style.width = `${this.totalSlides * 100}%`;
        
        // Update each slide width
        slides.forEach(slide => {
            slide.style.width = `${100 / this.totalSlides}%`;
        });
    }
    
    createSlides() {
        const container = document.getElementById('slidesContainer');
        container.innerHTML = '';
        
        this.memories.forEach((memory, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `
                <img src="${memory.image}" 
                     alt="${memory.title}" 
                     class="slide-image" 
                     loading="${index < 3 ? 'eager' : 'lazy'}"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk4ggSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='">
            `;
            container.appendChild(slide);
        });
    }
    
    setupEventListeners() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const backBtn = document.getElementById('backBtn');
        
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        playPauseBtn.addEventListener('click', () => this.toggleAutoPlay());
        backBtn.addEventListener('click', () => this.goBack());
        
        // Enhanced touch navigation
        this.setupTouchNavigation();
        
        // Keyboard navigation (for accessibility)
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
                case 'p':
                case 'P':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
                case 'Escape':
                    this.goBack();
                    break;
            }
        });
        
        // Pause on visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoSlide();
            } else if (this.isAutoPlaying) {
                this.startAutoSlide();
            }
        });
    }
    
    setupTouchNavigation() {
        const slideWrapper = document.querySelector('.slide-wrapper');
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let startTime = 0;
        
        // Enhanced touch handling
        slideWrapper.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
            isDragging = false;
            
            // Pause auto-slide when user interacts
            this.pauseAutoSlide();
        }, { passive: true });
        
        slideWrapper.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const touch = e.touches[0];
            const deltaX = startX - touch.clientX;
            const deltaY = startY - touch.clientY;
            
            // Determine if this is a horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                isDragging = true;
                e.preventDefault(); // Prevent scrolling
            }
        }, { passive: false });
        
        slideWrapper.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            const deltaTime = Date.now() - startTime;
            const velocity = Math.abs(deltaX) / deltaTime;
            
            // More sensitive swipe detection
            if (isDragging && (Math.abs(deltaX) > 30 || velocity > 0.3)) {
                if (deltaX > 0 && this.currentSlide < this.totalSlides - 1) {
                    this.nextSlide();
                } else if (deltaX < 0 && this.currentSlide > 0) {
                    this.previousSlide();
                }
            }
            
            // Reset values
            startX = 0;
            startY = 0;
            isDragging = false;
            
            // Resume auto-play after interaction
            if (this.isAutoPlaying) {
                setTimeout(() => this.startAutoSlide(), 3000);
            }
        }, { passive: true });
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide || index < 0 || index >= this.totalSlides) {
            return;
        }
        
        this.isAnimating = true;
        this.currentSlide = index;
        
        const container = document.getElementById('slidesContainer');
        const translateX = -(this.currentSlide * (100 / this.totalSlides));
        container.style.transform = `translateX(${translateX}%)`;
        
        this.updateUI();
        this.addHapticFeedback();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        } else {
            // Loop to beginning
            this.goToSlide(0);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        } else {
            // Loop to end
            this.goToSlide(this.totalSlides - 1);
        }
    }
    
    toggleAutoPlay() {
        this.isAutoPlaying = !this.isAutoPlaying;
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (this.isAutoPlaying) {
            this.startAutoSlide();
            playPauseBtn.textContent = '⏸️';
            playPauseBtn.title = 'Pause slideshow';
        } else {
            this.pauseAutoSlide();
            playPauseBtn.textContent = '▶️';
            playPauseBtn.title = 'Play slideshow';
        }
    }
    
    updateUI() {
        // Update counters
        document.getElementById('slideCounterHeader').textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
        
        // Update title and description
        const currentMemory = this.memories[this.currentSlide];
        document.getElementById('slideTitle').textContent = currentMemory.title;
        document.getElementById('slideDescription').textContent = currentMemory.description;
        
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        progressFill.style.width = `${progress}%`;
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // For mobile, we'll allow looping, so never disable buttons
        prevBtn.style.opacity = this.currentSlide === 0 ? '0.6' : '1';
        nextBtn.style.opacity = this.currentSlide === this.totalSlides - 1 ? '0.6' : '1';
    }
    
    startAutoSlide() {
        this.pauseAutoSlide();
        if (this.isAutoPlaying) {
            this.autoSlideInterval = setInterval(() => {
                if (!this.isAnimating && !document.hidden) {
                    this.nextSlide();
                }
            }, 4000);
        }
    }
    
    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    preloadImages() {
        // Preload next few images for smoother experience
        const preloadCount = 3;
        const start = Math.max(0, this.currentSlide - 1);
        const end = Math.min(this.totalSlides, this.currentSlide + preloadCount);
        
        for (let i = start; i < end; i++) {
            const img = new Image();
            img.src = this.memories[i].image;
        }
    }
    
    addHapticFeedback() {
        // Add subtle vibration feedback on supported devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    goBack() {
        // Add exit animation
        const container = document.querySelector('.slideshow-container');
        container.style.transition = 'all 0.3s ease-out';
        container.style.opacity = '0';
        container.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // Navigate back or reload page
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.reload();
            }
        }, 300);
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileSlideGallery();
    
    // Add sparkles for birthday effect
    setTimeout(() => {
        addBirthdaySparkles();
    }, 1000);
});

// Enhanced sparkle animation for mobile
function addBirthdaySparkles() {
    const sparkleEmojis = ['✨', '🎉', '🎂', '🎈', '⭐'];
    const sparkleColors = ['#ff6b9d', '#fecfef', '#c44569', '#667eea'];
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        const emoji = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        
        sparkle.innerHTML = emoji;
        sparkle.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 12 + 8}px;
            left: ${Math.random() * (window.innerWidth - 20)}px;
            top: ${Math.random() * (window.innerHeight - 20)}px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            animation: mobileSparkleAnimation 3s ease-out forwards;
            filter: drop-shadow(0 0 3px ${sparkleColors[Math.floor(Math.random() * sparkleColors.length)]});
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 3000);
    }
    
    // Create sparkles periodically
    setInterval(() => {
        if (!document.hidden) {
            for (let i = 0; i < 2; i++) {
                setTimeout(() => createSparkle(), i * 500);
            }
        }
    }, 6000);
}

// Add performance monitoring for mobile
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Optimize for mobile performance
        const images = document.querySelectorAll('.slide-image');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src && !img.src) {
                        img.src = img.dataset.src;
                    }
                }
            });
        }, { threshold: 0.1 });
        
        images.forEach(img => observer.observe(img));
    });
}

// Service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You can add service worker registration here for offline support
        console.log('Birthday Memories Gallery loaded successfully!');
    });
}
// Enhanced Script for Sorry page with Typing Effect
class TextTypeWriter {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            text: options.text || ["Hello World"],
            typingSpeed: options.typingSpeed || 75,
            pauseDuration: options.pauseDuration || 1500,
            deletingSpeed: options.deletingSpeed || 50,
            showCursor: options.showCursor !== false,
            cursorCharacter: options.cursorCharacter || "|",
            loop: options.loop !== false,
            initialDelay: options.initialDelay || 0,
            textColors: options.textColors || [],
            onComplete: options.onComplete || null,
            ...options
        };
        
        this.textArray = Array.isArray(this.options.text) ? this.options.text : [this.options.text];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isRunning = false;
        
        this.init();
    }
    
    init() {
        this.element.innerHTML = '';
        this.textSpan = document.createElement('span');
        this.textSpan.className = 'typewriter-text';
        
        if (this.options.showCursor) {
            this.cursorSpan = document.createElement('span');
            this.cursorSpan.className = 'typewriter-cursor';
            this.cursorSpan.textContent = this.options.cursorCharacter;
            this.cursorSpan.style.animation = 'blink 1s infinite';
        }
        
        this.element.appendChild(this.textSpan);
        if (this.cursorSpan) {
            this.element.appendChild(this.cursorSpan);
        }
        
        // Add CSS for cursor blinking
        this.addCursorStyles();
        
        // Start typing after initial delay
        setTimeout(() => {
            this.start();
        }, this.options.initialDelay);
    }
    
    addCursorStyles() {
        if (!document.getElementById('typewriter-styles')) {
            const style = document.createElement('style');
            style.id = 'typewriter-styles';
            style.textContent = `
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .typewriter-cursor {
                    display: inline-block;
                    margin-left: 2px;
                    font-weight: normal;
                }
                .typewriter-text {
                    display: inline-block;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    getCurrentColor() {
        if (this.options.textColors.length === 0) return '';
        return this.options.textColors[this.currentTextIndex % this.options.textColors.length];
    }
    
    start() {
        this.isRunning = true;
        this.type();
    }
    
    stop() {
        this.isRunning = false;
    }
    
    type() {
        if (!this.isRunning) return;
        
        const currentText = this.textArray[this.currentTextIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            if (this.textSpan.textContent.length > 0) {
                this.textSpan.textContent = this.textSpan.textContent.slice(0, -1);
                setTimeout(() => this.type(), this.options.deletingSpeed);
            } else {
                // Done deleting, move to next text
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.textArray.length;
                this.currentCharIndex = 0;
                
                // Check if we should stop (no loop and reached end)
                if (!this.options.loop && this.currentTextIndex === 0) {
                    this.isRunning = false;
                    if (this.options.onComplete) {
                        this.options.onComplete();
                    }
                    return;
                }
                
                setTimeout(() => this.type(), this.options.pauseDuration);
            }
        } else {
            // Typing characters
            if (this.currentCharIndex < currentText.length) {
                this.textSpan.textContent += currentText[this.currentCharIndex];
                this.currentCharIndex++;
                
                // Apply color if specified
                const color = this.getCurrentColor();
                if (color) {
                    this.textSpan.style.color = color;
                }
                
                setTimeout(() => this.type(), this.options.typingSpeed);
            } else {
                // Done typing current text
                if (this.textArray.length > 1) {
                    // Start deleting after pause
                    setTimeout(() => {
                        this.isDeleting = true;
                        this.type();
                    }, this.options.pauseDuration);
                } else if (this.options.loop) {
                    // Single text with loop
                    setTimeout(() => {
                        this.currentCharIndex = 0;
                        this.textSpan.textContent = '';
                        this.type();
                    }, this.options.pauseDuration);
                } else {
                    // Single text without loop - stop
                    this.isRunning = false;
                    if (this.options.onComplete) {
                        this.options.onComplete();
                    }
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Sorry page with Typing Effect loaded! 💕');
    
    // Initialize typing effect for the title
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        // Create typewriter effect
        new TextTypeWriter(titleElement, {
            text: [
                "I'm So Sorry 💔",
                "Please Forgive Me 🥺",
                "I Love You So Much ❤️",
                "You Mean Everything To Me 💕"
            ],
            typingSpeed: 100,
            pauseDuration: 2500,
            deletingSpeed: 60,
            showCursor: true,
            cursorCharacter: "|",
            loop: true,
            initialDelay: 1000
        });
    }
    
    // Initialize other interactive elements
    initializeInteractivity();
    createSparkleEffect();
    showPhotoSection();
    setupMusicToggle();
    
    // Add heart click effect
    const heartIcon = document.getElementById('heartIcon');
    if (heartIcon) {
        heartIcon.addEventListener('click', function() {
            // Change broken heart to mended heart
            this.textContent = this.textContent === '💔' ? '❤️' : '💔';
            createHeartExplosion(this);
            playSound('heart');
        });
    }
    
    // Forgive button functionality
    const forgiveButton = document.getElementById('forgiveButton');
    const surpriseMessage = document.getElementById('surpriseMessage');
    
    if (forgiveButton && surpriseMessage) {
        forgiveButton.addEventListener('click', function() {
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show surprise message
            surpriseMessage.style.display = 'block';
            surpriseMessage.style.animation = 'fadeIn 1s ease-in-out';
            
            // Change button text with typing effect
            this.innerHTML = '';
            new TextTypeWriter(this, {
                text: ["Thank you! 🥰", "I love you! 💕", "You're amazing! ✨"],
                typingSpeed: 80,
                pauseDuration: 1500,
                showCursor: false,
                loop: true
            });
            
            this.style.background = 'linear-gradient(45deg, #00d2ff, #3a7bd5)';
            
            // Create celebration effect
            createCelebration();
            playSound('celebration');
            
            // Change all broken hearts to love hearts
            setTimeout(() => {
                const brokenHearts = document.querySelectorAll('.heart');
                brokenHearts.forEach(heart => {
                    heart.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/803/803087.png')";
                });
            }, 1000);
        });
    }
    
    // Photo placeholder click
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    if (photoPlaceholder) {
        photoPlaceholder.addEventListener('click', function() {
            const emojis = ['😍', '🥰', '😘', '💕', '🌹', '✨', '💖', '🦋'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            this.textContent = randomEmoji;
            
            setTimeout(() => {
                this.textContent = '📸';
            }, 2000);
        });
    }
});

function initializeInteractivity() {
    // Add click listeners to hearts for interactive effects
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.style.pointerEvents = 'auto';
        heart.style.cursor = 'pointer';
        heart.addEventListener('click', function(e) {
            createRippleEffect(e.clientX, e.clientY);
        });
    });
    
    // Add mouse move sparkle effect
    document.addEventListener('mousemove', function(e) {
        if (Math.random() < 0.1) { // 10% chance
            createSparkle(e.clientX, e.clientY);
        }
    });
}

function createSparkleEffect() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }, 1000);
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.position = 'fixed';
    sparkle.style.zIndex = '1000';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 2000);
}

function createHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        heart.style.transition = 'all 1s ease-out';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.left = endX + 'px';
            heart.style.top = endY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'scale(0)';
        }, 10);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    }
}

function createCelebration() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.zIndex = '1000';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
    
    // Add falling confetti animation
    if (!document.getElementById('confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 107, 157, 0.6)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    
    document.body.appendChild(ripple);
    
    // Add ripple animation if not exists
    if (!document.getElementById('rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function showPhotoSection() {
    setTimeout(() => {
        const photoSection = document.getElementById('photoSection');
        if (photoSection) {
            photoSection.classList.add('visible');
        }
    }, 1500);
}

function setupMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (musicToggle && backgroundMusic) {
        let isPlaying = false;
        
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                backgroundMusic.pause();
                this.textContent = '🎵';
                isPlaying = false;
            } else {
                // Note: Most browsers require user interaction to play audio
                backgroundMusic.play().catch(e => {
                    console.log('Audio play failed:', e);
                });
                this.textContent = '🔇';
                isPlaying = true;
            }
        });
    }
}

function playSound(type) {
    // Create audio context for sound effects
    if (typeof(Audio) !== "undefined") {
        // You can add sound files here
        console.log('Playing', type, 'sound');
    }
}

// Function to create additional floating hearts
function createFloatingHeart() {
    const heartContainer = document.getElementById('heartContainer');
    if (heartContainer) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heartContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }
}

// Create additional hearts every few seconds
setInterval(createFloatingHeart, 4000);

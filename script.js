document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const bgMusic = document.getElementById('bg-music');
    const musicPill = document.getElementById('music-pill');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const musicIcon = document.getElementById('music-icon');
    const musicDisc = document.getElementById('music-disc');
    const soundWave = document.getElementById('sound-wave');
    
    const entranceOverlay = document.getElementById('entrance-overlay');
    const openSurpriseBtn = document.getElementById('open-surprise-btn');

    const heroFlowerBtn = document.getElementById('hero-flower-btn');
    const scrollToGalleryBtn = document.getElementById('scroll-to-gallery-btn');
    const interactiveConfettiBtn = document.getElementById('interactive-confetti-btn');
    const generateMsgBtn = document.getElementById('generate-msg-btn');
    const dynamicMessage = document.getElementById('dynamic-message');

    // Lightbox Elements
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    // ---------------------------------------------------------
    // LOAD EMBEDDED MEDIA ASSETS (GUARANTEED ZERO-404 ON CLOUD)
    // ---------------------------------------------------------
    if (typeof APP_MEDIA_DATA !== 'undefined') {
        // Load Audio
        if (APP_MEDIA_DATA.audio && bgMusic) {
            bgMusic.src = APP_MEDIA_DATA.audio;
            bgMusic.load();
        }

        // Load Images
        if (APP_MEDIA_DATA.images) {
            document.querySelectorAll('[data-asset-key]').forEach(img => {
                const key = img.getAttribute('data-asset-key');
                if (APP_MEDIA_DATA.images[key]) {
                    img.src = APP_MEDIA_DATA.images[key];
                }
            });
        }
    }

    // Audio Playback State
    let isMusicPlaying = false;

    // Play Music helper
    function playMusic() {
        if (bgMusic) {
            bgMusic.volume = 1.0;
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicIcon.className = 'fa-solid fa-pause';
                musicDisc.classList.add('playing');
                soundWave.classList.add('playing');
            }).catch((err) => {
                console.log('Audio autoplay prevented or waiting for user interaction:', err);
            });
        }
    }

    // Pause Music helper
    function pauseMusic() {
        if (bgMusic) {
            bgMusic.pause();
            isMusicPlaying = false;
            musicIcon.className = 'fa-solid fa-play';
            musicDisc.classList.remove('playing');
            soundWave.classList.remove('playing');
        }
    }

    // Toggle Music
    function toggleMusic() {
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    musicPill.addEventListener('click', toggleMusic);

    // CONFETTI BURST FUNCTIONS
    function launchGrandConfetti() {
        if (typeof confetti !== 'undefined') {
            // Center Burst
            confetti({
                particleCount: 120,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#d81b60', '#ffd700', '#ff4081', '#f5af19', '#ffffff', '#880e4f']
            });

            // Left Cannon
            setTimeout(() => {
                confetti({
                    particleCount: 80,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0, y: 0.7 },
                    colors: ['#ffd700', '#d81b60', '#ff80ab', '#ffffff']
                });
            }, 300);

            // Right Cannon
            setTimeout(() => {
                confetti({
                    particleCount: 80,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1, y: 0.7 },
                    colors: ['#ffd700', '#d81b60', '#ff80ab', '#ffffff']
                });
            }, 600);
        }
    }

    function launchFlowerShower() {
        if (typeof confetti !== 'undefined') {
            const end = Date.now() + 2.5 * 1000;
            const colors = ['#ff4081', '#f06292', '#ffd700', '#ffffff', '#e91e63'];

            (function frame() {
                confetti({
                    particleCount: 4,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 4,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }

    // OPEN SURPRISE BUTTON CLICK (OPENS MAIN HERO DIRECTLY WITH AUDIBLE MUSIC)
    if (openSurpriseBtn) {
        openSurpriseBtn.addEventListener('click', () => {
            // Start background music immediately and audibly
            playMusic();
            
            // Hide Entrance Overlay
            entranceOverlay.classList.add('hidden');

            // Launch Grand Confetti & Flower Shower celebration directly on the main page
            launchGrandConfetti();
            launchFlowerShower();
        });
    }

    // HERO ACTION BUTTONS
    heroFlowerBtn.addEventListener('click', () => {
        launchFlowerShower();
        launchGrandConfetti();
    });

    scrollToGalleryBtn.addEventListener('click', () => {
        const gallery = document.getElementById('gallery-section');
        if (gallery) {
            gallery.scrollIntoView({ behavior: 'smooth' });
        }
    });

    interactiveConfettiBtn.addEventListener('click', () => {
        launchGrandConfetti();
        launchFlowerShower();
    });

    // AUNTY'S BLESSINGS & COMPLIMENTS GENERATOR
    const auntyMessages = [
        "Aunty, your devotion to teaching and your family inspires us every single second. You are our role model forever!",
        "Behind every confident step we take is your unwavering faith in us. Happy Teacher's Day to our guiding star, Aunty!",
        "You don't just teach subjects—you teach character, kindness, and courage. We are blessed to have you in our lives!",
        "Your classroom students are lucky, but we are the luckiest of all to call you AUNTY. You are the #1 teacher in the universe!",
        "Aunty, your patience is boundless, your heart is pure gold, and your smile makes every difficulty disappear.",
        "Thank you for teaching us that love is the greatest lesson of all. May God bless you with health, joy, and long life!"
    ];

    let currentMsgIndex = 0;
    generateMsgBtn.addEventListener('click', () => {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * auntyMessages.length);
        } while (nextIndex === currentMsgIndex && auntyMessages.length > 1);
        
        currentMsgIndex = nextIndex;

        dynamicMessage.style.opacity = '0';
        setTimeout(() => {
            dynamicMessage.textContent = auntyMessages[currentMsgIndex];
            dynamicMessage.style.opacity = '1';
        }, 250);

        launchFlowerShower();
    });

    // LIGHTBOX FOR PHOTOS & ART
    const photos = document.querySelectorAll('.mom-photo, .art-illustration-img');
    photos.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            lightboxModal.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt || 'Happy Teacher\'s Day Aunty';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
        }
    });

    // =========================================================
    // FLOATING PETALS & SPARKLES CANVAS ANIMATION
    // =========================================================
    const canvas = document.getElementById('petal-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 35;
    const petalColors = [
        'rgba(240, 98, 146, 0.7)',  // soft pink
        'rgba(233, 30, 99, 0.65)',  // bright rose
        'rgba(255, 215, 0, 0.75)',  // gold sparkle
        'rgba(255, 240, 245, 0.8)', // jasmine petal white-pink
        'rgba(255, 179, 0, 0.7)'    // warm marigold gold
    ];

    class Petal {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = -20 - Math.random() * 50;
            this.size = Math.random() * 8 + 6;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 1.2;
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 2;
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.opacity = Math.random() * 0.5 + 0.5;
            this.isSparkle = Math.random() > 0.7;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.02) * 0.5;
            this.rotation += this.rotSpeed;

            if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            if (this.isSparkle) {
                // Draw 4-point golden star sparkle
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size, Math.sin((i * Math.PI) / 2) * this.size);
                    ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 3));
                }
                ctx.closePath();
                ctx.fill();
            } else {
                // Draw delicate flower petal
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(this.size, -this.size / 2, this.size, this.size / 2, 0, this.size);
                ctx.bezierCurveTo(-this.size, this.size / 2, -this.size, -this.size / 2, 0, 0);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        const petal = new Petal();
        petal.y = Math.random() * height; // initial spread
        particles.push(petal);
    }

    function animatePetals() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animatePetals);
    }

    animatePetals();
});

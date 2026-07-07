// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing effect for greeting
const greetingText = "Hey You Know What! You're the most adorable human i ever met! 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 80);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕', '🌹'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = '100vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -1100,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        duration: Math.random() * 6 + 6,
        opacity: 0.8,
        ease: "power1.out",
        onComplete: () => element.remove()
    });
}

// Music player management
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');

// Sync state from localStorage
let isPlaying = localStorage.getItem('music-playing') === 'true';

function updateMusicState() {
    if (isPlaying) {
        bgMusic.play().catch(() => {
            // Browser autoplays block sometimes, user gesture needed
            isPlaying = false;
            musicBtn.classList.remove('playing');
        });
        musicBtn.classList.add('playing');
    } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    }
}

musicBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    localStorage.setItem('music-playing', isPlaying);
    updateMusicState();
});

// Initialize animations
window.addEventListener('load', () => {
    // Attempt auto-play if previously enabled
    updateMusicState();

    // GSAP Title animation
    gsap.to('.main-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    });

    // GSAP Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
    });

    // Start typing effect
    setTimeout(typeGreeting, 500);

    // Create floating elements periodically
    setInterval(createFloating, 800);
});

// Hover and Click animations
const enterBtn = document.getElementById('enter-btn');
if (enterBtn) {
    enterBtn.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.8, background: 'rgba(255, 59, 147, 0.6)' });
    });

    enterBtn.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, background: 'radial-gradient(circle, rgba(255,105,180,1) 0%, rgba(255,182,193,0.4) 70%, rgba(255,255,255,0) 100%)' });
    });

    enterBtn.addEventListener('click', () => {
        // Confetti explosion
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff3b93', '#ff7bb0', '#ffebf5', '#e0f2fe']
        });

        // Smooth transition to next page after a small delay to see confetti
        setTimeout(() => {
            gsap.to('body', {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    window.location.href = 'cause.html';
                }
            });
        }, 800);
    });
}
 // Reasons database
 const reasons = [
    { 
        text: "The way you smile lights up my whole world, and I feel like the luckiest person to have you by my side. 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "You make every single day feel special, and I want to make your birthday the most magical day ever. 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "I love everything about you—your kindness, your beautiful soul, and the way you care. You are my everything. ✨ ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Wishing the happiest birthday to the girl who stole my heart. I promise to love and cherish you forever! 🥳 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Music player management
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isPlaying = localStorage.getItem('music-playing') === 'true';

function updateMusicState() {
    if (isPlaying) {
        bgMusic.play().catch(() => {
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

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Love Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        // Confetti burst for each reason revealed
        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff3b93', '#ff7bb0']
        });
        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff3b93', '#ff7bb0']
        });

        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        confetti({
                            particleCount: 150,
                            spread: 80,
                            origin: { y: 0.6 }
                        });
                        setTimeout(() => {
                            gsap.to('body', {
                                opacity: 0,
                                duration: 0.8,
                                onComplete: () => {
                                    window.location.href = 'last.html';
                                }
                            });
                        }, 800);
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐', '🌹', '💕'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -window.innerHeight - 100,
        duration: Math.random() * 8 + 8,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.1
    });
});

window.addEventListener('load', () => {
    updateMusicState();
    setInterval(createFloatingElement, 1500);
});
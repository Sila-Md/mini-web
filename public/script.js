// Add this to your existing JavaScript

// Background Music Control
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const musicIcon = document.getElementById('musicIcon');

let musicPlaying = false;

musicControl.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicIcon.className = 'fas fa-play';
        musicPlaying = false;
    } else {
        bgMusic.play().catch(e => {
            console.log('Audio play failed:', e);
            // Auto-play might be blocked, we'll handle it gracefully
        });
        musicIcon.className = 'fas fa-pause';
        musicPlaying = true;
    }
});

// Auto-play music on user interaction (to bypass browser restrictions)
document.addEventListener('click', function initAudio() {
    if (!musicPlaying) {
        bgMusic.play().then(() => {
            musicIcon.className = 'fas fa-pause';
            musicPlaying = true;
        }).catch(e => {
            console.log('Auto-play blocked:', e);
        });
    }
    document.removeEventListener('click', initAudio);
}, { once: true });

// Server card animations
document.querySelectorAll('.server-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Update counter for servers
const serverCounters = document.querySelectorAll('.stat-number');
const serverSpeed = 200;

const animateServerCounter = () => {
    serverCounters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const inc = target / serverSpeed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateServerCounter, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Initialize particles
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 }},
            color: { value: '#6366f1' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366f1',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        }
    });

    // Start counter animation when stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateServerCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.hero-stats'));

    console.log('🚀 SILA MD MINI Website Loaded Successfully!');
    console.log('🎵 Background music ready');
    console.log('🖥️ 6 Servers available for deployment');
});

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6366f1'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
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
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animated counter for stats
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounter, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Intersection Observer for counter animation
const statsSection = document.querySelector('.hero-stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Terminal typing effect
const terminalLines = [
    '$ npm run start:bot',
    '🚀 Starting SILA MD MINI...',
    '📱 Initializing WhatsApp Connection...',
    '🤖 Loading AI Modules...',
    '🔧 Setting up Media Downloaders...',
    '✅ Bot is ready! Use .menu to start'
];

let currentLine = 0;
let currentChar = 0;
const terminalBody = document.querySelector('.terminal-body');
const typingLine = document.querySelector('.typing');

function typeTerminal() {
    if (currentLine < terminalLines.length) {
        if (currentChar === 0) {
            // Create new line
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            newLine.innerHTML = `<span class="prompt">$</span> <span class="line-content"></span>`;
            terminalBody.insertBefore(newLine, typingLine);
        }

        const currentLineElement = terminalBody.children[terminalBody.children.length - 2];
        const lineContent = currentLineElement.querySelector('.line-content');
        
        if (currentChar < terminalLines[currentLine].length) {
            lineContent.textContent += terminalLines[currentLine].charAt(currentChar);
            currentChar++;
            setTimeout(typeTerminal, 50);
        } else {
            currentLine++;
            currentChar = 0;
            setTimeout(typeTerminal, 500);
        }
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeTerminal, 1000);
});

// Form submission
const supportForm = document.getElementById('supportForm');
supportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(supportForm);
    const name = formData.get('name') || document.querySelector('input[type="text"]').value;
    const email = formData.get('email') || document.querySelector('input[type="email"]').value;
    const message = formData.get('message') || document.querySelector('textarea').value;

    // Simulate form submission
    const submitBtn = supportForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#10b981';
        
        // Reset form
        supportForm.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Theme toggle (optional dark/light mode)
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.className = 'theme-toggle';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = document.body.classList.contains('light-theme') ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

document.body.appendChild(themeToggle);

// Add light theme styles
const lightThemeStyles = `
    .light-theme {
        --dark: #f3f4f6;
        --darker: #ffffff;
        --light: #1f2937;
        --text: #374151;
        --text-light: #6b7280;
    }
    
    .light-theme .navbar {
        background: rgba(255, 255, 255, 0.95);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .light-theme .nav-link {
        color: var(--text);
    }
    
    .light-theme .feature-card,
    .light-theme .deploy-card,
    .light-theme .doc-card,
    .light-theme .support-form,
    .light-theme .step,
    .light-theme .channel {
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .light-theme .footer {
        background: rgba(243, 244, 246, 0.95);
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
`;

const lightThemeStyleSheet = document.createElement('style');
lightThemeStyleSheet.textContent = lightThemeStyles;
document.head.appendChild(lightThemeStyleSheet);

console.log('🚀 SILA MD MINI Website Loaded Successfully!');

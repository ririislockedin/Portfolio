// ===== DYNAMIC GRADIENT ON SCROLL =====
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent < 25) {
        document.body.classList.remove('scroll-pink', 'scroll-purple', 'scroll-blue', 'scroll-yellow');
    } else if (scrollPercent < 50) {
        document.body.classList.remove('scroll-purple', 'scroll-blue', 'scroll-yellow');
        document.body.classList.add('scroll-pink');
    } else if (scrollPercent < 75) {
        document.body.classList.remove('scroll-pink', 'scroll-blue', 'scroll-yellow');
        document.body.classList.add('scroll-purple');
    } else if (scrollPercent < 90) {
        document.body.classList.remove('scroll-pink', 'scroll-purple', 'scroll-yellow');
        document.body.classList.add('scroll-blue');
    } else {
        document.body.classList.remove('scroll-pink', 'scroll-purple', 'scroll-blue');
        document.body.classList.add('scroll-yellow');
    }
    
    // Update scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress');
    scrollProgress.style.width = scrollPercent + '%';
});

// ===== HOVER GRADIENT ANIMATION =====
document.body.addEventListener('mouseenter', () => {
    document.body.style.animationDuration = '8s';
});

document.body.addEventListener('mouseleave', () => {
    document.body.style.animationDuration = '15s';
});

// ===== NAVBAR GRADIENT ON SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    navbar.classList.remove('scroll-active-pink', 'scroll-active-purple', 'scroll-active-blue', 'scroll-active-yellow');
    
    if (scrollPercent < 50) {
        navbar.classList.add('scroll-active-pink');
    } else if (scrollPercent < 75) {
        navbar.classList.add('scroll-active-purple');
    } else {
        navbar.classList.add('scroll-active-blue');
    }
});

// ===== PORTFOLIO FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (filter === 'all' || itemCategory === filter) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add('fade-in'), 10);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== SMOOTH SCROLL NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== INTERSECTION OBSERVER FOR FADE-IN =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .skill-card, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// ===== CTA BUTTON =====
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    });
}

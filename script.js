// ===== CURSOR-TRACKING GRADIENT EFFECT (MAGNETIC) =====
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Calculate percentage position
    const xPercent = (mouseX / window.innerWidth) * 100;
    const yPercent = (mouseY / window.innerHeight) * 100;
    
    // Update CSS variables for cursor position
    document.documentElement.style.setProperty('--cursor-x', xPercent + '%');
    document.documentElement.style.setProperty('--cursor-y', yPercent + '%');
    
    // Activate cursor gradient on move
    document.body.classList.add('cursor-active');
});

// Deactivate when mouse leaves window
document.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-active');
});

// Reactivate when mouse enters
document.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-active');
});

// ===== PORTFOLIO FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (filter === 'all' || itemCategory === filter) {
                item.style.display = 'flex';
                setTimeout(() => item.classList.add('fade-in'), 10);
            } else {
                item.style.display = 'none';
            }
        });

        galleryItems.forEach(item => {
            const gallery = item.parentElement;
            const galleryCategory = gallery.getAttribute('data-category');
            if (filter === 'all' || galleryCategory === filter) {
                gallery.style.display = 'grid';
            } else {
                gallery.style.display = 'none';
            }
        });
    });
});

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
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

document.querySelectorAll('.fade-in, .skill-card, .portfolio-item, .gallery-item').forEach(el => {
    observer.observe(el);
});

// ===== CTA BUTTON =====
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    });
}

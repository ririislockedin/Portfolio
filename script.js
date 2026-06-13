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

// ===== IMAGE LIGHTBOX/MODAL =====
function initLightbox() {
    // Create lightbox HTML
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <div class="lightbox-content">
                <img id="lightbox-image" src="" alt="Expanded view">
            </div>
            <div class="lightbox-background">
            <button class="lightbox-close">&times;</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxBg = document.querySelector('.lightbox-background');
    
    let currentImageIndex = 0;
    let allImages = [];
    
    // Collect all clickable images
    function collectImages() {
        allImages = Array.from(document.querySelectorAll('.gallery-item img, .year-image, .collage-image img, .project-image, .profile-photo'));
    }
    
    // Open lightbox
    function openLightbox(img) {
        collectImages();
        currentImageIndex = allImages.indexOf(img);
        lightboxImage.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Show next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        lightboxImage.src = allImages[currentImageIndex].src;
    }
    
    // Show previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        lightboxImage.src = allImages[currentImageIndex].src;
    }
    
    // Add click listeners to all images
    document.querySelectorAll('.gallery-item img, .year-image, .collage-image img, .project-image, .profile-photo').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(img));
    });
    
    // Close button
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Background click to close
    lightboxBg.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    lightboxNext.addEventListener('click', nextImage);
    lightboxPrev.addEventListener('click', prevImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    });
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', initLightbox);

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

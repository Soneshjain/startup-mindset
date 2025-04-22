// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-fadeIn, .animate-slideIn').forEach((el) => {
        observer.observe(el);
    });

    const showMoreBtns = document.querySelectorAll('.show-more-btn');
    
    showMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const module = this.closest('.curriculum-module');
            const hiddenLessons = module.querySelectorAll('.lesson-card.hidden');
            
            hiddenLessons.forEach(lesson => {
                lesson.style.display = this.classList.contains('active') ? 'none' : 'flex';
            });
            
            this.classList.toggle('active');
        });
    });

    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.testimonials-slide');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto-advance carousel
    let autoAdvance = setInterval(nextSlide, 5000);
    
    function updateSlidePosition() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        resetAutoAdvance();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }
    
    function resetAutoAdvance() {
        clearInterval(autoAdvance);
        autoAdvance = setInterval(nextSlide, 5000);
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    carousel.addEventListener('mouseleave', () => autoAdvance = setInterval(nextSlide, 5000));

    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}); 
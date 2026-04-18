document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.querySelector('.header-main');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // 2. Category Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterableProducts = document.querySelectorAll('.filterable-product');

    if (filterBtns.length > 0 && filterableProducts.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');

                // Get the category filter value
                const filterValue = btn.getAttribute('data-filter');

                // Loop through products and filter
                filterableProducts.forEach(product => {
                    // Reset animation by removing and re-adding class
                    product.classList.remove('filterable-product');
                    void product.offsetWidth; // trigger reflow
                    product.classList.add('filterable-product');

                    if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
                        product.style.display = 'flex';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }

    // ====== HERO CAROUSEL LOGIC ======
    const heroTrack = document.getElementById('hero-track');
    if (heroTrack) {
        const slides = document.querySelectorAll('.carousel-slide');
        const nextBtn = document.getElementById('hero-next');
        const prevBtn = document.getElementById('hero-prev');
        const dots = document.querySelectorAll('.carousel-dot');
        let currentSlide = 0;
        let slideInterval;

        function updateSlide(index) {
            heroTrack.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            updateSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            updateSlide(prevIndex);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-index'));
                updateSlide(targetIndex);
                resetTimer();
            });
        });

        // Auto-scroll
        function startTimer() {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds
        }

        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }

        startTimer();
    }
});

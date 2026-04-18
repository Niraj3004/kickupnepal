document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.getElementById('slider-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (sliderContainer && scrollLeftBtn && scrollRightBtn) {
        // Amount to scroll per click - adjusted for average card width + gap
        const scrollAmount = 450; 

        scrollLeftBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});

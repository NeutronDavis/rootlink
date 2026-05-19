document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');

    if (mobileBtn) {
        // Toggle menu on button click
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from immediately closing
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            navbar.classList.toggle('nav-open');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbar && navbar.classList.contains('nav-open') && !navbar.contains(e.target)) {
            navbar.classList.remove('nav-open');
            if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar && navbar.classList.contains('nav-open')) {
                    navbar.classList.remove('nav-open');
                    if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Scroll Animation Observer
    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Remove class when scrolling out of view so it animates again when scrolling back
                entry.target.classList.remove('is-visible');
            }
        });
    }, scrollObserverOptions);

    // Observe all elements with the .animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        scrollObserver.observe(el);
    });
});

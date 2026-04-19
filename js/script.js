document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        const mobileNavMql = () =>
            window.matchMedia('(max-width: 768px), (max-height: 520px) and (max-width: 1024px)');

        let navBackdrop = document.querySelector('.nav-backdrop');
        if (!navBackdrop) {
            navBackdrop = document.createElement('div');
            navBackdrop.className = 'nav-backdrop';
            navBackdrop.setAttribute('aria-hidden', 'true');
            document.body.appendChild(navBackdrop);
        }

        const setMenuOpen = (open) => {
            navLinks.classList.toggle('active', open);
            mobileMenuBtn.textContent = open ? '✕' : '☰';
            mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.classList.toggle('menu-open', open);
            navBackdrop.classList.toggle('active', open);
            navBackdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
        };

        mobileMenuBtn.addEventListener('click', () => {
            const open = !navLinks.classList.contains('active');
            setMenuOpen(open);
        });

        navBackdrop.addEventListener('click', () => setMenuOpen(false));

        document.querySelectorAll('.nav-links a:not(.dropbtn)').forEach(link => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        window.addEventListener('resize', () => {
            if (!mobileNavMql().matches) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                setMenuOpen(false);
            }
        });
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            if (typeof window.refreshThemeToggleTitle === 'function') {
                window.refreshThemeToggleTitle();
            }
        });
    }
    if (typeof window.refreshThemeToggleTitle === 'function') {
        window.refreshThemeToggleTitle();
    }

    // Close Dropdowns when clicking outside
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn i')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var dropbtns = document.getElementsByClassName("dropdown");
            
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
            
            for (var i = 0; i < dropbtns.length; i++) {
                dropbtns[i].classList.remove('active');
            }
        }
    }

    // Smooth Scroll for Anchor Links
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

    // Sticky Header & Scroll to Top Button (optional — not on every page)
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.style.padding = window.scrollY > 100 ? '0.5rem 0' : '1rem 0';
        }
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 100);
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Dynamic Copyright Year
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    function initHeroTyping() {
        const heroText = document.querySelector('.typing-text');
        if (!heroText) return;
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 500);
    }

    initHeroTyping();
    window.addEventListener('sitewideLangChange', () => {
        initHeroTyping();
    });

    // Image carousel: only <img class="carousel-slide"> — display toggle (not opacity stack) so every slide decodes reliably
    const CAROUSEL_AUTOPLAY_MS = 3000;

    function waitForSlideImages(slides) {
        return Promise.all(
            Array.from(slides).map(
                (img) =>
                    new Promise((resolve) => {
                        if (!(img instanceof HTMLImageElement)) {
                            resolve();
                            return;
                        }
                        img.loading = 'eager';
                        const done = () => resolve();
                        if (img.complete && img.naturalWidth > 0) {
                            if (img.decode) {
                                img.decode().then(done).catch(done);
                            } else {
                                done();
                            }
                            return;
                        }
                        img.addEventListener('load', done, { once: true });
                        img.addEventListener('error', done, { once: true });
                    })
            )
        );
    }

    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll('img.carousel-slide');
        let currentSlide = 0;

        if (slides.length === 0) return;

        slides.forEach((img) => {
            const fb = img.getAttribute('data-fallback-src');
            if (fb) {
                img.addEventListener(
                    'error',
                    function onFallback() {
                        img.removeEventListener('error', onFallback);
                        img.src = fb;
                    },
                    { once: true }
                );
            }
        });

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        function advanceSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        waitForSlideImages(slides).then(() => {
            showSlide(0);

            if (slides.length > 1) {
                window.setInterval(advanceSlide, CAROUSEL_AUTOPLAY_MS);
            }
        });
    });
});

/* Toggle Dropdown Function (Global Scope) */
function toggleDropdown(event, id) {
    event.stopPropagation(); // Prevent closing immediately
    
    // Close all other dropdowns first
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var dropbtns = document.getElementsByClassName("dropdown");
    
    for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== id) {
            dropdowns[i].classList.remove('show');
        }
    }
    
    for (var i = 0; i < dropbtns.length; i++) {
        if (!dropbtns[i].contains(event.target)) {
            dropbtns[i].classList.remove('active');
        }
    }

    // Toggle current
    document.getElementById(id).classList.toggle("show");
    event.target.closest('.dropdown').classList.toggle("active");
}

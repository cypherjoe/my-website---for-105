document.addEventListener('DOMContentLoaded', () => {
    const mobileNavMql = () =>
        window.matchMedia('(max-width: 768px), (max-height: 520px) and (max-width: 1024px)');

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksEl = document.querySelector('.nav-links');

    /** Convert cloned desktop dropdowns into accordion <details> for touch-friendly mobile nav */
    function transformDropdownsToDetails(container) {
        container.querySelectorAll('.dropdown').forEach((dd) => {
            const details = document.createElement('details');
            details.className = 'mobile-nav-details';

            const summary = document.createElement('summary');
            summary.className = 'mobile-nav-details__summary';

            const btn = dd.querySelector('.dropbtn');
            const labelSpan = btn && btn.querySelector('span[data-i18n]');
            if (labelSpan) {
                summary.appendChild(labelSpan.cloneNode(true));
            } else if (btn) {
                summary.textContent = btn.textContent.replace(/\s+/g, ' ').trim();
            }

            const chev = document.createElement('span');
            chev.className = 'mobile-nav-details__chevron';
            chev.setAttribute('aria-hidden', 'true');
            summary.appendChild(chev);

            const panel = document.createElement('div');
            panel.className = 'mobile-nav-details__panel';
            const dc = dd.querySelector('.dropdown-content');
            if (dc) {
                while (dc.firstChild) {
                    panel.appendChild(dc.firstChild);
                }
            }

            details.appendChild(summary);
            details.appendChild(panel);
            dd.replaceWith(details);
        });
    }

    function buildMobileNavigation() {
        if (!navLinksEl || document.querySelector('.mobile-nav-root')) return;

        const clone = navLinksEl.cloneNode(true);
        clone.classList.add('mobile-nav-tree');
        clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
        clone.querySelectorAll('[onclick]').forEach((el) => el.removeAttribute('onclick'));

        transformDropdownsToDetails(clone);

        const homeLink = clone.querySelector('a[href]');
        if (homeLink) {
            homeLink.classList.add('mobile-nav-home');
        }

        const root = document.createElement('div');
        root.className = 'mobile-nav-root';
        root.setAttribute('aria-hidden', 'true');

        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-nav-backdrop';

        const sheet = document.createElement('div');
        sheet.className = 'mobile-nav-sheet';
        sheet.setAttribute('role', 'dialog');
        sheet.setAttribute('aria-modal', 'true');
        sheet.setAttribute('aria-labelledby', 'mobile-nav-title');

        const header = document.createElement('header');
        header.className = 'mobile-nav-sheet__header';

        const title = document.createElement('span');
        title.id = 'mobile-nav-title';
        title.className = 'mobile-nav-sheet__title';
        title.setAttribute('data-i18n', 'mobileNav.menuTitle');

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'mobile-nav-close';
        closeBtn.setAttribute('data-i18n-aria-label', 'mobileNav.close');
        closeBtn.setAttribute('aria-label', 'Close menu');
        closeBtn.innerHTML =
            '<span class="mobile-nav-close__icon" aria-hidden="true">\u2715</span>';

        header.appendChild(title);
        header.appendChild(closeBtn);

        const body = document.createElement('div');
        body.className = 'mobile-nav-sheet__scroll';
        body.appendChild(clone);

        const resumeAnchor = document.getElementById('resume-download-link');
        if (resumeAnchor) {
            const foot = document.createElement('div');
            foot.className = 'mobile-nav-sheet__footer';
            const ra = resumeAnchor.cloneNode(true);
            ra.removeAttribute('id');
            ra.classList.add('cta-button', 'secondary', 'mobile-nav-resume-cta');
            foot.appendChild(ra);
            sheet.appendChild(header);
            sheet.appendChild(body);
            sheet.appendChild(foot);
        } else {
            sheet.appendChild(header);
            sheet.appendChild(body);
        }

        root.appendChild(backdrop);
        root.appendChild(sheet);
        document.body.appendChild(root);

        syncMobileNavOverlayGeometry();

        closeBtn.addEventListener('click', () => setMobileMenuOpen(false));
        backdrop.addEventListener('click', () => setMobileMenuOpen(false));

        root.querySelectorAll('a[href]').forEach((a) => {
            a.addEventListener('click', () => setMobileMenuOpen(false));
        });

        if (typeof window.applySitewideLanguage === 'function') {
            window.applySitewideLanguage(window.getSitewideLang(), true);
        }

        window.addEventListener('load', syncMobileNavOverlayGeometry);
    }

    function syncMobileNavOverlayGeometry() {
        const root = document.querySelector('.mobile-nav-root');
        const nav = document.querySelector('.navbar');
        if (!root || !nav || !mobileNavMql().matches) return;
        const bottom = Math.ceil(nav.getBoundingClientRect().bottom);
        root.style.setProperty('--mobile-nav-overlay-top', `${bottom}px`);
    }

    function setMobileMenuOpen(open) {
        const root = document.querySelector('.mobile-nav-root');
        if (!root || !mobileMenuBtn) return;

        if (open) {
            syncMobileNavOverlayGeometry();
            window.requestAnimationFrame(() => {
                syncMobileNavOverlayGeometry();
            });
        }

        root.classList.toggle('active', open);
        root.setAttribute('aria-hidden', open ? 'false' : 'true');
        mobileMenuBtn.textContent = open ? '\u2715' : '\u2630';
        mobileMenuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('menu-open', open);

        if (open) {
            const closeEl = root.querySelector('.mobile-nav-close');
            if (closeEl) {
                window.requestAnimationFrame(() => closeEl.focus());
            }
        }
    }

    buildMobileNavigation();

    if (mobileMenuBtn && navLinksEl) {
        mobileMenuBtn.addEventListener('click', () => {
            const root = document.querySelector('.mobile-nav-root');
            if (!root) return;
            const open = !root.classList.contains('active');
            setMobileMenuOpen(open);
        });

        window.addEventListener('resize', () => {
            syncMobileNavOverlayGeometry();
            if (!mobileNavMql().matches) {
                setMobileMenuOpen(false);
            }
        });

        window.addEventListener('orientationchange', () => {
            window.setTimeout(syncMobileNavOverlayGeometry, 150);
        });

        document.addEventListener('keydown', (e) => {
            const root = document.querySelector('.mobile-nav-root');
            if (e.key === 'Escape' && root && root.classList.contains('active')) {
                setMobileMenuOpen(false);
                mobileMenuBtn.focus();
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

    // Close Dropdowns when clicking outside (desktop hover menus)
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn i')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            var dropbtns = document.getElementsByClassName('dropdown');

            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }

            for (var j = 0; j < dropbtns.length; j++) {
                dropbtns[j].classList.remove('active');
            }
        }
    };

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
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
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el) => {
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
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var dropbtns = document.getElementsByClassName('dropdown');

    for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== id) {
            dropdowns[i].classList.remove('show');
        }
    }

    for (var j = 0; j < dropbtns.length; j++) {
        if (!dropbtns[j].contains(event.target)) {
            dropbtns[j].classList.remove('active');
        }
    }

    // Toggle current
    document.getElementById(id).classList.toggle('show');
    event.target.closest('.dropdown').classList.toggle('active');
}

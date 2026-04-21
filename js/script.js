document.addEventListener('DOMContentLoaded', () => {
    const mobileNavMql = () =>
        window.matchMedia('(max-width: 768px), (max-height: 520px) and (max-width: 1024px)');

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksEl = document.querySelector('.nav-links');

    /**
     * Build mobile menu DOM by walking the real .nav-links (do not clone-then-replace dropdowns —
     * that pattern is fragile on iOS Safari). Preserves hrefs and data-i18n nodes for EN/中文.
     */
    function createMobileNavTreeFromSource(sourceEl) {
        const wrap = document.createElement('div');
        wrap.className = 'mobile-nav-tree';

        Array.from(sourceEl.children).forEach((child) => {
            if (child.tagName === 'A' && child.getAttribute('href')) {
                const a = document.createElement('a');
                a.setAttribute('href', child.getAttribute('href'));
                a.classList.add('mobile-nav-home');
                const span = child.querySelector('[data-i18n]');
                if (span) {
                    a.appendChild(span.cloneNode(true));
                } else {
                    a.textContent = child.textContent.replace(/\s+/g, ' ').trim();
                }
                wrap.appendChild(a);
                return;
            }

            if (!child.classList || !child.classList.contains('dropdown')) {
                return;
            }

            const details = document.createElement('details');
            details.className = 'mobile-nav-details';

            const summary = document.createElement('summary');
            summary.className = 'mobile-nav-details__summary';
            const lab = child.querySelector('.dropbtn span[data-i18n]');
            if (lab) {
                summary.appendChild(lab.cloneNode(true));
            } else {
                const db = child.querySelector('.dropbtn');
                summary.textContent = db ? db.textContent.replace(/\s+/g, ' ').trim() : '';
            }

            const chev = document.createElement('span');
            chev.className = 'mobile-nav-details__chevron';
            chev.setAttribute('aria-hidden', 'true');
            summary.appendChild(chev);

            const panel = document.createElement('div');
            panel.className = 'mobile-nav-details__panel';
            child.querySelectorAll('.dropdown-content a[href]').forEach((lnk) => {
                const a = document.createElement('a');
                a.setAttribute('href', lnk.getAttribute('href'));
                const sp = lnk.querySelector('[data-i18n]');
                if (sp) {
                    a.appendChild(sp.cloneNode(true));
                } else {
                    a.textContent = lnk.textContent.replace(/\s+/g, ' ').trim();
                }
                panel.appendChild(a);
            });

            details.appendChild(summary);
            details.appendChild(panel);
            wrap.appendChild(details);
        });

        return wrap;
    }

    function buildMobileNavigation() {
        if (!navLinksEl || document.querySelector('.mobile-nav-root')) return;

        const tree = createMobileNavTreeFromSource(navLinksEl);

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
        body.appendChild(tree);

        const resumeAnchor = document.getElementById('resume-download-link');
        if (resumeAnchor) {
            const foot = document.createElement('div');
            foot.className = 'mobile-nav-sheet__footer mobile-nav-sheet__footer--in-scroll';
            const ra = resumeAnchor.cloneNode(true);
            ra.removeAttribute('id');
            ra.classList.add('cta-button', 'secondary', 'mobile-nav-resume-cta');
            foot.appendChild(ra);
            body.appendChild(foot);
        }

        sheet.appendChild(header);
        sheet.appendChild(body);

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
        const rect = nav.getBoundingClientRect();
        const vh =
            window.visualViewport && typeof window.visualViewport.height === 'number'
                ? window.visualViewport.height
                : window.innerHeight;
        let bottom = Math.ceil(rect.bottom);
        bottom = Math.min(bottom, Math.max(0, vh - 8));
        bottom = Math.max(bottom, Math.ceil(rect.top) + 48);
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
    const CAROUSEL_AUTOPLAY_MS = 2300;

    function waitForSlideImages(slides) {
        return Promise.all(
            Array.from(slides).map(
                (img) =>
                    new Promise((resolve) => {
                        let settled = false;
                        const finish = () => {
                            if (settled) return;
                            settled = true;
                            resolve();
                        };
                        const safetyTimer = window.setTimeout(finish, 2500);
                        if (!(img instanceof HTMLImageElement)) {
                            window.clearTimeout(safetyTimer);
                            finish();
                            return;
                        }
                        img.loading = 'eager';
                        const done = () => {
                            window.clearTimeout(safetyTimer);
                            finish();
                        };
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
            img.addEventListener(
                'error',
                function onImgError() {
                    if (!img.dataset.caseFallbackTried && img.src) {
                        try {
                            const u = new URL(img.src);
                            const m = u.pathname.match(/^(.+\/)([^/]+)$/);
                            if (m) {
                                const fn = m[2];
                                const low = fn.toLowerCase();
                                if (fn !== low) {
                                    img.dataset.caseFallbackTried = '1';
                                    u.pathname = m[1] + low;
                                    img.src = u.href;
                                    return;
                                }
                            }
                        } catch (e) {
                            /* ignore */
                        }
                    }
                    if (fb && !img.dataset.fbFallbackTried) {
                        img.dataset.fbFallbackTried = '1';
                        img.removeEventListener('error', onImgError);
                        img.src = fb;
                    }
                },
                false
            );
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

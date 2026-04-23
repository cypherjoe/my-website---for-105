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
    const THEME_KEY = 'theme';
    const THEME_MODE_KEY = 'themeMode';

    function getTimeBasedTheme() {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        const now = new Date();
        const localHour = now.getHours();
        const isDaylightHours = localHour >= 8 && localHour < 17;

        return {
            theme: isDaylightHours ? 'light' : 'dark',
            timeZone
        };
    }

    function resolveInitialTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        const savedThemeMode = localStorage.getItem(THEME_MODE_KEY);
        const hasManualTheme = savedThemeMode === 'manual';

        if (hasManualTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            return savedTheme;
        }

        const autoTheme = getTimeBasedTheme();
        localStorage.setItem(THEME_KEY, autoTheme.theme);
        localStorage.setItem(THEME_MODE_KEY, 'auto');
        localStorage.setItem('themeTimeZone', autoTheme.timeZone);
        localStorage.setItem('themeAutoSetAt', new Date().toISOString());
        return autoTheme.theme;
    }

    const initialTheme = resolveInitialTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);
    if (themeToggle) {
        themeToggle.textContent = initialTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(THEME_KEY, newTheme);
            localStorage.setItem(THEME_MODE_KEY, 'manual');
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
    });

    if (scrollTopBtn) {
        scrollTopBtn.classList.add('visible');
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
            if (entry.target.classList.contains('section-title')) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (
                        entry.target._playHeadingEffect &&
                        entry.target.dataset.headingAnimatedInView !== 'true'
                    ) {
                        entry.target._playHeadingEffect();
                        entry.target.dataset.headingAnimatedInView = 'true';
                    }
                } else {
                    entry.target.classList.remove('visible');
                    delete entry.target.dataset.headingAnimatedInView;
                }
                return;
            }

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .section-title').forEach((el) => {
        observer.observe(el);
    });

    // Dynamic Copyright Year
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    function getFeedbackText(key) {
        const lang = document.documentElement.getAttribute('data-lang') === 'zh' ? 'zh' : 'en';
        const copy = {
            en: {
                success: 'Thank you. Your message has been received.',
                error: 'Submission failed. Please try again.',
                invalid: 'Please complete all required fields.'
            },
            zh: {
                success: '感谢您的留言，我们已收到。',
                error: '提交失败，请稍后重试。',
                invalid: '请完整填写所有必填字段。'
            }
        };
        return copy[lang][key] || copy.en[key] || '';
    }

    function initFeedbackForm() {
        const feedbackForm = document.getElementById('feedback-form');
        const feedbackStatus = document.getElementById('feedback-status');
        if (!feedbackForm || !feedbackStatus) return;
        const startedAtInput = document.getElementById('feedback-started-at');
        if (startedAtInput) {
            startedAtInput.value = new Date().toISOString();
        }

        feedbackForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            feedbackStatus.classList.remove('is-success', 'is-error');
            feedbackStatus.textContent = '';

            if (!feedbackForm.checkValidity()) {
                feedbackStatus.classList.add('is-error');
                feedbackStatus.textContent = getFeedbackText('invalid');
                return;
            }

            const submitBtn = feedbackForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
            }

            try {
                // Use FormData: feedbackForm.name is the form's own "name" attribute (string),
                // not the <input name="name"> — accessing .value on it throws and shows as submit failure.
                const fd = new FormData(feedbackForm);
                const field = (key) => String(fd.get(key) ?? '').trim();
                const payload = {
                    name: field('name'),
                    email: field('email'),
                    subject: field('subject'),
                    message: field('message'),
                    website: field('website'),
                    clientStartedAt:
                        startedAtInput && startedAtInput.value
                            ? startedAtInput.value
                            : new Date().toISOString(),
                    page: window.location.pathname,
                    language: document.documentElement.getAttribute('data-lang') || 'en',
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
                    clientTimestamp: new Date().toISOString()
                };

                const staticKey = (window.__FEEDBACK_CONFIG && window.__FEEDBACK_CONFIG.web3formsAccessKey || '').trim();
                let response;
                if (staticKey) {
                    if (payload.website) {
                        throw new Error('feedback_submit_failed');
                    }
                    response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            access_key: staticKey,
                            name: payload.name,
                            // Web3Forms enforces email format on this field.
                            // Keep it valid while preserving user-entered contact info below.
                            email: 'contact@placeholder.com',
                            subject: payload.subject,
                            message: `Contact Information: ${payload.email}\n\n${payload.message}`,
                            contact_info: payload.email,
                            from_name: payload.name,
                            page: window.location.href
                        })
                    });
                    const data = await response.json().catch(() => ({}));
                    if (!response.ok || !data.success) {
                        throw new Error((data && data.message) || 'feedback_submit_failed');
                    }
                } else {
                    response = await fetch('/api/feedback', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (!response.ok) {
                        throw new Error('feedback_submit_failed');
                    }
                }

                feedbackForm.reset();
                if (startedAtInput) {
                    startedAtInput.value = new Date().toISOString();
                }
                feedbackStatus.classList.add('is-success');
                feedbackStatus.textContent = getFeedbackText('success');
            } catch (error) {
                feedbackStatus.classList.add('is-error');
                feedbackStatus.textContent = getFeedbackText('error');
            } finally {
                if (startedAtInput && !startedAtInput.value) {
                    startedAtInput.value = new Date().toISOString();
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
            }
        });
    }

    window.addEventListener('sitewideLangChange', () => {
        const feedbackStatus = document.getElementById('feedback-status');
        if (!feedbackStatus || !feedbackStatus.textContent) return;
        if (feedbackStatus.classList.contains('is-success')) {
            feedbackStatus.textContent = getFeedbackText('success');
            return;
        }
        if (feedbackStatus.classList.contains('is-error')) {
            feedbackStatus.textContent = getFeedbackText('error');
        }
    });

    initFeedbackForm();

    function initHeroTyping() {
        const heroText = document.querySelector('.typing-text');
        if (!heroText) return;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (heroText._typingTimer) {
            clearInterval(heroText._typingTimer);
            heroText._typingTimer = null;
        }
        if (heroText._heroObserver) {
            heroText._heroObserver.disconnect();
            heroText._heroObserver = null;
        }

        const text = heroText.textContent.trim();
        if (!text) return;
        heroText._fullHeroText = text;

        function playHeroTyping() {
            if (heroText._typingTimer) {
                clearInterval(heroText._typingTimer);
                heroText._typingTimer = null;
            }

            if (prefersReducedMotion) {
                heroText.textContent = heroText._fullHeroText;
                return;
            }

            heroText.textContent = '';
            let i = 0;
            const timer = setInterval(() => {
                if (i < heroText._fullHeroText.length) {
                    heroText.textContent += heroText._fullHeroText.charAt(i);
                    i += 1;
                    return;
                }
                clearInterval(timer);
                heroText._typingTimer = null;
            }, 90);
            heroText._typingTimer = timer;
        }

        heroText.textContent = heroText._fullHeroText;
        heroText._playHeadingEffect = playHeroTyping;
        delete heroText.dataset.headingAnimatedInView;

        const heroObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (heroText.dataset.headingAnimatedInView !== 'true') {
                            playHeroTyping();
                            heroText.dataset.headingAnimatedInView = 'true';
                        }
                    } else {
                        delete heroText.dataset.headingAnimatedInView;
                    }
                });
            },
            { threshold: 0.35 }
        );
        heroObserver.observe(heroText);
        heroText._heroObserver = heroObserver;
    }

    function initSectionTitleEffects() {
        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles.length === 0) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function applyTitleTyping(title) {
            const fullText = title._fullTitleText || title.textContent.trim();
            if (!fullText) return;
            if (title._typingTimer) {
                clearInterval(title._typingTimer);
                title._typingTimer = null;
            }
            title.textContent = '';
            title.classList.add('is-typing');

            let i = 0;
            const speedMs = 34;
            const timer = setInterval(() => {
                if (i < fullText.length) {
                    title.textContent += fullText.charAt(i);
                    i += 1;
                    return;
                }
                clearInterval(timer);
                title._typingTimer = null;
                title.classList.remove('is-typing');
            }, speedMs);

            title._typingTimer = timer;
        }

        sectionTitles.forEach((title) => {
            if (!title) return;

            // Stop any in-flight typing before restarting (e.g., language switch).
            if (title._typingTimer) {
                clearInterval(title._typingTimer);
                title._typingTimer = null;
            }
            const fullText = title.textContent.trim();
            if (!fullText) return;
            title._fullTitleText = fullText;
            delete title.dataset.headingAnimatedInView;

            title.classList.add('fancy-title');
            title._playHeadingEffect = function () {
                if (prefersReducedMotion) {
                    title.textContent = title._fullTitleText;
                    title.classList.remove('is-typing');
                    return;
                }
                applyTitleTyping(title);
            };

            if (!title.classList.contains('fade-in')) {
                title._playHeadingEffect();
                title.dataset.headingAnimatedInView = 'true';
            }
        });
    }

    function boldNumbersInDescriptions() {
        const descriptionNodes = document.querySelectorAll('.text-placeholder p');
        if (descriptionNodes.length === 0) return;

        // ONLY these phrases (EN + CN where the site uses different wording). Disambiguated where bare
        // words would match the wrong page.
        const highlights = [
            // Law firms
            'JS Law',
            'over 60 clients',
            'RMB 3 million',
            'Temporary Restraining Order (TRO) alerts',
            'Temporary Restraining Order（TRO）预警',
            'Freshfields LLP',
            'seven major IPO',
            'conducted over 30 onsite',
            'more than 20 complex',
            'drafted over 10 U.S.-side',
            '超过 60 名客户',
            '人民币 300 万元',
            '七项大型 IPO',
            '开展逾 30 场现场',
            '翻译逾 20 份',
            '撰写逾 10 章',
            // Legal clinic
            '5+ preliminary',
            '5 份以上初步',
            'four 400-people client groups',
            '4 个各约 400 人的客户群',
            'five case groups',
            '5 个案件组律师',
            'six events',
            '6 场活动',
            '200+ participants',
            '超过 200 人',
            // LAWASIA
            'two 40-page legal memos',
            'six 20-minute oral presentations',
            'fourth place',
            '第四名',
            '“Best Endeavor Prize.”',
            '"Best Endeavor Prize."',
            'Best Endeavor Prize',
            '两份约 40 页的法律备忘录',
            '六场约 20 分钟的口头陈述',
            // Translator
            '30+ translation works',
            '5+ simultaneous interpretation',
            '30 余项笔译工作',
            '5 余次同声传译需求',
            'CEO of Maidalyu',
            '首席执行官',
            // English teaching
            '(USTF) at CUHK-Shenzhen',
            '作为港中深本科生教学助理（USTF）',
            '3 hours',
            '3 小时',
            'one-on-one',
            '一对一',
            'Stepping Stones China',
            '22 fifth-grade',
            '22 名五年级',
            // Public speaking
            '60 hours of speech',
            '超过 60 小时演讲',
            '30+ weekly sessions',
            '30 余周的常规训练',
            '7 provincial medals',
            '7 枚省级奖牌',
            '3 national medals',
            '3 枚国家级奖牌',
            // Peer mentoring
            '6 freshmen',
            '6 名新生',
            'e.g.,',
            '训练（如',
            '活动（如',
            '200-person workshop',
            '约 200 人参与',
            '20+ events',
            '20 余场活动',
            'Peer Med',
            // Law society (avoid “one of”, “two English”, “five Environmental”, etc.)
            'two professional school application talks',
            'one "mock case" workshop',
            'one career talk',
            '200+ members',
            '200+ 名成员',
            '两场法学院申请分享会',
            '一场“模拟案件”工作坊',
            '一场由大湾区律师参与的职业发展分享会',
            // UNC Exchange
            'Media Law',
            'First Amendment',
            'Environmental Law',
            'Sports Law',
            'Summer Research Assistant',
            '暑期研究助理岗位',
            // Algae Shield / GSC
            '“Algae Shield”',
            '"Algae Shield"',
            '5000-word',
            '5000 词英文方案书',
            'Financial Statements',
            '英文财务报表',
            '5-minute Phase One',
            '5 分钟创意介绍视频',
            '2-minute concise',
            '2 分钟精炼路演视频',
            'First Prize',
            '一等奖',
            '2027',
            '2030',
            // Short stories & publications
            'Berkeley Fiction Review',
            'Journal of Education, Humanities and Social Sciences'
        ];

        const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        function buildStrictPattern(phrase) {
            const escaped = escapeRegex(phrase);
            const startsAsciiWord = /^[A-Za-z0-9]/.test(phrase);
            const endsAsciiWord = /[A-Za-z0-9]$/.test(phrase);
            const leftGuard = startsAsciiWord ? '(?<![A-Za-z0-9])' : '';
            const rightGuard = endsAsciiWord ? '(?![A-Za-z0-9])' : '';
            return new RegExp(`${leftGuard}${escaped}${rightGuard}`, 'gi');
        }

        const highlightPatterns = highlights
            .slice()
            .sort((a, b) => b.length - a.length)
            .map((phrase) => buildStrictPattern(phrase));

        descriptionNodes.forEach((node) => {
            // Preserve existing inline links inserted via i18n/static HTML.
            if (node.querySelector('a')) return;
            const sourceText = node.textContent;
            if (!sourceText) return;
            let formattedText = sourceText;
            highlightPatterns.forEach((pattern) => {
                formattedText = formattedText.replace(pattern, '<strong>$&</strong>');
            });
            node.innerHTML = formattedText;
        });
    }

    initHeroTyping();
    initSectionTitleEffects();
    boldNumbersInDescriptions();
    window.addEventListener('sitewideLangChange', () => {
        initHeroTyping();
        initSectionTitleEffects();
        boldNumbersInDescriptions();
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

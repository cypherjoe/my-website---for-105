(function () {
    'use strict';

    var STORAGE_KEY = 'lang';

    var T = {
        en: {
            'nav.logo': 'Joe ZHANG',
            'nav.home': 'Home',
            'nav.experiences': 'Experiences',
            'nav.activities': 'Activities',
            'nav.projects': 'Projects',
            'nav.exp.lawFirms': 'Law Firms',
            'nav.exp.legalClinic': 'Legal Clinic',
            'nav.exp.lawasia': 'LAWASIA Moot',
            'nav.exp.translator': 'Translator',
            'nav.act.publicSpeaking': 'Public Speaking Team',
            'nav.act.studentCoach': 'Student Coach',
            'nav.act.lawSociety': 'Law Society',
            'nav.act.uncExchange': 'UNC Exchange',
            'nav.proj.gsc': 'Global Sustainability Challenge',
            'nav.proj.shortStories': 'Short Stories',
            'nav.proj.publications': 'Publications',
            'nav.proj.videos': 'Videos',
            'footer.chinaLabel': 'China:',
            'footer.usLabel': 'US:',
            'footer.uncEmailLabel': 'UNC Email:',
            'footer.cuhkEmailLabel': 'CUHKSZ Email:',
            'footer.copyright': 'Zhiqiu (Joe) ZHANG. All rights reserved.',
            'common.backHome': 'Back to Home',
            'common.getInTouch': 'Get In Touch',
            'common.downloadResume': 'Download Resume',
            'common.emailPrefix': 'Email: ',
            'theme.titleLight': 'Switch to Dark Mode',
            'theme.titleDark': 'Switch to Light Mode',
            'lang.ariaToZh': 'Switch to Chinese',
            'lang.ariaToEn': 'Switch to English',
            'meta.index': 'Zhiqiu (Joe) ZHANG',
            'meta.lawFirms': 'Law Firms | Zhiqiu (Joe) ZHANG',
            'meta.legalClinic': 'Legal Clinic | Zhiqiu (Joe) ZHANG',
            'meta.lawasia': 'LAWASIA Moot | Zhiqiu (Joe) ZHANG',
            'meta.translator': 'Translator | Zhiqiu (Joe) ZHANG',
            'meta.publicSpeaking': 'Public Speaking Team | Zhiqiu (Joe) ZHANG',
            'meta.studentCoach': 'Student Coach | Zhiqiu (Joe) ZHANG',
            'meta.lawSociety': 'Law Society | Zhiqiu (Joe) ZHANG',
            'meta.uncExchange': 'UNC Exchange | Zhiqiu (Joe) ZHANG',
            'meta.gsc': 'Global Sustainability Challenge | Zhiqiu (Joe) ZHANG',
            'meta.shortStories': 'Short Stories | Zhiqiu (Joe) ZHANG',
            'meta.publications': 'Publications | Zhiqiu (Joe) ZHANG',
            'meta.videos': 'Videos | Zhiqiu (Joe) ZHANG',
            'index.heroHeading': 'About',
            'index.heroBody': 'Zhiqiu (Joe) Zhang is pursuing a BA in Legal Communication at The Chinese University of Hong Kong, Shenzhen. Before formal legal training, he independently handled an insurance contract dispute on behalf of a close family member against Dentons LLP. He managed client interviews, evidence collection, pleadings, court appearances, and negotiations. The case concluded with full recovery of RMB 829,346.84. Joe aims to apply to law school in a common law jurisdiction, and act as a bridge between China and the world.',
            'index.contactHeading': 'Get In Touch',
            'index.headshotAlt': 'Zhiqiu (Joe) ZHANG',
            'lawFirms.body': 'As a legal intern, I have developed a strong foundation in both cross-border litigation and global transactions. At JS Law, I managed e-commerce litigation defense by coordinating due diligence for over 60 clients, helping secure more than RMB 3 million in settlements across Guangzhou and Shenzhen while mitigating international risk through daily Temporary Restraining Order (TRO) alerts based on U.S. court updates. I subsequently transitioned to the Global Transactions – Equity Capital Market group at Freshfields LLP, where I contributed to seven major IPO projects. In this role, I conducted over 30 onsite third-party due diligence interviews, translated more than 20 complex regulatory documents, and drafted over 10 U.S.-side prospectus chapters in English, demonstrating my ability to navigate complex, multi-jurisdictional legal environments.',
            'lawFirms.ipoHeading': 'HK IPOs Contributed:',
            'legalClinic.body': 'Independently drafted 5+ legal memos on administrative appeals (work injuries), cross-border AI startup (IP registration), contractual disputes (lease contracts, loan agreements), and tort cases (pet harm). Responsible for marketing, logistics, and admin issues in the Clinic; created weekly sign-up forms for consultation; coordinated time slots of lawyers; facilitated liaison between on-campus students, the Law Society, the Entrepreneurship Club, and the Clinic.',
            'lawasia.body': 'Drafted two 40-page legal memos for simulated international arbitration cases. Collected industry-specific data (e.g., bioenergy production processes, pollution control standards). Presented six 20-minute oral submission rounds, handling arbitrary but tough questions from judges, and assisted my leading counsel to present rebuttals in real-time.',
            'translator.p1': 'As a translator, I focused on faithful meaning across languages—preserving tone, technical terms, and cultural context so the final text reads naturally to its audience. Projects included academic, professional, and general-audience material where precision mattered as much as readability.',
            'translator.p2': 'Translation reinforced skills that overlap with legal work: close reading, consistency, and an instinct for when a literal rendering would mislead. It also strengthened my ability to serve as a bridge between Chinese and English communication settings.',
            'pst.body': 'Led and taught weekly practice sessions covering structures of making good presentations, including the Toulmin Model, the Rogerian Model, the STAR model, etc. Directed over 60 hours of speech training across 30+ weekly sessions, coaching the school\'s entire advancing team and yielding seven provincial medals and THREE national medals.',
            'studentCoach.body': 'Mentored six freshmen, led a 200-person workshop on how to improve English language and get used to the English-taught classes, and coordinated 20+ events for six team members (badminton & board game night, cook-out, 1-on-1 meetings).',
            'lawSociety.body': 'Founded and co-chaired the first law society in CUHK-Shenzhen. Organized student-led initiatives that build community among future lawyers—talks, mentorship, and events that connect classroom ideas to practice. Liason with law firms, law schools, and previous alum practicing law.',
            'unc.body': 'Took upper level classes in Environmental Law, Media Law, Sports Law, English Speaking and Writing. Participated in PeerMed mentoring program; joined the UNC Golf Club; promoted Chinese food to American friends.',
            'gsc.body': 'Responsible for analyzing legal challenges, constructing legal frameworks of the solution, and future financial statements. Independently produced: 1) English write-up, 2) China and America legal analysis report, 3) English language Financial Statements; Collaboratively produced: 1) English Language Poster for professional exhibition/discussion, 2) one 5-minute Phase One idea introduction video, and 3) one Phase Two 2-minute concise pitch video.',
            'shortStories.body': 'While my professional legal background focuses on navigating complex global transactions and cross-border litigation, my creative writing explores the human narratives caught within rigid social systems. Through original short fiction like "Fire Is the Devil\'s Only Friend" and "Have You Seen the Stars", I examine the intersections of personal grief, institutional pressure, and adolescent resilience. I am also proud to have my work slated for upcoming publication in Issue 47 of the Berkeley Fiction Review in Spring 2027.',
            'publications.body': 'As a junior law student, my research explores the evolving intersections of constitutional rights, technological governance, and international regulation. My writing aims to bridge traditional legal doctrines with complex contemporary challenges—ranging from the nuances of symbolic speech to the legal frameworks governing semiconductor export controls and AI. Recently, my paper \'Freedom of Speech and National Pride: Flag Desecration in the United States\' was published in the Journal of Education, Humanities and Social Sciences. By analyzing landmark Supreme Court rulings, the article examines the constitutional tension between preserving national symbolism and protecting First Amendment rights. Whether drafting comprehensive legal memos for international arbitration or analyzing federal search powers, my ongoing scholarship is driven by a commitment to rigorous, objective analysis of the law.',
            'videos.v1Title': 'Algae Shield | Global Sustainability Challenge',
            'videos.v1Body': 'This pitch video presents a sustainable technology solution to the severe microplastic pollution generated by the food delivery industry. Our team proposed an innovative alternative: replacing conventional plastic linings with a fully biodegradable sodium alginate coating that prevents microplastics from leaching into hot food and beverages. For this project, I spearheaded the problem analysis and market feasibility research. My work focused on evaluating the global scope of microplastic pollution and analyzing how foreign markets are regulating and solving this crisis. I then localized this research, ensuring our proposed solution strategically aligned with China\'s domestic legal frameworks, environmental policies, and cost structures. This project allowed me to bridge my legal scholarship with environmental innovation, demonstrating how emerging sustainability technologies must navigate complex regulatory landscapes to become viable realities.',
            'videos.v2Title': 'This was Not in the Profile | Short Film',
            'videos.v2Body': 'Stepping outside of academic research and policy analysis, I co-created and acted in this short film. This was Not in the Profile explores the unpredictable, highly awkward dynamics of modern setups, following a blind date that takes a disastrously strange turn. Collaborating on the creative direction and performing on screen was a hands-on exercise in narrative pacing, visual storytelling, and comedic timing. Working on this project was a highly rewarding opportunity to exercise a completely different facet of communication, showcasing that effective storytelling relies just as much on humor and character as it does on rigorous analysis.',
            'alt.lf1': 'Law Firms 1',
            'alt.lf2': 'Law Firms 2',
            'alt.lf3': 'Law Firms 3',
            'alt.lf4': 'Law Firms 4',
            'alt.lf5': 'Law Firms 5',
            'alt.lc1': 'Legal Clinic',
            'alt.lc2': 'Legal Clinic',
            'alt.la1': 'LAWASIA 1',
            'alt.la2': 'LAWASIA 2',
            'alt.la3': 'LAWASIA 3',
            'alt.la4': 'LAWASIA 4',
            'alt.la5': 'LAWASIA 5',
            'alt.la6': 'LAWASIA 6',
            'alt.la7': 'LAWASIA 7',
            'alt.tr1': 'Translator 1',
            'alt.tr2': 'Translator 2',
            'alt.tr3': 'Translator 3',
            'alt.pst1': 'Public Speaking Team 1',
            'alt.pst2': 'Public Speaking Team 2',
            'alt.pst3': 'Public Speaking Team 3',
            'alt.sc1': 'Student Coach 1',
            'alt.sc2': 'Student Coach 2',
            'alt.sc3': 'Student Coach 3',
            'alt.ls1': 'Law Society 1',
            'alt.ls2': 'Law Society 2',
            'alt.ls3': 'Law Society 3',
            'alt.unc1': 'UNC Exchange 1',
            'alt.unc2': 'UNC Exchange 2',
            'alt.unc3': 'UNC Exchange 3',
            'alt.gsc1': 'Global Sustainability Challenge poster',
            'alt.gsc2': 'Global Sustainability Challenge',
            'alt.gsc3': 'Global Sustainability Challenge',
            'alt.gsc4': 'Global Sustainability Challenge',
            'alt.ss1': 'Short story — Berkeley',
            'alt.ss2': 'Short story',
            'alt.ss3': 'Short story',
            'alt.pub1': 'Publication'
        },
        zh: {
            'nav.logo': '张知秋',
            'nav.home': '首页',
            'nav.experiences': '经历',
            'nav.activities': '活动',
            'nav.projects': '项目',
            'nav.exp.lawFirms': '律师事务所',
            'nav.exp.legalClinic': '法律诊所',
            'nav.exp.lawasia': 'LAWASIA国际模拟法庭',
            'nav.exp.translator': '翻译',
            'nav.act.publicSpeaking': '演讲队',
            'nav.act.studentCoach': '学长计划导师',
            'nav.act.lawSociety': '法律学会',
            'nav.act.uncExchange': 'UNC 交换',
            'nav.proj.gsc': '全球可持续发展挑战赛',
            'nav.proj.shortStories': '短篇小说',
            'nav.proj.publications': '发表',
            'nav.proj.videos': '视频',
            'footer.chinaLabel': '中国：',
            'footer.usLabel': '美国：',
            'footer.uncEmailLabel': 'UNC 邮箱：',
            'footer.cuhkEmailLabel': '港中深邮箱：',
            'footer.copyright': '张知秋。保留所有权利。',
            'common.backHome': '返回首页',
            'common.getInTouch': '联系我',
            'common.downloadResume': '下载简历',
            'common.emailPrefix': '邮箱：',
            'theme.titleLight': '切换深色模式',
            'theme.titleDark': '切换浅色模式',
            'lang.ariaToZh': '切换到中文',
            'lang.ariaToEn': 'Switch to English',
            'meta.index': '张知秋',
            'meta.lawFirms': '律师事务所 | 张知秋',
            'meta.legalClinic': '法律诊所 | 张知秋',
            'meta.lawasia': 'LAWASIA国际模拟法庭 | 张知秋',
            'meta.translator': '翻译 | 张知秋',
            'meta.publicSpeaking': '演讲队 | 张知秋',
            'meta.studentCoach': '学长计划导师 | 张知秋',
            'meta.lawSociety': '法律学会 | 张知秋',
            'meta.uncExchange': 'UNC 交换 | 张知秋',
            'meta.gsc': '全球可持续发展挑战赛 | 张知秋',
            'meta.shortStories': '短篇小说 | 张知秋',
            'meta.publications': '发表 | 张知秋',
            'meta.videos': '视频 | 张知秋',
            'index.heroHeading': '关于',
            'index.heroBody': '张知秋就读于香港中文大学（深圳）英语法律学士学位项目。在正式接受法律训练之前，他曾独立代理一位近亲属与大成律师事务所的保险合同纠纷，负责客户访谈、证据收集、诉状、出庭与谈判。案件最终以全额收回人民币 829,346.84 元结案。张知秋希望申请普通法法域的法学院，并在中国与世界之间担任桥梁。',
            'index.contactHeading': '联系我',
            'index.headshotAlt': '张知秋',
            'lawFirms.body': '作为法律实习生，我在跨境诉讼与全球交易两方面都打下了扎实基础。在 JS Law，我负责电商诉讼防御，协调超过 60 名客户的尽职调查，帮助在广州与深圳合计取得超过人民币 300 万元的和解，同时依据美国法院动态每日推送 Temporary Restraining Order（TRO）预警以管控跨境风险。随后我转入 Freshfields LLP 全球交易部 Equity Capital Market 团队，参与七项大型 IPO 项目：开展逾 30 场现场第三方尽职调查访谈，翻译逾 20 份复杂监管文件，并以英文撰写逾 10 章美国侧招股书内容，展现了在复杂多法域环境中工作的能力。',
            'lawFirms.ipoHeading': '参与撰稿的港股 IPO：',
            'legalClinic.body': '独立撰写 5 份以上法律备忘录，主题涵盖行政申诉（工伤）、跨境 AI 初创（IP 注册）、合同纠纷（租赁、借贷）以及侵权（宠物伤害）。负责诊所的市场、后勤与行政事务；制作每周咨询报名表；协调律师档期；在校内学生、法律学会、创业俱乐部与诊所之间联络对接。',
            'lawasia.body': '为模拟国际仲裁案件撰写两份各约 40 页的法律备忘录；收集行业数据（如生物能源流程、污染控制标准）；完成六轮各约 20 分钟的口头陈述，应对仲裁员尖锐提问，并协助主辩律师实时作反驳陈述。',
            'translator.p1': '作为译者，我注重在语言之间忠实传达含义——保留语气、技术术语与文化语境，使译文对目标读者自然可读。项目涵盖学术、专业与大众材料，在可读性与精确度上同样要求严格。',
            'translator.p2': '翻译也强化了与法律工作相通的能力：细读、一致性，以及判断直译是否会误导的直觉；并进一步锻炼我在中英文沟通场景之间担任桥梁的能力。',
            'pst.body': '主持并教授每周训练，讲解优质演讲的结构，包括 Toulmin Model、Rogerian Model、STAR model 等。在 30 余周、累计超过 60 小时的演讲培训中指导校队晋级选手，率队获得七枚省级奖牌与三枚全国奖牌。',
            'studentCoach.body': '指导六名大一新生；面向约 200 人主讲如何提升英语并适应全英文授课；为六名队员协调 20 余场活动（羽毛球与桌游夜、户外烧烤、一对一面谈等）。',
            'lawSociety.body': '发起并联合主持港中深首个法律学会；组织由学生主导的社群活动，连接未来法律人——讲座、导师计划与活动，把课堂理念与实践联系起来；并与律所、法学院及已执业的校友联络对接。',
            'unc.body': '修读环境法、媒体法、体育法以及英语口语与写作等高阶课程；参加 PeerMed 导师项目；加入 UNC Golf Club；向美国同学推广中餐。',
            'gsc.body': '负责分析法律挑战、搭建解决方案的法律框架以及未来财务报表。独立完成：1）英文文稿，2）中美法律分析报告，3）英文财务报表；协作完成：1）用于专业展览与讨论的英文海报，2）第一阶段约 5 分钟创意介绍视频，3）第二阶段约 2 分钟精炼路演视频。',
            'shortStories.body': '我的专业法律背景侧重处理复杂的全球交易与跨境诉讼，而文学创作则关注刚性社会结构中的人性叙事。在 "Fire Is the Devil\'s Only Friend" 与 "Have You Seen the Stars" 等原创短篇中，我探讨个人悲痛、制度压力与少年韧性之间的交织。我也很荣幸作品将于 2027 年春季刊登于 Berkeley Fiction Review 第 47 期。',
            'publications.body': '作为低年级法律学生，我的研究关注宪法权利、技术治理与国际规制的交汇演变。写作力求在传统法理与当代难题之间建立桥梁——从象征性言论的细微之处，到规管半导体出口管制与 AI 的法律框架。近期，论文《Freedom of Speech and National Pride: Flag Desecration in the United States》发表于 Journal of Education, Humanities and Social Sciences：通过分析 landmark Supreme Court 判例，讨论在维护国家象征与保护 First Amendment 权利之间的宪法张力。无论是为国际仲裁撰写全面的法律备忘录，还是分析联邦搜查权，我的学术工作都坚持严谨、客观的法律分析。',
            'videos.v1Title': 'Algae Shield | Global Sustainability Challenge',
            'videos.v1Body': '这支路演视频提出以可持续技术应对外卖行业造成的严重微塑料污染。团队建议以可完全生物降解的海藻酸钠涂层替代传统塑料内衬，减少热食热饮中微塑料的溶出。我在项目中牵头问题分析与市场可行性研究：评估微塑料污染的全球范围，并梳理海外市场的监管与应对方案；在此基础上做本土化，使方案与中国国内法律框架、环境政策与成本结构相匹配。项目让我把法律研究与环境创新结合起来，说明新兴可持续技术如何在复杂的监管环境中落地。',
            'videos.v2Title': 'This was Not in the Profile | Short Film',
            'videos.v2Body': '走出学术研究与政策分析之外，我联合创作并参演了这部短片。This was Not in the Profile 以一次灾难性翻车的相亲为线索，呈现当代「介绍认识」里难以预料的尴尬与张力。参与创作方向与镜头前表演，是一次关于叙事节奏、影像叙事与喜剧节奏的实操练习；也让我展示有效叙事同样依赖幽默与人物，而不仅是严谨分析。',
            'alt.lf1': '律师事务所 1',
            'alt.lf2': '律师事务所 2',
            'alt.lf3': '律师事务所 3',
            'alt.lf4': '律师事务所 4',
            'alt.lf5': '律师事务所 5',
            'alt.lc1': '法律诊所',
            'alt.lc2': '法律诊所',
            'alt.la1': 'LAWASIA国际模拟法庭 1',
            'alt.la2': 'LAWASIA国际模拟法庭 2',
            'alt.la3': 'LAWASIA国际模拟法庭 3',
            'alt.la4': 'LAWASIA国际模拟法庭 4',
            'alt.la5': 'LAWASIA国际模拟法庭 5',
            'alt.la6': 'LAWASIA国际模拟法庭 6',
            'alt.la7': 'LAWASIA国际模拟法庭 7',
            'alt.tr1': '翻译 1',
            'alt.tr2': '翻译 2',
            'alt.tr3': '翻译 3',
            'alt.pst1': '演讲队 1',
            'alt.pst2': '演讲队 2',
            'alt.pst3': '演讲队 3',
            'alt.sc1': '学长计划导师 1',
            'alt.sc2': '学长计划导师 2',
            'alt.sc3': '学长计划导师 3',
            'alt.ls1': '法律学会 1',
            'alt.ls2': '法律学会 2',
            'alt.ls3': '法律学会 3',
            'alt.unc1': 'UNC 交换 1',
            'alt.unc2': 'UNC 交换 2',
            'alt.unc3': 'UNC 交换 3',
            'alt.gsc1': '全球可持续发展挑战赛海报',
            'alt.gsc2': '全球可持续发展挑战赛',
            'alt.gsc3': '全球可持续发展挑战赛',
            'alt.gsc4': '全球可持续发展挑战赛',
            'alt.ss1': '短篇小说 — Berkeley',
            'alt.ss2': '短篇小说',
            'alt.ss3': '短篇小说',
            'alt.pub1': '发表'
        }
    };

    function getLang() {
        var s = localStorage.getItem(STORAGE_KEY);
        if (s === 'zh' || s === 'en') return s;
        return 'en';
    }

    function tr(lang, key) {
        var table = T[lang] || T.en;
        var fallback = T.en[key];
        return table[key] !== undefined ? table[key] : (fallback !== undefined ? fallback : key);
    }

    function applyLanguage(lang, silent) {
        if (lang !== 'en' && lang !== 'zh') lang = 'en';
        var prevLang = document.documentElement.getAttribute('data-lang');
        document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
        document.documentElement.setAttribute('data-lang', lang);
        localStorage.setItem(STORAGE_KEY, lang);

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (!key) return;

            var text = tr(lang, key);

            var tag = el.tagName;
            if (tag === 'TITLE') {
                document.title = text;
                return;
            }
            if (tag === 'IMG') {
                el.alt = text;
                return;
            }

            if (el.getAttribute('data-i18n-html') === 'true') {
                el.innerHTML = text;
                return;
            }

            el.textContent = text;
        });

        updateLangSwitchUI(lang);
        updateResumeDownloadLink(lang);

        refreshThemeToggleTitle();
        if (!silent && prevLang !== lang) {
            window.dispatchEvent(new CustomEvent('sitewideLangChange', { detail: { lang: lang } }));
        }
    }

    function updateResumeDownloadLink(lang) {
        var a = document.getElementById('resume-download-link');
        if (!a) return;
        if (lang === 'zh') {
            a.setAttribute('href', 'assets/resume-zh.pdf');
            a.setAttribute('download', 'resume-zh.pdf');
        } else {
            a.setAttribute('href', 'assets/resume.pdf');
            a.setAttribute('download', 'resume.pdf');
        }
    }

    function updateLangSwitchUI(lang) {
        document.querySelectorAll('.lang-switch-btn').forEach(function (btn) {
            var L = btn.getAttribute('data-lang');
            var active = L === lang;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            if (active) {
                btn.setAttribute('aria-current', 'true');
            } else {
                btn.removeAttribute('aria-current');
            }
        });
    }

    function refreshThemeToggleTitle() {
        var themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;
        var lang = getLang();
        var theme = document.documentElement.getAttribute('data-theme') || 'light';
        var key = theme === 'dark' ? 'theme.titleDark' : 'theme.titleLight';
        themeToggle.setAttribute('title', tr(lang, key));
    }

    window.refreshThemeToggleTitle = refreshThemeToggleTitle;
    window.applySitewideLanguage = applyLanguage;
    window.getSitewideLang = getLang;

    document.addEventListener('DOMContentLoaded', function () {
        applyLanguage(getLang(), true);

        document.querySelectorAll('.lang-switch-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var lang = btn.getAttribute('data-lang');
                if (lang === 'en' || lang === 'zh') {
                    applyLanguage(lang, false);
                }
            });
        });
    });
})();

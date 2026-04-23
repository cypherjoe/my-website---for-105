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
            'nav.exp.englishTeaching': 'English Teaching',
            'nav.act.publicSpeaking': 'Public Speaking Team',
            'nav.act.studentCoach': 'Peer Mentoring',
            'nav.act.lawSociety': 'Law Society',
            'nav.act.uncExchange': 'UNC Exchange',
            'nav.proj.gsc': 'Algae Shield',
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
            'common.emailPrefix': 'Contact Information: ',
            'theme.titleLight': 'Switch to Dark Mode',
            'theme.titleDark': 'Switch to Light Mode',
            'lang.ariaToZh': 'Switch to Chinese',
            'lang.ariaToEn': 'Switch to English',
            'mobileNav.menuTitle': 'Menu',
            'mobileNav.close': 'Close menu',
            'meta.index': 'Zhiqiu (Joe) ZHANG',
            'meta.lawFirms': 'Law Firms | Zhiqiu (Joe) ZHANG',
            'meta.legalClinic': 'Legal Clinic | Zhiqiu (Joe) ZHANG',
            'meta.lawasia': 'LAWASIA Moot | Zhiqiu (Joe) ZHANG',
            'meta.translator': 'Translator | Zhiqiu (Joe) ZHANG',
            'meta.englishTeaching': 'English Teaching | Zhiqiu (Joe) ZHANG',
            'meta.publicSpeaking': 'Public Speaking Team | Zhiqiu (Joe) ZHANG',
            'meta.studentCoach': 'Peer Mentoring | Zhiqiu (Joe) ZHANG',
            'meta.lawSociety': 'Law Society | Zhiqiu (Joe) ZHANG',
            'meta.uncExchange': 'UNC Exchange | Zhiqiu (Joe) ZHANG',
            'meta.gsc': 'Algae Shield | Zhiqiu (Joe) ZHANG',
            'meta.shortStories': 'Short Stories | Zhiqiu (Joe) ZHANG',
            'meta.publications': 'Publications | Zhiqiu (Joe) ZHANG',
            'meta.videos': 'Videos | Zhiqiu (Joe) ZHANG',
            'index.heroHeading': 'About',
            'index.heroBody': 'Zhiqiu (Joe) Zhang is pursuing a BA in Legal Communication at The Chinese University of Hong Kong, Shenzhen. Before formal legal training, he independently handled an insurance contract dispute on behalf of a close family member against a big company called Sino Life Insurance Co., Ltd. represented by a big law firm called Dentons LLP. He managed client interviews, evidence collection, pleadings, court appearances, and negotiations. The case concluded with Joe winning big: his client got full recovery of RMB 829,346.84. Joe aims to apply to a law school in a common law jurisdiction, and act as a bridge between China and the world.',
            'index.quotesHeading': 'Favorite Quotes',
            'index.quote1.text': '"Prosperous lawyers, prosperous nation."',
            'index.quote1.author': '-- Prof. Jiang Ping',
            'index.quote2.text': '"Law is governmental social control."',
            'index.quote2.author': '-- Prof. Donald Black',
            'index.contactHeading': 'Get In Touch',
            'index.headshotAlt': 'Zhiqiu (Joe) ZHANG',
            'lawFirms.body': 'As a legal intern, I have developed a strong foundation in both cross-border litigation and global transactions. At <a href="https://www.jslawglobe.com/index.html" class="prose-inline-link" target="_blank" rel="noopener noreferrer">JS Law</a>, I managed e-commerce litigation defense by coordinating due diligence for over 60 clients, helping secure more than RMB 3 million in settlements across Guangzhou and Shenzhen while mitigating international risk through daily Temporary Restraining Order (TRO) alerts based on U.S. court updates.',
            'lawFirms.body2': 'I subsequently transitioned to the Global Transactions - Equity Capital Market group at <a href="https://www.freshfields.com/en/capabilities/practices/capital-markets/equity-capital-markets" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Freshfields LLP</a>, where I contributed to seven HKEX Main Board IPO projects. In this role, I conducted over 30 onsite third-party due diligence interviews, translated more than 20 complex regulatory documents, and drafted over 10 U.S.-side prospectus chapters in English, demonstrating my ability to navigate complex, multi-jurisdictional legal environments.',
            'lawFirms.ipoHeading': 'HKEX IPOs Contributed:',
            'legalClinic.body': 'I provided pro bono legal services at the Clinic under the supervision of Mr. Zhicheng (Joey) Li, currently an associate at Luo Huanping Law Office (Guangzhou). Throughout the past year, I drafted 5+ preliminary legal memos on administrative appeals (e.g., work injuries), cross-border AI startups (e.g., IP registration in Mainland China and Hong Kong), contractual disputes (e.g., lease contracts, loan agreements), and tort cases (e.g., pet harm, personal injuries, car accidents).',
            'legalClinic.body2': 'I am also responsible for marketing, logistics, and administrative work at the Clinic. I created weekly consultation sign-up forms for four 400-people client groups. I coordinated the time slots of lawyers in five case groups. I facilitated liaison among on-campus students, the Law Society, the Business School\'s Entrepreneurship Club, and the Clinic. Together, I have facilitated six events as of April 2026 with a total of 200+ participants.',
            'lawasia.body': 'I was one of the three Oralists on the team. I was responsible for Issue 3&4 of the case, tackling proximate cause arguments and injunction/damages/standing issues. I drafted two 40-page legal memos (<a href="https://lawasiamoot.org/wp-content/uploads/2024/09/MY2413-C.pdf" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Document 1</a> / <a href="https://lawasiamoot.org/wp-content/uploads/2024/09/MY2413-R.pdf" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Document 2</a>) for simulated international arbitration cases. I also collected industry-specific data <a href="../projects/global-sustainability-challenge.html" class="prose-inline-link">(e.g., bioenergy production processes, pollution control standards)</a>. During the <a href="https://lawasiamoot.org/national-round-2/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">LAWASIA Moot</a>, I delivered six 20-minute <a href="../activities/public-speaking-team.html" class="prose-inline-link">oral presentations</a>, handled challenging questions from active judges and partners, and gave real-time rebuttals to opposing counsel. Eventually, our team won fourth place and was awarded the “Best Endeavor Prize.”',
            'translator.p1': 'As a student translator at Diligentia College, I was responsible for proofreading, modifying, and translating the most urgent and important documents, including the keynote speaker’s slides for the High Table Dinner. Throughout my three-year contribution to the college, I have completed 30+ translation works and 5+ simultaneous interpretation needs.',
            'translator.p2': 'During my internship at <a href="https://www.jslawglobe.com/index.html" class="prose-inline-link" target="_blank" rel="noopener noreferrer">JS Law</a>, I was responsible for translating our client’s Stock Keeping Unit (SKU) descriptions, scrutinizing them to compare them with registered Intellectual Properties (IPs), before assisting with motion drafting. Further, I served as a simultaneous translator for the CEO of Maidalyu (the AI Temporary Restraining Order platform) and a Partner of <a href="https://www.jslawglobe.com/index.html" class="prose-inline-link" target="_blank" rel="noopener noreferrer">JS Law</a> during business meetings and livestreaming events.',
            'englishTeaching.body': 'As an Undergraduate Student Teaching Fellow (USTF) at CUHK-Shenzhen, I was responsible for a Self-Access Language Learning Center (SALL) activity called “Oral English Practice.” Every week, I tutor for 3 hours, one-on-one, to help students improve their oral English. My "clients" include UG Y1-2 students for ENG presentations, UG Y3-4 students for TOEFL/IELTS speaking, and PG students for academic presentations and interviews.',
            'englishTeaching.body2': 'Beginning in March 2026, I was appointed a Sole Instructor at <a href="https://www.steppingstones.cn/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Stepping Stones China</a>, a non-profit that provides high-quality English-language education to children in underdeveloped areas of China. Currently, I teach English (with a strong focus on speaking and vocabulary) to 22 fifth-grade Chinese students from Nan\'an, Fujian.',
            'pst.body': 'I led and taught weekly practice sessions covering the structures of effective presentations, including the Toulmin Model, the Rogerian Model, the STAR Model, etc. I directed over 60 hours of speech training across 30+ weekly sessions, coaching the school\'s entire advancing team, yielding 7 provincial medals and 3 national medals.',
            'studentCoach.body': 'Over the past two years, I mentored 6 freshmen during their first year at CUHK-Shenzhen. They major in various fields: legal studies, clinical medicine, translation studies, and accounting. I linked them with my friends and professors in their respective fields, and I provided both practical training (e.g., how to build a resume, where to find job posts) and conceptual mentorship (a timeline for grad school applications, what to do with life).',
            'studentCoach.body2': 'In addition to individual mentoring, I led a 200-person workshop on improving English and getting accustomed to English-taught classes, and coordinated 20+ events (e.g., a badminton tournament, board game night, Sichuanese food cookout, and 1-on-1 meetings).',
            'studentCoach.body3': 'Starting in April 2026, leveraging my past mentoring experience, I will be in a new position at Peer Med, a student organization focused on pre-med mentorship at <a href="https://www.unc.edu/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">UNC-Chapel Hill</a>, under the supervision of Dr. Bradley Hammer. I am responsible for preparing pre-law/pre-professional/pre-policy track students and Chinese international students to thrive in a top-tier American institution.',
            'lawSociety.body': 'I founded and co-chaired the very first Law Society in CUHK-Shenzhen. I organized student-led initiatives that fostered a close-knit community among future lawyers, including talks, mentorship, and events that connected classroom ideas to practice. I liaised with law firms, law schools, and previous alumni practicing law. As of April 2026, the Law Society has held two professional school application talks (with speakers from HKU JD, CUHK JD, Peking School of Transnational Law, etc.), one "mock case" workshop, and one career talk with a panel of lawyers in the Greater Bay Area. I proudly served the Law Society alongside eight standing committee members. We now have 200+ members in both Undergraduate and Graduate levels.',
            'unc.body': 'I took upper-level law classes during my Exchange year at <a href="https://www.unc.edu/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">UNC-Chapel Hill</a>. I spent one year in Media Law, learning the basics of First Amendment legal issues and delving deeper into emerging AI Law, with intersections with IP Law/Criminal Law/Surveillance/Taiwan-China-US Relations. I also took Environmental Law and Sports Law, and earned the Summer Research Assistant position for Prof. Donald Hornstein at UNC Law. Furthermore, I improved my English Speaking and writing through two English classes, learning storytelling and medical English. On top of that, I participated in the Peer Med mentoring program, joined the UNC Golf Club, and promoted Chinese food to American friends.',
            'gsc.body': 'Collaborating with five Environmental Science/Biochemistry students at Beijing Normal-Hong Kong Baptist University (Zhuhai), we developed a thin layer called “Algae Shield” to address current concerns about microplastics in plastic cups. I was responsible for analyzing legal challenges, developing legal frameworks for solutions, and preparing future financial statements. I independently produced: 1) the 5000-word English proposal, 2) the China and America legal challenges and feasibility report, 3) the English language Financial Statements. Alongside my teammates, I collaboratively produced: 1) an English Language Poster for professional exhibition/discussion, 2) one 5-minute Phase One idea introduction video, and 3) one Phase Two 2-minute concise pitch video. Eventually, our team advanced to the Asia-Pacific Regional Finals of the <a href="https://www.globalsustainabilitychallenge.org/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Global Sustainability Challenge</a> and won the First Prize at Zhejiang University in February 2026. We planned to continue the lab experiments, aiming for an on-campus prototype in 2027 and large-scale commercialization in Zhuhai before 2030.',
            'shortStories.body': 'While my professional legal background focuses on navigating complex global transactions and cross-border litigation, my creative writing explores the human narratives caught within rigid social systems. Through original short fiction like "Fire Is the Devil\'s Only Friend" and "Have You Seen the Stars", I examine the intersections of personal grief, institutional pressure, and adolescent resilience. I am also proud to have my work slated for upcoming publication in Issue 47 of the <a href="https://berkeleyfictionreview.org/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Berkeley Fiction Review</a> in Spring 2027.',
            'publications.body': 'As a junior law student, my research explores the evolving intersections of constitutional rights, technological governance, and international regulation. My writing aims to bridge traditional legal doctrines with complex contemporary challenges—ranging from the nuances of symbolic speech to the legal frameworks governing semiconductor export controls and AI. Recently, my paper \'Freedom of Speech and National Pride: Flag Desecration in the United States\' was published in the <a href="https://jehss.net/index.php/ojs/article/view/31" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Journal of Education, Humanities and Social Sciences</a>. By analyzing landmark Supreme Court rulings, the article examines the constitutional tension between preserving national symbolism and protecting First Amendment rights. Whether drafting comprehensive legal memos for international arbitration or analyzing federal search powers, my ongoing scholarship is driven by a commitment to rigorous, objective analysis of the law.',
            'videos.v1Title': 'Algae Shield | Global Sustainability Challenge',
            'videos.v1Body': 'This pitch video presents a sustainable technology solution to the severe microplastic pollution generated by the food delivery industry. Our team proposed an innovative alternative: replacing conventional plastic linings with a fully biodegradable sodium alginate coating that prevents microplastics from leaching into hot food and beverages. For this project, I spearheaded the problem analysis and market feasibility research. My work focused on evaluating the global scope of microplastic pollution and analyzing how foreign markets are regulating and solving this crisis. I then localized this research, ensuring our proposed solution strategically aligned with China\'s domestic legal frameworks, environmental policies, and cost structures. This project allowed me to bridge my legal scholarship with environmental innovation, demonstrating how emerging sustainability technologies must navigate complex regulatory landscapes to become viable realities.',
            'videos.v2Title': 'This was Not in the Profile | Short Film',
            'videos.v2Body': 'Stepping outside of academic research and policy analysis, I co-created and acted in this short film. This was Not in the Profile explores the unpredictable, highly awkward dynamics of modern setups, following a blind date that takes a disastrously strange turn. Collaborating on the creative direction and performing on screen was a hands-on exercise in narrative pacing, visual storytelling, and comedic timing. Working on this project was a highly rewarding opportunity to exercise a completely different facet of communication, showcasing that effective storytelling relies just as much on humor and character as it does on rigorous analysis.',
            'videos.openOnYoutube': 'Open on YouTube',
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
            'alt.tr1': 'Translator 1',
            'alt.tr2': 'Translator 2',
            'alt.tr3': 'Translator 3',
            'alt.et1': 'English Teaching 1',
            'alt.et2': 'English Teaching 2',
            'alt.et3': 'English Teaching 3',
            'alt.pst1': 'Public Speaking Team 1',
            'alt.pst2': 'Public Speaking Team 2',
            'alt.pst3': 'Public Speaking Team 3',
            'alt.sc1': 'Student Coach 1',
            'alt.sc2': 'Student Coach 2',
            'alt.sc3': 'Student Coach 3',
            'alt.ls1': 'Law Society 1',
            'alt.ls2': 'Law Society 2',
            'alt.unc1': 'UNC Exchange 1',
            'alt.unc2': 'UNC Exchange 2',
            'alt.unc3': 'UNC Exchange 3',
            'alt.gsc1': 'Global Sustainability Challenge poster',
            'alt.gsc2': 'Global Sustainability Challenge',
            'alt.gsc3': 'Global Sustainability Challenge',
            'alt.ss1': 'Short story — Berkeley',
            'alt.ss2': 'Short story',
            'alt.ss3': 'Short story',
            'alt.pub1': 'Publication',
            'feedback.nameLabel': 'Your Name',
            'feedback.emailLabel': 'Contact Information',
            'feedback.subjectLabel': 'Subject',
            'feedback.messageLabel': 'Message',
            'feedback.submit': 'Send Message',
            'feedback.status.success': 'Thank you. Your message has been received.',
            'feedback.status.error': 'Submission failed. Please try again.',
            'feedback.status.invalid': 'Please complete all required fields.'
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
            'nav.exp.englishTeaching': '英语教学',
            'nav.act.publicSpeaking': '演讲队',
            'nav.act.studentCoach': '朋辈导师计划',
            'nav.act.lawSociety': '法律学会',
            'nav.act.uncExchange': 'UNC 交换',
            'nav.proj.gsc': 'Algae Shield',
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
            'common.emailPrefix': '联系方式：',
            'theme.titleLight': '切换深色模式',
            'theme.titleDark': '切换浅色模式',
            'lang.ariaToZh': '切换到中文',
            'lang.ariaToEn': 'Switch to English',
            'mobileNav.menuTitle': '菜单',
            'mobileNav.close': '关闭菜单',
            'meta.index': '张知秋',
            'meta.lawFirms': '律师事务所 | 张知秋',
            'meta.legalClinic': '法律诊所 | 张知秋',
            'meta.lawasia': 'LAWASIA国际模拟法庭 | 张知秋',
            'meta.translator': '翻译 | 张知秋',
            'meta.englishTeaching': '英语教学 | 张知秋',
            'meta.publicSpeaking': '演讲队 | 张知秋',
            'meta.studentCoach': '朋辈导师计划 | 张知秋',
            'meta.lawSociety': '法律学会 | 张知秋',
            'meta.uncExchange': 'UNC 交换 | 张知秋',
            'meta.gsc': 'Algae Shield | 张知秋',
            'meta.shortStories': '短篇小说 | 张知秋',
            'meta.publications': '发表 | 张知秋',
            'meta.videos': '视频 | 张知秋',
            'index.heroHeading': '关于',
            'index.heroBody': '张知秋就读于香港中文大学（深圳）英语法律学士学位项目。在正式接受法律训练之前，他曾独立代理一位近亲属与一家名为 Sino Life Insurance Co., Ltd. 的大型保险公司之间的保险合同纠纷（该公司由大型律所 Dentons LLP 代理），负责客户访谈、证据收集、诉状、出庭与谈判。案件结果是张知秋大获全胜：他的当事人全额追回人民币 829,346.84 元。张知秋希望申请普通法法域的一所法学院，并在中国与世界之间担任桥梁。',
            'index.quotesHeading': '我最喜欢的两句话',
            'index.quote1.text': '“律师兴则国家兴”',
            'index.quote1.author': '-- 江平教授',
            'index.quote2.text': '“法律是政府的社会控制”',
            'index.quote2.author': '-- 唐纳德•布莱克教授',
            'index.contactHeading': '联系我',
            'index.headshotAlt': '张知秋',
            'lawFirms.body': '作为法律实习生，我在跨境诉讼与全球交易两方面都打下了扎实基础。在 <a href="https://www.jslawglobe.com/index.html" class="prose-inline-link" target="_blank" rel="noopener noreferrer">JS Law</a>，我负责电商诉讼防御，协调超过 60 名客户的尽职调查，帮助在广州与深圳合计取得超过人民币 300 万元的和解，同时依据美国法院动态每日推送 Temporary Restraining Order（TRO）预警以管控跨境风险。',
            'lawFirms.body2': '随后我转入 <a href="https://www.freshfields.com/en/capabilities/practices/capital-markets/equity-capital-markets" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Freshfields LLP</a> 全球交易部 Equity Capital Market 团队，参与七项大型 IPO 项目：开展逾 30 场现场第三方尽职调查访谈，翻译逾 20 份复杂监管文件，并以英文撰写逾 10 章美国侧招股书内容，展现了在复杂多法域环境中工作的能力。',
            'lawFirms.ipoHeading': '参与撰稿的港股 IPO：',
            'legalClinic.body': '在目前任职于广州罗欢平律师事务所的李志诚（Joey）律师指导下，我在诊所提供公益法律服务。过去一年里，我独立撰写 5 份以上初步法律备忘录，主题涵盖行政申诉（工伤）、跨境 AI 初创（中国内地与香港 IP 注册）、合同纠纷（租赁、借贷）以及侵权案件（宠物伤害、人身伤害、交通事故）。',
            'legalClinic.body2': '我也负责诊所的市场推广、后勤与行政工作；为 4 个各约 400 人的客户群制作每周咨询报名表；协调 5 个案件组律师的时间安排；并在校内学生、法律学会、商学院创业俱乐部与诊所之间进行联络对接。截至 2026 年 4 月，我共协助完成 6 场活动，累计参与人数超过 200 人。',
            'lawasia.body': '我在团队中担任三位 Oralists 之一，负责案件第 3 与第 4 项争议，重点处理近因（proximate cause）论证，以及禁令/损害赔偿/诉讼资格等问题。我为模拟国际仲裁案件撰写了两份约 40 页的法律备忘录（<a href="https://lawasiamoot.org/wp-content/uploads/2024/09/MY2413-C.pdf" class="prose-inline-link" target="_blank" rel="noopener noreferrer">文档 1</a> / <a href="https://lawasiamoot.org/wp-content/uploads/2024/09/MY2413-R.pdf" class="prose-inline-link" target="_blank" rel="noopener noreferrer">文档 2</a>），并收集行业专项资料<a href="../projects/global-sustainability-challenge.html" class="prose-inline-link">（如生物能源生产流程、污染控制标准）</a>。在 <a href="https://lawasiamoot.org/national-round-2/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">LAWASIA Moot</a> 比赛期间，我完成了六场约 20 分钟的<a href="../activities/public-speaking-team.html" class="prose-inline-link">口头陈述</a>，回应评委法官与律所合伙人的高强度提问，并对对方律师进行实时反驳。最终，我们团队获得第四名，并获颁“Best Endeavor Prize”。',
            'translator.p1': '在学勤书院担任学生译者期间，我负责校内最紧急、最重要文件的校对、修改与翻译工作，其中包括年度高桌晚宴主旨演讲嘉宾的幻灯片。在为书院持续贡献的三年中，我累计完成 30 余项笔译工作与 5 余次同声传译需求。',
            'translator.p2': '在 <a href="https://www.jslawglobe.com/index.html" class="prose-inline-link" target="_blank" rel="noopener noreferrer">JS Law</a> 实习期间，我负责翻译客户的商品简介，并将其与已注册的知识产权逐项比对审查，随后协助起草动议文件。此外，我还在商务会议与直播活动中担任同声传译，为“卖大律”（AI TRO预警平台）首席执行官与 <a href="https://www.jslawglobe.com/index.html" class="prose-inline-link" target="_blank" rel="noopener noreferrer">JS Law</a> 合伙人提供中英口译支持。',
            'englishTeaching.body': '作为港中深本科生教学助理（USTF），我负责 Self-Access Language Learning Center（SALL）中的 “Oral English Practice” 项目。每周我进行 3 小时一对一辅导，帮助学生提升英语口语能力。我的“学员”包括：为 ENG 课堂展示做准备的本科一、二年级学生；备考 TOEFL/IELTS 口语的本科三、四年级学生；以及准备学术汇报和面试的研究生。',
            'englishTeaching.body2': '自 2026 年 3 月起，我被任命为 <a href="https://www.steppingstones.cn/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Stepping Stones China</a> 的独立授课老师。该公益组织致力于为中国欠发达地区儿童提供高质量英语教育。目前，我为来自福建南安的 22 名五年级中国学生教授英语（重点训练口语与词汇）。',
            'pst.body': '我每周主持并教授训练，系统讲解高效演讲的结构，包括 Toulmin Model、Rogerian Model、STAR Model 等。我在 30 余周的常规训练中累计组织超过 60 小时演讲培训，面向校队全体晋级队员开展指导，最终取得 7 枚省级奖牌与 3 枚国家级奖牌。',
            'studentCoach.body': '在过去两年里，我在港中深新生第一学年期间持续指导 6 名新生，专业覆盖法律、临床医学、翻译与会计等方向。我将他们与各自领域中的朋友与教授建立联系，并提供实践层面的训练（如如何制作简历、在哪里寻找实习与招聘信息）和观念层面的长期辅导（如研究生申请时间线、人生方向规划）。',
            'studentCoach.body2': '除一对一辅导外，我还主讲了一场约 200 人参与的英语提升与全英文课程适应工作坊，并协调组织了 20 余场活动（如羽毛球比赛、桌游夜、川菜聚餐和一对一交流）。',
            'studentCoach.body3': '自 2026 年 4 月起，基于过往导师经验，我将在 <a href="https://www.unc.edu/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">UNC-Chapel Hill</a> 的 Peer Med 开启新岗位，并在 Dr. Bradley Hammer 指导下开展工作。该组织专注于 pre-med 导师辅导；我将负责帮助 pre-law/pre-professional/pre-policy 方向学生以及中国国际学生在美国顶尖高校中实现更好发展。',
            'lawSociety.body': '我发起并联合主持了港中深首个法律学会。我组织了由学生主导的系列活动，围绕未来法律人社群建设开展讲座、导师计划与实践活动，将课堂中的法律概念与现实场景连接起来。我也负责与律所、法学院及从事法律实务的往届校友保持联络。截至 2026 年 4 月，法律学会已举办两场法学院申请分享会（嘉宾来自 HKU JD、CUHK JD、北京大学国际法学院等）、一场“模拟案件”工作坊，以及一场由大湾区律师参与的职业发展分享会。我与 8 位常委共同服务法律学会。目前，我们在本科与研究生层面共有 200+ 名成员。',
            'unc.body': '在 <a href="https://www.unc.edu/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">UNC-Chapel Hill</a> 交换期间，我修读了多门高阶法律课程。我在 Media Law 课程中学习了 First Amendment（第一修正案）相关核心议题，并进一步深入新兴 AI Law 方向，涉及与 IP Law/Criminal Law/Surveillance/Taiwan-China-US Relations 的交叉问题。我也修读了 Environmental Law 与 Sports Law，并获得 UNC Law Donald Hornstein 教授的暑期研究助理岗位。此外，我通过两门英语课程持续提升英语口语与写作能力，学习叙事写作与医学英语。除此之外，我参加了 Peer Med 导师项目、加入 UNC Golf Club，并向美国朋友推广中国美食。',
            'gsc.body': '我与北京师范大学-香港浸会大学联合国际学院（珠海）五位环境科学/生物化学方向同学合作，开发了一种名为“Algae Shield”的薄层材料，用以回应当前塑料杯微塑料问题。我主要负责分析法律挑战、构建解决方案的法律框架，并准备未来财务报表。我独立完成了：1）5000 词英文方案书，2）中美法律挑战与可行性分析报告，3）英文财务报表。与队友协作方面，我们共同完成了：1）用于专业展示/讨论的英文海报，2）一支第一阶段 5 分钟创意介绍视频，3）一支第二阶段 2 分钟精炼路演视频。最终，团队晋级 <a href="https://www.globalsustainabilitychallenge.org/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Global Sustainability Challenge</a> 亚太区域总决赛，并于 2026 年 2 月在浙江大学获得一等奖。后续我们计划继续实验室实验，目标是在 2027 年形成校内原型，并于 2030 年前在珠海实现规模化商业落地。',
            'shortStories.body': '我的专业法律背景侧重处理复杂的全球交易与跨境诉讼，而文学创作则关注刚性社会结构中的人性叙事。在 "Fire Is the Devil\'s Only Friend" 与 "Have You Seen the Stars" 等原创短篇中，我探讨个人悲痛、制度压力与少年韧性之间的交织。我也很荣幸作品将于 2027 年春季刊登于 <a href="https://berkeleyfictionreview.org/" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Berkeley Fiction Review</a> 第 47 期。',
            'publications.body': '作为低年级法律学生，我的研究关注宪法权利、技术治理与国际规制的交汇演变。写作力求在传统法理与当代难题之间建立桥梁——从象征性言论的细微之处，到规管半导体出口管制与 AI 的法律框架。近期，论文《Freedom of Speech and National Pride: Flag Desecration in the United States》发表于 <a href="https://jehss.net/index.php/ojs/article/view/31" class="prose-inline-link" target="_blank" rel="noopener noreferrer">Journal of Education, Humanities and Social Sciences</a>：通过分析 landmark Supreme Court 判例，讨论在维护国家象征与保护 First Amendment 权利之间的宪法张力。无论是为国际仲裁撰写全面的法律备忘录，还是分析联邦搜查权，我的学术工作都坚持严谨、客观的法律分析。',
            'videos.v1Title': 'Algae Shield | Global Sustainability Challenge',
            'videos.v1Body': '这支路演视频提出以可持续技术应对外卖行业造成的严重微塑料污染。团队建议以可完全生物降解的海藻酸钠涂层替代传统塑料内衬，减少热食热饮中微塑料的溶出。我在项目中牵头问题分析与市场可行性研究：评估微塑料污染的全球范围，并梳理海外市场的监管与应对方案；在此基础上做本土化，使方案与中国国内法律框架、环境政策与成本结构相匹配。项目让我把法律研究与环境创新结合起来，说明新兴可持续技术如何在复杂的监管环境中落地。',
            'videos.v2Title': 'This was Not in the Profile | Short Film',
            'videos.v2Body': '走出学术研究与政策分析之外，我联合创作并参演了这部短片。This was Not in the Profile 以一次灾难性翻车的相亲为线索，呈现当代「介绍认识」里难以预料的尴尬与张力。参与创作方向与镜头前表演，是一次关于叙事节奏、影像叙事与喜剧节奏的实操练习；也让我展示有效叙事同样依赖幽默与人物，而不仅是严谨分析。',
            'videos.openOnYoutube': '在 YouTube 打开',
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
            'alt.tr1': '翻译 1',
            'alt.tr2': '翻译 2',
            'alt.tr3': '翻译 3',
            'alt.et1': '英语教学 1',
            'alt.et2': '英语教学 2',
            'alt.et3': '英语教学 3',
            'alt.pst1': '演讲队 1',
            'alt.pst2': '演讲队 2',
            'alt.pst3': '演讲队 3',
            'alt.sc1': '学长计划导师 1',
            'alt.sc2': '学长计划导师 2',
            'alt.sc3': '学长计划导师 3',
            'alt.ls1': '法律学会 1',
            'alt.ls2': '法律学会 2',
            'alt.unc1': 'UNC 交换 1',
            'alt.unc2': 'UNC 交换 2',
            'alt.unc3': 'UNC 交换 3',
            'alt.gsc1': '全球可持续发展挑战赛海报',
            'alt.gsc2': '全球可持续发展挑战赛',
            'alt.gsc3': '全球可持续发展挑战赛',
            'alt.ss1': '短篇小说 — Berkeley',
            'alt.ss2': '短篇小说',
            'alt.ss3': '短篇小说',
            'alt.pub1': '发表',
            'feedback.nameLabel': '您的姓名',
            'feedback.emailLabel': '联系方式',
            'feedback.subjectLabel': '主题',
            'feedback.messageLabel': '留言',
            'feedback.submit': '发送留言',
            'feedback.status.success': '感谢您的留言，我们已收到。',
            'feedback.status.error': '提交失败，请稍后重试。',
            'feedback.status.invalid': '请完整填写所有必填字段。'
        }
    };

    function getSavedLang() {
        var s = localStorage.getItem(STORAGE_KEY);
        if (s === 'zh' || s === 'en') return s;
        return null;
    }

    function inferLangFromCountryCode(countryCode) {
        var c = (countryCode || '').toUpperCase();
        if (c === 'CN' || c === 'HK' || c === 'TW') return 'zh';
        return 'en';
    }

    function detectLangBySystem() {
        var raw = '';
        if (navigator.languages && navigator.languages.length > 0) {
            raw = navigator.languages[0];
        } else if (navigator.language) {
            raw = navigator.language;
        }
        raw = (raw || '').toLowerCase();
        if (!raw) return null;
        if (raw.indexOf('zh') === 0) return 'zh';
        if (raw.indexOf('en') === 0) return 'en';
        return null;
    }

    function fetchJsonWithTimeout(url, timeoutMs) {
        return new Promise(function (resolve, reject) {
            var done = false;
            var timer = setTimeout(function () {
                if (done) return;
                done = true;
                reject(new Error('timeout'));
            }, timeoutMs);

            fetch(url, { cache: 'no-store' })
                .then(function (resp) {
                    if (!resp.ok) throw new Error('http_' + resp.status);
                    return resp.json();
                })
                .then(function (json) {
                    if (done) return;
                    done = true;
                    clearTimeout(timer);
                    resolve(json);
                })
                .catch(function (err) {
                    if (done) return;
                    done = true;
                    clearTimeout(timer);
                    reject(err);
                });
        });
    }

    function detectLangByIP() {
        var providers = [
            {
                url: 'https://ipwho.is/',
                pickCountry: function (data) {
                    return data && data.country_code;
                }
            },
            {
                url: 'https://ipapi.co/json/',
                pickCountry: function (data) {
                    return data && data.country_code;
                }
            }
        ];

        var idx = 0;
        function tryNext() {
            if (idx >= providers.length) return Promise.resolve('en');
            var provider = providers[idx++];
            return fetchJsonWithTimeout(provider.url, 2500)
                .then(function (data) {
                    return inferLangFromCountryCode(provider.pickCountry(data));
                })
                .catch(function () {
                    return tryNext();
                });
        }

        return tryNext();
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

        document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
            var akey = el.getAttribute('data-i18n-aria-label');
            if (akey) {
                el.setAttribute('aria-label', tr(lang, akey));
            }
        });

        updateLangSwitchUI(lang);
        updateResumeDownloadLink(lang);

        refreshThemeToggleTitle();
        if (!silent && prevLang !== lang) {
            window.dispatchEvent(new CustomEvent('sitewideLangChange', { detail: { lang: lang } }));
        }
    }

    function updateResumeDownloadLink(lang) {
        function swapResumePdf(el) {
            if (!el) return;
            var href = el.getAttribute('href');
            if (!href || href.indexOf('resume') === -1) return;
            if (lang === 'zh') {
                el.setAttribute('href', href.replace(/resume\.pdf(\?|$)/i, 'resume-zh.pdf$1'));
                el.setAttribute('download', 'resume-zh.pdf');
            } else {
                el.setAttribute('href', href.replace(/resume-zh\.pdf(\?|$)/i, 'resume.pdf$1'));
                el.setAttribute('download', 'resume.pdf');
            }
        }

        swapResumePdf(document.getElementById('resume-download-link'));
        document.querySelectorAll('.mobile-nav-resume-cta').forEach(swapResumePdf);
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
        var lang = document.documentElement.getAttribute('data-lang') || getSavedLang() || 'en';
        var theme = document.documentElement.getAttribute('data-theme') || 'light';
        var key = theme === 'dark' ? 'theme.titleDark' : 'theme.titleLight';
        themeToggle.setAttribute('title', tr(lang, key));
    }

    window.refreshThemeToggleTitle = refreshThemeToggleTitle;
    window.applySitewideLanguage = applyLanguage;
    window.getSitewideLang = function () {
        return document.documentElement.getAttribute('data-lang') || getSavedLang() || 'en';
    };

    document.addEventListener('DOMContentLoaded', function () {
        var savedLang = getSavedLang();
        if (savedLang) {
            applyLanguage(savedLang, true);
        } else {
            var systemLang = detectLangBySystem();
            if (systemLang) {
                applyLanguage(systemLang, true);
            } else {
                detectLangByIP().then(function (autoLang) {
                    applyLanguage(autoLang, true);
                });
            }
        }

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

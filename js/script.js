document.addEventListener('DOMContentLoaded', () => {
    // JSが有効であることを示すクラスをbodyに付与
    document.body.classList.remove('js-disabled');

    // Scroll Animation (Fade Up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // CTA Button Link Management
    // 正式な相談URLが決まり次第、空文字からURLに変更してください。
    // 例: const CONSULT_URL = 'https://example.com/contact';
    const CONSULT_URL = ''; 
    
    const ctaBtns = document.querySelectorAll('.js-cta-btn');
    const ctaNotes = document.querySelectorAll('.js-cta-note');

    if (CONSULT_URL && CONSULT_URL.trim() !== '') {
        // URLが設定されている場合
        ctaBtns.forEach(btn => {
            btn.href = CONSULT_URL;
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
            btn.textContent = '講師養成について相談する';
        });
        ctaNotes.forEach(note => {
            note.style.display = 'none';
        });
    } else {
        // URLが未設定（準備中）の場合
        ctaBtns.forEach(btn => {
            btn.href = '#summary'; // 募集概要セクションへアンカーリンク
            btn.textContent = '養成内容・受講料を見る';
        });
        ctaNotes.forEach(note => {
            note.textContent = '※相談受付は準備中です';
            note.style.display = 'block';
        });
    }

    // Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    // 同じページ内リンクならスムーズスクロール
                    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
});

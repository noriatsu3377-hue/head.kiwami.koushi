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

    // Application State Management
    // 受付状態を一箇所で管理します。
    // status: 'preparing' (準備中) | 'open' (受付中) | 'closed' (受付終了)
    const APPLICATION_URL = '';
    const APPLICATION_STATUS = 'preparing'; 
    
    const appBtns = document.querySelectorAll('.js-app-btn');
    const appNotes = document.querySelectorAll('.js-app-note');

    appBtns.forEach(btn => {
        const loc = btn.getAttribute('data-loc');
        
        if (APPLICATION_STATUS === 'open') {
            // 受付中
            if (APPLICATION_URL) {
                btn.href = APPLICATION_URL;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
            }
            btn.textContent = '講師養成に申し込む';
            btn.style.display = 'inline-flex';
            btn.classList.remove('is-disabled');
            
        } else if (APPLICATION_STATUS === 'closed') {
            // 受付終了
            btn.href = 'javascript:void(0)';
            btn.removeAttribute('target');
            btn.removeAttribute('rel');
            btn.textContent = '募集は終了しました';
            btn.style.display = 'inline-flex';
            btn.classList.add('is-disabled');
            
        } else {
            // 準備中 (preparing)
            btn.href = '#summary';
            btn.removeAttribute('target');
            btn.removeAttribute('rel');
            if (loc === 'hero') {
                btn.textContent = '養成内容・受講料を見る';
                btn.style.display = 'inline-flex';
            } else if (loc === 'summary') {
                btn.style.display = 'none';
            } else if (loc === 'bottom') {
                btn.textContent = '募集概要を確認する';
                btn.style.display = 'inline-flex';
            }
        }
    });

    appNotes.forEach(note => {
        if (APPLICATION_STATUS === 'open') {
            note.style.display = 'none';
        } else if (APPLICATION_STATUS === 'closed') {
            note.style.display = 'none';
        } else {
            note.textContent = '※申込フォームは準備中です';
            note.style.display = 'block';
        }
    });

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

document.addEventListener('DOMContentLoaded', () => {
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
    // 相談導線のリンクを一元管理（現在は準備中のためダミー）
    const CONSULT_URL = 'javascript:void(0);'; // 正式なURLが決まり次第ここを変更
    
    const contactBtn = document.getElementById('contact-btn');
    if(contactBtn && CONSULT_URL !== 'javascript:void(0);') {
        contactBtn.href = CONSULT_URL;
        contactBtn.target = '_blank';
        contactBtn.rel = 'noopener noreferrer';
    } else if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('現在、窓口の準備中です。詳細が決定次第ご案内いたします。');
        });
    }

    // Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

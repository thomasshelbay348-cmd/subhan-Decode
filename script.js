window.addEventListener("load", () => {
    // Force page to start at top on reload
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const animations = [
        { selector: ".top-tags", class: "from-top", delay: 0 },
        { selector: ".left h1", class: "from-left", delay: 0.1 },
        { selector: ".desc", class: "from-left", delay: 0.2 },
        { selector: ".live-line", class: "from-bottom", delay: 0.3 },
        { selector: ".buttons", class: "zoom-in", delay: 0.4 },
        { selector: ".site-link", class: "from-bottom", delay: 0.5 },
        { selector: ".right", class: "from-right", delay: 0.2 },
        { selector: ".stats", class: "from-bottom", delay: 0.6 },
    ];

    animations.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            el.style.animationDelay = `${item.delay}s`;
            el.classList.add(item.class);
        }
    });

    // ===== HIDE INTRO =====
    setTimeout(() => {
        const intro = document.getElementById("intro");
        const site = document.getElementById("real-site");

        intro.classList.add("smooth-out");

        setTimeout(() => {
            intro.style.display = "none";
            site.style.display = "block";
            initScrollAnimations();
            initTypewriter();
        }, 600);
    }, 1800);
});


// ===============================
// TYPEWRITER EFFECT (HERO H1)
// ===============================
function initTypewriter() {
    const h1 = document.querySelector(".info-home h1");
    if (!h1) return;
    
    const text = h1.innerText;
    h1.innerText = "";
    h1.classList.add("typewriter");
    
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            h1.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, 100); // typing speed
        }
    }
    
    setTimeout(typeChar, 400); // delay before typing starts
}

// ===============================
// SCROLL REVEAL (SECTIONS)
// ===============================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right, .slide-in-up"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translate(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
}


// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".ul-list li");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");

        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// ===============================
let isScrolling = false;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        if (isScrolling) return;
        isScrolling = true;

        const href = this.getAttribute("href");
        const target = document.querySelector(href);

        if (target) {
            const header = document.querySelector("header");
            const headerHeight = header ? header.offsetHeight : 0;
            const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight - 20;

            window.scrollTo({
                top: Math.max(0, targetTop),
                behavior: "smooth"
            });

            // Debounce: prevent rapid re-clicks causing glitches
            setTimeout(() => { isScrolling = false; }, 600);
        } else {
            isScrolling = false;
        }
    });
});

// ===============================
// EMAILJS CONTACT FORM SUBMISSION
// ===============================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const btn = this.querySelector('button[type="submit"]');
        const originalBtnText = btn.innerText;
        btn.innerText = 'Sending...';

        emailjs.sendForm('service_wvrxwp7', 'template_3lcksxl', this)
            .then(() => {
                btn.innerText = 'Message Sent!';
                this.reset();
                alert('Email successfully sent !');
                setTimeout(() => { btn.innerText = originalBtnText; }, 3000);
            }, (error) => {
                btn.innerText = 'Failed to Send';
                console.error('FAILED...', error);
                alert('Email sent failed!!!');
                setTimeout(() => { btn.innerText = originalBtnText; }, 3000);
            });
    });
}


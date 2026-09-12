window.addEventListener("load", () => {
    // Force page to start at top on reload
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const animations = [
        { selector: ".top-tags", class: "from-top", delay: 0 },
        { selector: ".left h1", class: "from-left", delay: 0.3 },
        { selector: ".desc", class: "from-left", delay: 0.6 },
        { selector: ".live-line", class: "from-bottom", delay: 0.9 },
        { selector: ".buttons", class: "zoom-in", delay: 1.2 },
        { selector: ".site-link", class: "from-bottom", delay: 1.5 },
        { selector: ".right", class: "from-right", delay: 0.6 },
        { selector: ".stats", class: "from-bottom", delay: 1.8 },
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
        }, 1200);
    }, 3800);
});


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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            const header = document.querySelector("header");
            const headerHeight = header ? header.offsetHeight : 0;
            const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight - 20;

            window.scrollTo({
                top: Math.max(0, targetTop),
                behavior: "smooth"
            });
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


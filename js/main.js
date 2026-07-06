/* =====================================
   BukuTirta Landing Page
   main.js
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initSmoothScroll();
    initFaq();
    initScrollReveal();
    initActiveNav();
    initStickyHeader();
    initCtaTracking();

});

/* =====================================
   MOBILE MENU
===================================== */

function initMobileMenu() {

    const toggle = document.getElementById("mobileToggle");
    const nav = document.querySelector(".nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {

        nav.classList.toggle("show");

        toggle.textContent =
            nav.classList.contains("show")
                ? "✕"
                : "☰";

    });

    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("show");

            toggle.textContent = "☰";

        });

    });

}

/* =====================================
   SMOOTH SCROLL
===================================== */

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

}

/* =====================================
   FAQ ACCORDION
===================================== */

function initFaq() {

    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {

        question.addEventListener("click", () => {

            const item = question.parentElement;

            document.querySelectorAll(".faq-item").forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}

/* =====================================
   STICKY HEADER
===================================== */

function initStickyHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 6px 18px rgba(0,0,0,.06)";

        } else {

            header.style.boxShadow = "none";

        }

    });

}

/* =====================================
   ACTIVE NAVIGATION
===================================== */

function initActiveNav() {

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (pageYOffset >= top &&
                pageYOffset < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* =====================================
   SCROLL REVEAL
===================================== */

function initScrollReveal() {

    const elements = document.querySelectorAll(

        ".feature-card," +
        ".price-card," +
        ".testimonial-card," +
        ".security-card," +
        ".step," +
        ".stat-item," +
        ".logo-card"

    );

    elements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition =
            "all .6s ease";

    });

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: .15
        }

    );

    elements.forEach(el => observer.observe(el));

}

/* =====================================
   CTA TRACKING
===================================== */

function initCtaTracking() {

    const buttons = document.querySelectorAll(".track-cta");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const label =

                button.textContent.trim();

            console.log(

                "[CTA Click]",

                label

            );

            /* ==========================
               Google Analytics 4
            =========================== */

            if (typeof gtag === "function") {

                gtag("event", "cta_click", {

                    event_category: "Landing Page",

                    event_label: label,

                    value: 1

                });

            }

            /* ==========================
               Google Tag Manager
            =========================== */

            if (window.dataLayer) {

                window.dataLayer.push({

                    event: "cta_click",

                    cta_text: label,

                    page: window.location.pathname

                });

            }

        });

    });

}

/* =====================================
   OPTIONAL
   PRELOADER SUPPORT
===================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* =====================================
   END OF FILE
===================================== */
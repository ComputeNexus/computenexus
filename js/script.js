/* =========================================================
   COMPUTE NEXUS v2.0
   Global JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       1. REDUCED MOTION
       ===================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const navToggle = document.querySelector("[data-nav-toggle]");
    const mainNav = document.querySelector(".main-nav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");

            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            navToggle.classList.toggle("is-active", isOpen);
        });

        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("is-open");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                navToggle.classList.remove("is-active");
            });
        });
    }


    /* =====================================================
       3. TYPING ANIMATION
       ===================================================== */

    const typingElement = document.querySelector(
        "[data-typing]"
    );

    if (typingElement && !prefersReducedMotion) {

        const phrases = [
            "I'm looking for GPUs to buy or rent",
            "I need 4 Megawatts of liquid-cooled, Tier III data center colocation.",
            "I want a private cloud with no egress fees but on a monthly contract"
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typingSpeed = 48;
        const deletingSpeed = 28;
        const pauseAfterTyping = 2200;
        const pauseAfterDeleting = 500;

        function typePhrase() {
            const currentPhrase = phrases[phraseIndex];

            if (!deleting) {
                characterIndex++;

                typingElement.textContent =
                    currentPhrase.substring(0, characterIndex);

                if (characterIndex >= currentPhrase.length) {
                    deleting = true;

                    setTimeout(
                        typePhrase,
                        pauseAfterTyping
                    );

                    return;
                }

                setTimeout(
                    typePhrase,
                    typingSpeed
                );

            } else {
                characterIndex--;

                typingElement.textContent =
                    currentPhrase.substring(0, characterIndex);

                if (characterIndex <= 0) {
                    deleting = false;

                    phraseIndex =
                        (phraseIndex + 1) % phrases.length;

                    setTimeout(
                        typePhrase,
                        pauseAfterDeleting
                    );

                    return;
                }

                setTimeout(
                    typePhrase,
                    deletingSpeed
                );
            }
        }

        typePhrase();
    }


    /* =====================================================
       4. SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .fade-in, [data-reveal]"
    );

    if (revealElements.length) {

        if (
            prefersReducedMotion ||
            !("IntersectionObserver" in window)
        ) {
            revealElements.forEach((element) => {
                element.classList.add("is-visible");
            });

        } else {

            const revealObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach((entry) => {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        });

                    },
                    {
                        threshold: 0.12,
                        rootMargin: "0px 0px -45px 0px"
                    }
                );

            revealElements.forEach((element) => {
                revealObserver.observe(element);
            });
        }
    }


    /* =====================================================
       5. STAGGERED CARD ANIMATIONS
       ===================================================== */

    const animationGroups =
        document.querySelectorAll(
            "[data-stagger]"
        );

    animationGroups.forEach((group) => {

        const children = Array.from(
            group.children
        );

        children.forEach((child, index) => {

            child.style.transitionDelay =
                `${Math.min(index * 80, 400)}ms`;

            child.classList.add("reveal");
        });
    });


    /* =====================================================
       6. SMOOTH INTERNAL LINKS
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "start"
            });
        });
    });


    /* =====================================================
       7. HEADER SCROLL STATE
       ===================================================== */

    const header =
        document.querySelector("header");

    if (header) {

        const updateHeader =
            () => {

                if (window.scrollY > 25) {
                    header.classList.add(
                        "is-scrolled"
                    );
                } else {
                    header.classList.remove(
                        "is-scrolled"
                    );
                }
            };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );
    }


    /* =====================================================
       8. ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const normalizedPage =
        currentPage === ""
            ? "index.html"
            : currentPage;

    document.querySelectorAll(
        ".main-nav a"
    ).forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

        if (
            linkPage === normalizedPage ||
            (
                normalizedPage === "index.html" &&
                (href === "/" || href === "./")
            )
        ) {
            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );
        }
    });


    /* =====================================================
       9. CONTACT FORM — BASIC CLIENT VALIDATION
       ===================================================== */

    const contactForm =
        document.querySelector(
            "form[data-contact-form]"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                const requiredFields =
                    contactForm.querySelectorAll(
                        "[required]"
                    );

                let valid = true;

                requiredFields.forEach(
                    (field) => {

                        if (
                            !field.value.trim()
                        ) {
                            valid = false;

                            field.classList.add(
                                "field-error"
                            );
                        } else {
                            field.classList.remove(
                                "field-error"
                            );
                        }
                    }
                );

                const emailField =
                    contactForm.querySelector(
                        'input[type="email"]'
                    );

                if (
                    emailField &&
                    emailField.value.trim()
                ) {

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (
                        !emailPattern.test(
                            emailField.value.trim()
                        )
                    ) {
                        valid = false;

                        emailField.classList.add(
                            "field-error"
                        );
                    }
                }

                if (!valid) {
                    event.preventDefault();

                    const firstError =
                        contactForm.querySelector(
                            ".field-error"
                        );

                    if (firstError) {
                        firstError.focus();
                    }
                }
            }
        );
    }


    /* =====================================================
       10. REMOVE FORM ERROR STATE WHILE TYPING
       ===================================================== */

    document.querySelectorAll(
        ".field-error"
    ).forEach((field) => {

        field.addEventListener(
            "input",
            () => {
                field.classList.remove(
                    "field-error"
                );
            }
        );
    });


    /* =====================================================
       11. EXTERNAL LINKS
       ===================================================== */

    document.querySelectorAll(
        'a[href^="http"]'
    ).forEach((link) => {

        const url =
            link.getAttribute("href");

        if (
            !url ||
            url.includes(
                window.location.hostname
            )
        ) {
            return;
        }

        if (
            !link.hasAttribute("target")
        ) {
            link.setAttribute(
                "target",
                "_blank"
            );
        }

        if (
            !link.hasAttribute("rel")
        ) {
            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        }
    });


    /* =====================================================
       12. CURRENT YEAR
       ===================================================== */

    document.querySelectorAll(
        "[data-current-year]"
    ).forEach((element) => {

        element.textContent =
            new Date().getFullYear();
    });


    /* =====================================================
       13. HERO PARALLAX MOTION
       ===================================================== */

    const hero =
        document.querySelector(
            ".hero, .page-hero"
        );

    if (
        hero &&
        !prefersReducedMotion
    ) {

        let ticking = false;

        const updateHero =
            () => {

                const scrollY =
                    window.scrollY;

                if (
                    scrollY <= 800
                ) {

                    hero.style.setProperty(
                        "--hero-scroll",
                        `${scrollY * 0.12}px`
                    );
                }

                ticking = false;
            };

        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {
                    window.requestAnimationFrame(
                        updateHero
                    );

                    ticking = true;
                }
            },
            {
                passive: true
            }
        );
    }


    /* =====================================================
       14. BUTTON RIPPLE EFFECT
       ===================================================== */

    if (!prefersReducedMotion) {

        document.querySelectorAll(
            ".btn"
        ).forEach((button) => {

            button.addEventListener(
                "click",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();

                    const ripple =
                        document.createElement(
                            "span"
                        );

                    ripple.className =
                        "button-ripple";

                    ripple.style.left =
                        `${event.clientX - rect.left}px`;

                    ripple.style.top =
                        `${event.clientY - rect.top}px`;

                    button.appendChild(
                        ripple
                    );

                    window.setTimeout(
                        () => {
                            ripple.remove();
                        },
                        650
                    );
                }
            );
        });
    }


    /* =====================================================
       15. EXTERNAL FORM REDIRECT FALLBACK
       ===================================================== */

    /*
       Formspree should handle the actual submission and
       redirect to thanks.html using the form's hidden
       _next field.

       This JavaScript intentionally does NOT intercept
       the successful form submission. That prevents
       conflicts with Formspree.
    */


    /* =====================================================
       16. LAZY LOADING
       ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach((image) => {

        if (
            !image.hasAttribute(
                "loading"
            )
        ) {
            image.setAttribute(
                "loading",
                "lazy"
            );
        }
    });


    /* =====================================================
       17. PREVENT ANIMATION FLASH
       ===================================================== */

    window.requestAnimationFrame(() => {
        document.documentElement.classList.add(
            "js-ready"
        );
    });


    /* =====================================================
       18. CONSOLE BRANDING
       ===================================================== */

    if (
        window.console &&
        typeof console.log === "function"
    ) {
        console.log(
            "%cCompute Nexus",
            "font-size: 20px; font-weight: 700;"
        );

        console.log(
            "%cGPU • Cloud • Colocation • AI Infrastructure",
            "font-size: 12px;"
        );
    }
});
/* ============================================================
   script.js — Crime Scene Awareness Website
   Features:
     1. Fade-in on scroll  (IntersectionObserver)
     2. Active nav-link highlight on scroll
     3. Hero button redirect to investigation.html
   ============================================================ */


/* ----------------------------------------------------------
   1. FADE-IN ON SCROLL
   We attach the class "fade-in" to elements in HTML.
   IntersectionObserver watches them and adds "visible"
   when they enter the viewport, triggering the CSS transition.
   ---------------------------------------------------------- */

// Select every element that should animate in on scroll
const fadeElements = document.querySelectorAll('.fade-in');

// Options: trigger when 10% of the element is visible
const observerOptions = {
    root: null,         // observe relative to the browser viewport
    threshold: 0.1      // 10% visibility triggers the callback
};

// Create the observer
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element entered the viewport — make it visible
            entry.target.classList.add('visible');

            // Stop observing once animated (one-time effect)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing each matching element
fadeElements.forEach(el => fadeObserver.observe(el));


/* ----------------------------------------------------------
   2. ACTIVE NAVBAR LINK HIGHLIGHT ON SCROLL
   Highlights the nav link whose corresponding section is
   currently visible in the viewport.
   ---------------------------------------------------------- */

// Grab all nav links and all page sections with an id
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

// Also highlight based on current page URL (for multi-page setup)
(function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
})();

// Observer for section-based active highlighting (within a page)
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                // Remove active from all links first
                link.classList.remove('active');

                // Add active only to the matching anchor link
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    root: null,
    threshold: 0.45   // section must be 45% visible to be "active"
});

// Observe each section that has an id anchor
sections.forEach(section => sectionObserver.observe(section));


/* ----------------------------------------------------------
   3. HERO BUTTON — REDIRECT TO investigation.html
   Finds the explore button by id and navigates on click.
   ---------------------------------------------------------- */

const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        window.location.href = 'investigation.html';
    });
}


/* ----------------------------------------------------------
   4. BACK TO HOME BUTTON (used on investigation.html)
   ---------------------------------------------------------- */

const homeBtn = document.getElementById('home-btn');
if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}


/* ----------------------------------------------------------
   5. SMOOTH SCROLL for anchor links (supplemental)
   HTML smooth-scroll handles most cases, but this ensures
   JavaScript-triggered scrolls also animate smoothly.
   ---------------------------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

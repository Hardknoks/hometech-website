/**
 * router.js
 * Handles client-side navigation (Single Page Application routing).
 */

const DEFAULT_ROUTE = 'home';

const routes = {
    'home': 'home',
    'about': 'about',
    'requests': 'requests', 
    'faq': 'faq',
    'contact': 'contact'
};

function handleRouting() {
    // 1. Determine the current page based on the URL hash
    let hash = window.location.hash.substring(2); 
    let routeKey = routes[hash] ? hash : DEFAULT_ROUTE;
    let sectionId = routes[routeKey];
    
    if (window.location.hash === '' || !routes[hash]) {
        window.location.hash = `#/${DEFAULT_ROUTE}`;
        return;
    }

    // 2. Hide all page sections
    const pageSections = document.querySelectorAll('.page-section');
    pageSections.forEach(section => {
        section.style.display = 'none';
    });

    // 3. Show the active page section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    // 4. Update the active state in the navigation bar
    const allNavLinks = document.querySelectorAll('button[data-route]');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        // Add 'active' class to the link that matches the current route
        if (link.getAttribute('data-route') === routeKey) {
            link.classList.add('active');
        }
    });

    // Scroll to the top of the page for a clean page load feel
    window.scrollTo(0, 0);
}

// Attach listeners
window.addEventListener('hashchange', handleRouting);
document.addEventListener('DOMContentLoaded', handleRouting);

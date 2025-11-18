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
    
    // Set the hash if it's missing (forces default page on first load)
    if (window.location.hash === '' || !routes[hash]) {
        window.location.hash = `#/${DEFAULT_ROUTE}`;
        // Important: Return immediately to let the hashchange event re-run the function 
        // with the correct hash, preventing issues with initial page display.
        return;
    }

    // 2. Hide ALL page sections first
    const pageSections = document.querySelectorAll('.page-section');
    pageSections.forEach(section => {
        section.style.display = 'none';
        // console.log(`Hiding section: ${section.id}`); // Debugging
    });

    // 3. Show ONLY the active page section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
        // console.log(`Showing section: ${activeSection.id}`); // Debugging
    } else {
        console.error(`Error: Section ID "${sectionId}" not found for route "${routeKey}".`);
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

// Attach listeners for both hash changes and initial page load
window.addEventListener('hashchange', handleRouting);
document.addEventListener('DOMContentLoaded', handleRouting);

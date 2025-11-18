/**
 * router.js
 * Handles client-side navigation (Single Page Application routing)
 * based on the URL hash (e.g., #/home, #/requests).
 */

// Define the default page to load when the site first opens
const DEFAULT_ROUTE = 'home';

// A map of routes to their corresponding section IDs
const routes = {
    'home': 'home',
    'about': 'about',
    'requests': 'requests', // Corresponds to your Services/Pricing section
    'faq': 'faq',
    'contact': 'contact'
};

/**
 * Executes the routing logic: shows the correct page and highlights the correct link.
 */
function handleRouting() {
    // 1. Determine the current page based on the URL hash
    // Get the part of the URL after the #/
    let hash = window.location.hash.substring(2); 
    
    // Fallback to the default route if the hash is empty or invalid
    let routeKey = routes[hash] ? hash : DEFAULT_ROUTE;
    let sectionId = routes[routeKey];
    
    // For the very first load, set the hash in the URL bar
    if (window.location.hash === '') {
        window.location.hash = `#/${DEFAULT_ROUTE}`;
        return; // Run again with the correct hash
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
        // Remove 'active' class from all links
        link.classList.remove('active');
        
        // Add 'active' class to the link that matches the current route
        if (link.getAttribute('data-route') === routeKey) {
            link.classList.add('active');
        }
    });

    // Scroll to the top of the page for a clean page load feel
    window.scrollTo(0, 0);
}

// Attach the routing function to the 'hashchange' event.
// This ensures the page changes every time the URL hash is updated.
window.addEventListener('hashchange', handleRouting);

// Run the routing logic immediately when the page first loads
document.addEventListener('DOMContentLoaded', handleRouting);

// Client-side routing with hash-based navigation
document.addEventListener('DOMContentLoaded', function() {
    initRouting();
    window.addEventListener('hashchange', handleRouteChange);
    
    // Handle initial route
    handleRouteChange();
});

function initRouting() {
    // Add click handlers to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            navigateTo(target);
        });
    });
}

function handleRouteChange() {
    const hash = window.location.hash.substring(1) || 'dashboard';
    navigateTo(hash);
}

function navigateTo(view) {
    // Hide all views
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.classList.remove('active'));
    
    // Show target view
    const targetView = document.getElementById(`${view}-view`);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    // Update active navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${view}`) {
            link.classList.add('active');
        }
    });
    
    // Update browser history
    window.history.replaceState(null, null, `#${view}`);
}
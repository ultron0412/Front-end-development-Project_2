// Keyboard navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initKeyboardNavigation();
});

function initKeyboardNavigation() {
    // Add global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+F to focus search
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('search-users');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape key to blur focused elements
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
        
        // Arrow key navigation in tables
        if (e.key.startsWith('Arrow') && document.activeElement.closest('tr')) {
            handleTableNavigation(e);
        }
    });
}

function handleTableNavigation(e) {
    const currentRow = document.activeElement.closest('tr');
    const table = currentRow.closest('table');
    const rows = Array.from(table.querySelectorAll('tr'));
    const currentIndex = rows.indexOf(currentRow);
    
    let nextRow = null;
    
    switch (e.key) {
        case 'ArrowUp':
            if (currentIndex > 0) {
                nextRow = rows[currentIndex - 1];
            }
            break;
        case 'ArrowDown':
            if (currentIndex < rows.length - 1) {
                nextRow = rows[currentIndex + 1];
            }
            break;
        case 'ArrowLeft':
            // Focus previous cell in row
            const prevCell = document.activeElement.previousElementSibling;
            if (prevCell && prevCell.hasAttribute('contenteditable')) {
                prevCell.focus();
            }
            break;
        case 'ArrowRight':
            // Focus next cell in row
            const nextCell = document.activeElement.nextElementSibling;
            if (nextCell && nextCell.hasAttribute('contenteditable')) {
                nextCell.focus();
            }
            break;
    }
    
    if (nextRow) {
        const firstEditable = nextRow.querySelector('[contenteditable="true"]');
        if (firstEditable) {
            firstEditable.focus();
        }
        e.preventDefault();
    }
}
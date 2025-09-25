// Table sorting functionality
document.addEventListener('DOMContentLoaded', function() {
    initTableSorting();
});

function initTableSorting() {
    const table = document.getElementById('users-table');
    const headers = table.querySelectorAll('th[data-sort]');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            const currentOrder = this.getAttribute('data-order') || 'asc';
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
            
            // Update all headers
            headers.forEach(h => {
                h.setAttribute('data-order', '');
                h.querySelector('.sort-icon').textContent = '↕';
            });
            
            this.setAttribute('data-order', newOrder);
            this.querySelector('.sort-icon').textContent = newOrder === 'asc' ? '↑' : '↓';
            
            sortTable(column, newOrder);
        });
    });
}

function sortTable(column, order) {
    const table = document.getElementById('users-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const index = Array.from(table.querySelectorAll('th')).findIndex(
        th => th.getAttribute('data-sort') === column
    );
    
    rows.sort((a, b) => {
        const aValue = a.cells[index].textContent.trim();
        const bValue = b.cells[index].textContent.trim();
        
        if (order === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
    
    // Remove existing rows
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    
    // Add sorted rows
    rows.forEach(row => tbody.appendChild(row));
}
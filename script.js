// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Initialize animated counters
    initCounters();
    
    // Initialize charts
    initCharts();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize routing
    initRouting();
}

function initCounters() {
    const counters = document.querySelectorAll('.card-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = formatNumber(target);
                return;
            }
            
            counter.textContent = formatNumber(Math.floor(current));
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    });
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function addNewUser() {
    const table = document.getElementById('users-table');
    const tbody = table.querySelector('tbody');
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td contenteditable="true">New User</td>
        <td contenteditable="true">new@example.com</td>
        <td contenteditable="true">User</td>
        <td contenteditable="true">Active</td>
        <td>
            <button class="btn btn-sm" onclick="saveRow(this)">Save</button>
            <button class="btn btn-sm btn-danger" onclick="deleteRow(this)">Delete</button>
        </td>
    `;
    
    tbody.appendChild(newRow);
}

function saveRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td[contenteditable="true"]');
    
    cells.forEach(cell => {
        cell.setAttribute('data-original', cell.textContent);
    });
    
    alert('Changes saved successfully!');
}

function deleteRow(button) {
    const row = button.closest('tr');
    if (confirm('Are you sure you want to delete this user?')) {
        row.remove();
    }
}

function saveSettings() {
    const theme = document.getElementById('theme').value;
    const notifications = document.getElementById('notifications').checked;
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications);
    
    alert('Settings saved successfully!');
}
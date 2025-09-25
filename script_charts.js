// Chart initialization and rendering
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
});

function initCharts() {
    createRevenueChart();
    createUserGrowthChart();
    createPerformanceChart();
    createTrafficChart();
}

function createRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    const ctx = canvas.getContext('2d');
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue ($)',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };
    
    // Draw the chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let i = 0; i <= 5; i++) {
        const y = canvas.height - (i * canvas.height / 5);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Vertical lines
    const xStep = canvas.width / (data.labels.length - 1);
    for (let i = 0; i < data.labels.length; i++) {
        const x = i * xStep;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Draw data line
    ctx.strokeStyle = data.datasets[0].borderColor;
    ctx.fillStyle = data.datasets[0].backgroundColor;
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    const maxValue = Math.max(...data.datasets[0].data);
    
    data.datasets[0].data.forEach((value, index) => {
        const x = index * xStep;
        const y = canvas.height - (value / maxValue * canvas.height);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Fill area under line
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
    
    // Draw points
    data.datasets[0].data.forEach((value, index) => {
        const x = index * xStep;
        const y = canvas.height - (value / maxValue * canvas.height);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#2563eb';
        ctx.fill();
    });
}

function createUserGrowthChart() {
    const svg = document.getElementById('userGrowthChart');
    svg.innerHTML = ''; // Clear existing content
    
    const data = [1500, 1800, 2100, 2400, 2700, 3000];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const width = 400;
    const height = 200;
    const padding = 40;
    
    const maxValue = Math.max(...data);
    const xScale = (width - padding * 2) / (data.length - 1);
    const yScale = (height - padding * 2) / maxValue;
    
    // Create bars
    data.forEach((value, index) => {
        const barWidth = (width - padding * 2) / data.length - 5;
        const barHeight = value * yScale;
        const x = padding + index * (barWidth + 5);
        const y = height - padding - barHeight;
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', '#2563eb');
        rect.setAttribute('rx', 3);
        
        svg.appendChild(rect);
        
        // Add label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + barWidth / 2);
        text.setAttribute('y', y - 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#666');
        text.setAttribute('font-size', '12');
        text.textContent = value;
        
        svg.appendChild(text);
        
        // Add month label
        const monthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        monthText.setAttribute('x', x + barWidth / 2);
        monthText.setAttribute('y', height - padding + 20);
        monthText.setAttribute('text-anchor', 'middle');
        monthText.setAttribute('fill', '#666');
        monthText.setAttribute('font-size', '12');
        monthText.textContent = labels[index];
        
        svg.appendChild(monthText);
    });
}

function createPerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    const ctx = canvas.getContext('2d');
    
    // Similar to createRevenueChart but for performance metrics
    // Implementation would be similar with different data
}

function createTrafficChart() {
    const svg = document.getElementById('trafficChart');
    svg.innerHTML = '';
    
    const data = [
        { label: 'Direct', value: 45, color: '#2563eb' },
        { label: 'Social', value: 25, color: '#16a34a' },
        { label: 'Email', value: 15, color: '#dc2626' },
        { label: 'Organic', value: 15, color: '#d97706' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;
    const radius = 80;
    const centerX = 200;
    const centerY = 150;
    
    data.forEach(item => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(startAngle + sliceAngle);
        const y2 = centerY + radius * Math.sin(startAngle + sliceAngle);
        
        const largeArc = sliceAngle > Math.PI ? 1 : 0;
        
        path.setAttribute('d', `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`);
        path.setAttribute('fill', item.color);
        
        svg.appendChild(path);
        
        // Add label
        const labelAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + (radius + 20) * Math.cos(labelAngle);
        const labelY = centerY + (radius + 20) * Math.sin(labelAngle);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', labelX);
        text.setAttribute('y', labelY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#333');
        text.setAttribute('font-size', '12');
        text.textContent = `${item.label} (${item.value}%)`;
        
        svg.appendChild(text);
        
        startAngle += sliceAngle;
    });
}
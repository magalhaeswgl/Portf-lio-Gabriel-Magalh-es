// CANVAS DE FUNDO DISTORCIDO
const canvasBg = document.getElementById('distortion-bg');
const ctxBg = canvasBg.getContext('2d');
let w, h;

function resizeBg() { 
    w = window.innerWidth; 
    h = window.innerHeight; 
    canvasBg.width = w; 
    canvasBg.height = h; 
}
window.addEventListener('resize', resizeBg);
resizeBg();

let timeF = 0;
function drawDistortion() {
    if(!ctxBg) return;
    const imgData = ctxBg.getImageData(0, 0, w, h);
    const data = imgData.data;
    for(let i=0; i<data.length; i+=4) {
        const noise = Math.random() * 45;
        data[i] = (30 + Math.sin(timeF + i*0.0005) * 25 + noise) % 255;
        data[i+1] = (20 + Math.cos(timeF*0.6 + i*0.0003) * 30 + noise) % 255;
        data[i+2] = (55 + Math.sin(timeF*0.9) * 35 + noise) % 255;
        data[i+3] = Math.random() > 0.95 ? 180 : 70;
    }
    ctxBg.putImageData(imgData, 0, 0);
    ctxBg.beginPath();
    for(let i=0;i<15;i++) {
        ctxBg.strokeStyle = `rgba(255, 51, 102, ${0.3+Math.sin(timeF)*0.2})`;
        const y = (timeF * 40 + i * 90) % h;
        ctxBg.moveTo(0, y);
        ctxBg.lineTo(w, y + Math.sin(timeF + i) * 25);
        ctxBg.stroke();
    }
    timeF += 0.025;
    requestAnimationFrame(drawDistortion);
}
drawDistortion();

// CURSOR PERSONALIZADO
const cursorDiv = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursorDiv.style.left = e.clientX + 'px';
    cursorDiv.style.top = e.clientY + 'px';
});
document.addEventListener('mousedown', () => {
    cursorDiv.style.transform = 'translate(-50%, -50%) scale(0.6)';
    cursorDiv.style.borderColor = '#0ff';
    setTimeout(() => cursorDiv.style.transform = 'translate(-50%, -50%) scale(1)', 150);
});
document.addEventListener('mouseup', () => cursorDiv.style.borderColor = 'var(--primary-neon)');
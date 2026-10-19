// SISTEMA DE TEMAS
function setTheme(themeName) {
    const themes = {
        matrix: { 
            '--primary-neon': '#00ff00', 
            '--secondary-neon': '#00cc00', 
            '--bg-dark': '#001000',
            '--bg-card': 'rgba(0, 20, 0, 0.7)',
            '--text-color': '#b0ffb0',
            '--text-dim': '#80ff80',
            '--border-color': 'rgba(0, 255, 0, 0.3)'
        },
        blood: { 
            '--primary-neon': '#ff0000', 
            '--secondary-neon': '#cc0000', 
            '--bg-dark': '#1a0000',
            '--bg-card': 'rgba(30, 0, 0, 0.7)',
            '--text-color': '#ffaaaa',
            '--text-dim': '#ff8888',
            '--border-color': 'rgba(255, 0, 0, 0.3)'
        },
        ghost: { 
            '--primary-neon': '#ffffff', 
            '--secondary-neon': '#aaaaaa', 
            '--bg-dark': '#111111',
            '--bg-card': 'rgba(30, 30, 30, 0.7)',
            '--text-color': '#cccccc',
            '--text-dim': '#999999',
            '--border-color': 'rgba(255, 255, 255, 0.2)'
        },
        neon: { 
            '--primary-neon': '#ff3366', 
            '--secondary-neon': '#0ff', 
            '--bg-dark': '#03030c',
            '--bg-card': 'rgba(5, 5, 20, 0.7)',
            '--text-color': '#e0e5ff',
            '--text-dim': '#c7dcff',
            '--border-color': 'rgba(255, 51, 102, 0.3)'
        },
        sunset: { 
            '--primary-neon': '#ff6600', 
            '--secondary-neon': '#ff00cc', 
            '--bg-dark': '#1a0a1a',
            '--bg-card': 'rgba(30, 10, 30, 0.7)',
            '--text-color': '#ffccaa',
            '--text-dim': '#ffaa88',
            '--border-color': 'rgba(255, 102, 0, 0.3)'
        }
    };
    const theme = themes[themeName];
    if(theme) {
        Object.entries(theme).forEach(([key, val]) => document.documentElement.style.setProperty(key, val));
        if(window.addTerminalLine) window.addTerminalLine(`🎨 Tema "${themeName.toUpperCase()}" ATIVADO!`, 'success');
    } else {
        if(window.addTerminalLine) window.addTerminalLine(`❌ Tema ${themeName} não encontrado. Use: matrix, blood, ghost, neon, sunset`, 'error');
    }
}
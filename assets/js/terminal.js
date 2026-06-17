// CONTROLE DE ANIMAÇÕES VIA IFRAME
const animationFrame = document.getElementById('animationFrame');
let currentAnimation = null;

function loadAnimation(animationFile) {
    if(currentAnimation === animationFile) return;
    
    // Parar animação atual se existir
    if(currentAnimation) {
        unloadAnimation();
    }
    
    currentAnimation = animationFile;
    animationFrame.style.display = 'block';
    animationFrame.src = `terminal-animacoes/${animationFile}.html`;
    if(window.addTerminalLine) window.addTerminalLine(`🎬 Animação "${animationFile}" carregada!`, 'success');
}

function unloadAnimation() {
    // Tentar parar a animação via postMessage (para animações que suportam)
    if(animationFrame.contentWindow && currentAnimation) {
        try {
            animationFrame.contentWindow.postMessage({ type: 'STOP_ANIMATION' }, '*');
        } catch(e) {
            // Erro silencioso - nem todas as animações suportam postMessage
        }
        
        // Tentar chamar o método stop diretamente se existir
        try {
            if(animationFrame.contentWindow && animationFrame.contentWindow.fireControls) {
                animationFrame.contentWindow.fireControls.stop();
            }
            if(animationFrame.contentWindow && animationFrame.contentWindow.matrixControls) {
                animationFrame.contentWindow.matrixControls.stop();
            }
            if(animationFrame.contentWindow && animationFrame.contentWindow.rainControls) {
                animationFrame.contentWindow.rainControls.stop();
            }
            if(animationFrame.contentWindow && animationFrame.contentWindow.smokeControls) {
                animationFrame.contentWindow.smokeControls.stop();
            }
        } catch(e) {
            // Erro silencioso
        }
    }
    
    currentAnimation = null;
    animationFrame.style.display = 'none';
    animationFrame.src = 'about:blank';
    if(window.addTerminalLine) window.addTerminalLine(`⏹️ Animação descarregada`, 'info');
}

// RESET COMPLETO
let chaosInterval = null;

function resetSite() {
    if(chaosInterval) { clearInterval(chaosInterval); chaosInterval = null; }
    setTheme('neon');
    unloadAnimation();
    if(window.addTerminalLine) window.addTerminalLine(`🔄 SITE TOTALMENTE RESETADO!`, 'success');
}

function chaosMode() {
    if(chaosInterval) {
        clearInterval(chaosInterval);
        chaosInterval = null;
        if(window.addTerminalLine) window.addTerminalLine(`🌀 Modo CAOS desativado.`, 'info');
        setTheme('neon');
    } else {
        chaosInterval = setInterval(() => {
            const r = Math.floor(Math.random()*255);
            const g = Math.floor(Math.random()*255);
            const b = Math.floor(Math.random()*255);
            document.documentElement.style.setProperty('--primary-neon', `rgb(${r}, ${g}, ${b})`);
            document.documentElement.style.setProperty('--secondary-neon', `rgb(${b}, ${r}, ${g})`);
        }, 1500);
        if(window.addTerminalLine) window.addTerminalLine(`🌀 MODO CAOS ATIVADO! Cores mudam aleatoriamente a cada 1.5 segundos!`, 'success');
    }
}

// TERMINAL
const modal = document.getElementById('terminalModal');
const openBtn = document.getElementById('openTerminalBtn');
const closeBtn = document.getElementById('closeTerminalBtn');
const terminalBody = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');

window.addTerminalLine = function(msg, type = 'cmd') {
    const div = document.createElement('div');
    div.className = 'terminal-output-line';
    if(type === 'error') div.style.color = '#ff6699';
    else if(type === 'success') div.style.color = '#0f0';
    else div.style.color = '#0ff';
    div.innerHTML = msg;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function showCommandList() {
    addTerminalLine(`═══════════════════════════════════════════════════════════════════════`, 'cmd');
    addTerminalLine(` 📋 COMANDOS DO TERMINAL:`, 'cmd');
    addTerminalLine(`═══════════════════════════════════════════════════════════════════════`, 'cmd');
    addTerminalLine(` 🎨 CORES:`, 'cmd');
    addTerminalLine(`    theme matrix  → Tudo verde neon`, 'cmd');
    addTerminalLine(`    theme blood   → Tudo vermelho sangue`, 'cmd');
    addTerminalLine(`    theme sunset  → Laranja/rosa`, 'cmd');
    addTerminalLine(`    theme ghost   → Cinza`, 'cmd');
    addTerminalLine(`    theme neon    → Volta ao padrão`, 'cmd');
    addTerminalLine(``, 'cmd');
    addTerminalLine(` 🔥 ANIMAÇÕES (camada sobre o site):`, 'cmd');
    addTerminalLine(`    fire on       → Ativa efeito de fogo`, 'cmd');
    addTerminalLine(`    fire off      → Desativa efeito de fogo`, 'cmd');
    addTerminalLine(`    matrix on     → Ativa chuva de código Matrix`, 'cmd');
    addTerminalLine(`    matrix off    → Desativa Matrix`, 'cmd');
    addTerminalLine(`    rain on       → Ativa SYSTEM BREACH (com botão cancelar)`, 'cmd');
    addTerminalLine(`    rain off      → Desativa efeito`, 'cmd');
    addTerminalLine(`    codemode on   → Ativa efeito de fumaça (segue o mouse)`, 'cmd');
    addTerminalLine(`    codemode off  → Desativa fumaça`, 'cmd');
    addTerminalLine(``, 'cmd');
    addTerminalLine(` 🌀 OUTROS COMANDOS:`, 'cmd');
    addTerminalLine(`    chaos         → Ativa/desativa cores aleatórias`, 'cmd');
    addTerminalLine(`    reset         → Reseta TUDO (cores + animações)`, 'cmd');
    addTerminalLine(`    lista / help  → Mostra esta lista`, 'cmd');
    addTerminalLine(`    clear         → Limpa o terminal`, 'cmd');
    addTerminalLine(`═══════════════════════════════════════════════════════════════════════`, 'cmd');
}

const commands = {
    help: () => showCommandList(),
    lista: () => showCommandList(),
    theme: (args) => { 
        if(args[0]) setTheme(args[0]); 
        else addTerminalLine('Use: theme [matrix|blood|sunset|ghost|neon]', 'error');
    },
    fire: (args) => { 
        if(args[0] === 'on') loadAnimation('fire'); 
        else if(args[0] === 'off') unloadAnimation(); 
        else addTerminalLine('Use: fire on/off', 'error'); 
    },
    matrix: (args) => { 
        if(args[0] === 'on') loadAnimation('matrix'); 
        else if(args[0] === 'off') unloadAnimation(); 
        else addTerminalLine('Use: matrix on/off', 'error'); 
    },
    rain: (args) => { 
        if(args[0] === 'on') loadAnimation('rain'); 
        else if(args[0] === 'off') unloadAnimation(); 
        else addTerminalLine('Use: rain on/off', 'error'); 
    },
    codemode: (args) => { 
        if(args[0] === 'on') loadAnimation('codemode'); 
        else if(args[0] === 'off') unloadAnimation(); 
        else addTerminalLine('Use: codemode on/off', 'error'); 
    },
    chaos: () => chaosMode(),
    reset: () => resetSite(),
    clear: () => { 
        terminalBody.innerHTML = ''; 
        addTerminalLine('> Terminal limpo. Digite "lista" para comandos.', 'cmd'); 
    },
};

function processCommand(cmdLine) {
    const parts = cmdLine.trim().toLowerCase().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);
    
    if(commands[cmd]) {
        commands[cmd](args);
    } else {
        addTerminalLine(`❌ Comando desconhecido: ${cmd}. Digite "lista" para ver todos os comandos.`, 'error');
    }
}

// EVENTOS DO TERMINAL
openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    setTimeout(() => terminalInput.focus(), 100);
});

closeBtn.addEventListener('click', () => { 
    modal.style.display = 'none'; 
});

modal.addEventListener('click', (e) => { 
    if(e.target === modal) modal.style.display = 'none'; 
});

terminalInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const cmd = terminalInput.value;
        if(cmd.trim().length > 0) {
            addTerminalLine(`<span style="color:#ff3366">$&gt;</span> ${cmd}`);
            processCommand(cmd);
        }
        terminalInput.value = '';
    }
});

// Suporte para chips de ajuda
document.querySelectorAll('.help-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if(cmd) {
            addTerminalLine(`<span style="color:#ff3366">$&gt;</span> ${cmd}`);
            processCommand(cmd);
        }
    });
});

// ARRASTAR TERMINAL
const terminalWindow = document.getElementById('terminalWindow');
const dragHandle = document.getElementById('terminalDragHandle');
let isDraggingTerm = false;
let dragOffsetX, dragOffsetY;

if(dragHandle) {
    dragHandle.addEventListener('mousedown', (e) => {
        if(e.target.classList.contains('close-terminal-btn')) return;
        isDraggingTerm = true;
        dragOffsetX = e.clientX - terminalWindow.offsetLeft;
        dragOffsetY = e.clientY - terminalWindow.offsetTop;
        terminalWindow.style.cursor = 'grabbing';
    });
}

window.addEventListener('mousemove', (e) => {
    if(isDraggingTerm && terminalWindow) {
        const newLeft = e.clientX - dragOffsetX;
        const newTop = e.clientY - dragOffsetY;
        terminalWindow.style.left = Math.max(0, Math.min(newLeft, window.innerWidth - terminalWindow.offsetWidth)) + 'px';
        terminalWindow.style.top = Math.max(0, Math.min(newTop, window.innerHeight - terminalWindow.offsetHeight)) + 'px';
        terminalWindow.style.position = 'fixed';
    }
});

window.addEventListener('mouseup', () => {
    if(isDraggingTerm && terminalWindow) {
        isDraggingTerm = false;
        terminalWindow.style.cursor = '';
    }
});

// LISTENER PARA MENSAGENS DO IFRAME (botão cancelar das animações)
window.addEventListener('message', (event) => {
    // Verificar se a mensagem veio do nosso iframe
    if(event.source === animationFrame.contentWindow) {
        if(event.data && event.data.type === 'STOP_ANIMATION') {
            unloadAnimation();
            if(window.addTerminalLine) window.addTerminalLine(`⏹️ Animação cancelada pelo botão interno`, 'info');
        }
    }
});

// MENSAGEM INICIAL
addTerminalLine('═══════════════════════════════════════════════════════════════════════', 'cmd');
addTerminalLine('⚡ TERMINAL HACK ATIVADO', 'success');
addTerminalLine('Digite "lista" para ver todos os comandos disponíveis.', 'cmd');
addTerminalLine('═══════════════════════════════════════════════════════════════════════', 'cmd');
// ============================================================
// CONTROLE DE ANIMAÇÕES VIA IFRAME
// ============================================================
const animationFrame = document.getElementById('animationFrame');
let currentAnimation = null;
let animationPaused = false;
let pauseBtn = null;

// ============================================================
// BOTÃO FLUTUANTE DE PAUSAR/RETOMAR ANIMAÇÃO
// ============================================================
function createPauseButton() {
    if (pauseBtn) return;
    pauseBtn = document.createElement('button');
    pauseBtn.id = 'pauseAnimationBtn';
    pauseBtn.textContent = '⏸ PAUSAR ANIMAÇÃO';
    pauseBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        padding: 12px 20px;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        font-weight: bold;
        letter-spacing: 1.5px;
        color: #00ff41;
        background: rgba(0, 0, 0, 0.8);
        border: 1px solid #00ff41;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0,255,65,0.3);
        display: none;
        user-select: none;
    `;
    pauseBtn.addEventListener('click', () => {
        if (!currentAnimation) return;
        if (animationPaused) {
            try {
                if (animationFrame.contentWindow) {
                    animationFrame.contentWindow.postMessage({ type: 'START_ANIMATION' }, '*');
                    if (animationFrame.contentWindow.matrixControls) animationFrame.contentWindow.matrixControls.start();
                    if (animationFrame.contentWindow.fireControls) animationFrame.contentWindow.fireControls.start();
                    if (animationFrame.contentWindow.rainControls) animationFrame.contentWindow.rainControls.start();
                    if (animationFrame.contentWindow.smokeControls) animationFrame.contentWindow.smokeControls.start();
                    if (animationFrame.contentWindow.codemodeControls) animationFrame.contentWindow.codemodeControls.start();
                }
            } catch(e) {}
            animationPaused = false;
            pauseBtn.textContent = '⏸ PAUSAR ANIMAÇÃO';
            pauseBtn.style.color = '#00ff41';
            pauseBtn.style.borderColor = '#00ff41';
        } else {
            try {
                if (animationFrame.contentWindow) {
                    animationFrame.contentWindow.postMessage({ type: 'STOP_ANIMATION' }, '*');
                    if (animationFrame.contentWindow.matrixControls) animationFrame.contentWindow.matrixControls.stop();
                    if (animationFrame.contentWindow.fireControls) animationFrame.contentWindow.fireControls.stop();
                    if (animationFrame.contentWindow.rainControls) animationFrame.contentWindow.rainControls.stop();
                    if (animationFrame.contentWindow.smokeControls) animationFrame.contentWindow.smokeControls.stop();
                    if (animationFrame.contentWindow.codemodeControls) animationFrame.contentWindow.codemodeControls.stop();
                }
            } catch(e) {}
            animationPaused = true;
            pauseBtn.textContent = '▶ RETOMAR ANIMAÇÃO';
            pauseBtn.style.color = '#ff4136';
            pauseBtn.style.borderColor = '#ff4136';
        }
    });
    document.body.appendChild(pauseBtn);
}

// ============================================================
// CARREGAR / DESCARREGAR ANIMAÇÃO
// ============================================================
function loadAnimation(animationFile) {
    if(currentAnimation === animationFile) return;

    if(currentAnimation) {
        unloadAnimation();
    }

    currentAnimation = animationFile;
    animationFrame.style.display = 'block';
    // codemode precisa de mouse dentro do iframe; outros não
    animationFrame.style.pointerEvents = (animationFile === 'codemode') ? 'auto' : 'none';
    animationFrame.src = `terminal-animacoes/${animationFile}.html`;
    if(window.addTerminalLine) window.addTerminalLine(`🎬 Animação "${animationFile}" carregada!`, 'success');

    createPauseButton();
    animationPaused = false;
    if (pauseBtn) {
        pauseBtn.style.display = 'block';
        pauseBtn.textContent = '⏸ PAUSAR ANIMAÇÃO';
        pauseBtn.style.color = '#00ff41';
        pauseBtn.style.borderColor = '#00ff41';
    }
}

function unloadAnimation() {
    if(animationFrame.contentWindow && currentAnimation) {
        try {
            animationFrame.contentWindow.postMessage({ type: 'STOP_ANIMATION' }, '*');
        } catch(e) {}
        try {
            if(animationFrame.contentWindow.fireControls) animationFrame.contentWindow.fireControls.stop();
            if(animationFrame.contentWindow.matrixControls) animationFrame.contentWindow.matrixControls.stop();
            if(animationFrame.contentWindow.rainControls) animationFrame.contentWindow.rainControls.stop();
            if(animationFrame.contentWindow.smokeControls) animationFrame.contentWindow.smokeControls.stop();
            if(animationFrame.contentWindow.codemodeControls) animationFrame.contentWindow.codemodeControls.stop();
        } catch(e) {}
    }

    currentAnimation = null;
    animationFrame.style.display = 'none';
    animationFrame.style.pointerEvents = 'none';
    animationFrame.src = 'about:blank';
    if(window.addTerminalLine) window.addTerminalLine(`⏹️ Animação descarregada`, 'info');

    animationPaused = false;
    if (pauseBtn) pauseBtn.style.display = 'none';
}

// ============================================================
// RESET COMPLETO
// ============================================================
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

// ============================================================
// TERMINAL — ELEMENTOS
// ============================================================
const modal = document.getElementById('terminalModal');
const openBtn = document.getElementById('openTerminalBtn');
const closeBtn = document.getElementById('closeTerminalBtn');
const minimizeBtn = document.getElementById('minimizeTerminalBtn');
const restoreBtn = document.getElementById('terminalRestoreBtn');
const terminalBody = document.getElementById('terminalBody');
const terminalInput = document.getElementById('terminalInput');

// ============================================================
// MINIMIZAR / RESTAURAR TERMINAL
// ============================================================
let terminalMinimized = false;

function minimizeTerminal() {
    if (!modal) return;
    modal.classList.add('minimized');
    terminalMinimized = true;
    if (restoreBtn) restoreBtn.classList.add('visible');
    if(window.addTerminalLine) window.addTerminalLine(`📦 Terminal minimizado. Clique no ícone 💻 para reabrir.`, 'info');
}

function restoreTerminal() {
    if (!modal) return;
    modal.classList.remove('minimized');
    terminalMinimized = false;
    if (restoreBtn) restoreBtn.classList.remove('visible');
    setTimeout(() => { if (terminalInput) terminalInput.focus(); }, 100);
}

function openTerminal() {
    if (!modal) return;
    modal.style.display = 'flex';
    if (terminalMinimized) {
        restoreTerminal();
    } else {
        setTimeout(() => { if (terminalInput) terminalInput.focus(); }, 100);
    }
}

function closeTerminal() {
    if (!modal) return;
    modal.style.display = 'none';
    // se estava minimizado, "fechar de vez" também reseta o estado
    modal.classList.remove('minimized');
    terminalMinimized = false;
    if (restoreBtn) restoreBtn.classList.remove('visible');
}

// ============================================================
// TERMINAL — OUTPUT
// ============================================================
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
    addTerminalLine(`    codemode on   → Ativa esfera quicando (arraste com o mouse)`, 'cmd');
    addTerminalLine(`    codemode off  → Desativa esfera`, 'cmd');
    addTerminalLine(``, 'cmd');
    addTerminalLine(` 🌀 OUTROS COMANDOS:`, 'cmd');
    addTerminalLine(`    chaos         → Ativa/desativa cores aleatórias`, 'cmd');
    addTerminalLine(`    reset         → Reseta TUDO (cores + animações)`, 'cmd');
    addTerminalLine(`    minimize      → Minimiza a janela do terminal`, 'cmd');
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
    minimize: () => minimizeTerminal(),
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

// ============================================================
// EVENTOS DO TERMINAL
// ============================================================
if (openBtn) openBtn.addEventListener('click', openTerminal);
if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
if (minimizeBtn) minimizeBtn.addEventListener('click', minimizeTerminal);
if (restoreBtn) restoreBtn.addEventListener('click', restoreTerminal);

if (modal) {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeTerminal();
    });
}

if (terminalInput) {
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
}

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

// ============================================================
// ARRASTAR TERMINAL
// ============================================================
const terminalWindow = document.getElementById('terminalWindow');
const dragHandle = document.getElementById('terminalDragHandle');
let isDraggingTerm = false;
let dragOffsetX, dragOffsetY;

if(dragHandle) {
    dragHandle.addEventListener('mousedown', (e) => {
        if(e.target.classList.contains('close-terminal-btn')) return;
        if(e.target.classList.contains('minimize-terminal-btn')) return;
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

// ============================================================
// LISTENER DE MENSAGENS DO IFRAME
// ============================================================
window.addEventListener('message', (event) => {
    if(event.source !== animationFrame.contentWindow) return;
    if(!event.data) return;

    if(event.data.type === 'STOP_ANIMATION') {
        unloadAnimation();
        if(window.addTerminalLine) window.addTerminalLine(`⏹️ Animação cancelada pelo botão interno`, 'info');
        return;
    }

    if(event.data.type === 'ANIMATION_STATE') {
        if(event.data.active) {
            animationPaused = false;
            if(pauseBtn) {
                pauseBtn.textContent = '⏸ PAUSAR ANIMAÇÃO';
                pauseBtn.style.color = '#00ff41';
                pauseBtn.style.borderColor = '#00ff41';
            }
        } else {
            animationPaused = true;
            if(pauseBtn) {
                pauseBtn.textContent = '▶ RETOMAR ANIMAÇÃO';
                pauseBtn.style.color = '#ff4136';
                pauseBtn.style.borderColor = '#ff4136';
            }
        }
    }
});

// ============================================================
// ATALHO: ESC minimiza (se terminal aberto) / reabre (se minimizado)
// ============================================================
window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    // Não interferir se o foco estiver em um input do próprio terminal
    const active = document.activeElement;
    const inTerminalInput = active && active.id === 'terminalInput';
    if (inTerminalInput) return;

    if (modal && modal.style.display === 'flex' && !terminalMinimized) {
        minimizeTerminal();
    } else if (terminalMinimized) {
        openTerminal();
    }
});

// ============================================================
// MENSAGEM INICIAL
// ============================================================
addTerminalLine('═══════════════════════════════════════════════════════════════════════', 'cmd');
addTerminalLine('TERMINAL HACK ATIVADO', 'success');
addTerminalLine('Digite "lista" para ver todos os comandos disponíveis.', 'cmd');
addTerminalLine('Dica: clique em "—" para minimizar ou pressione ESC.', 'cmd');
addTerminalLine('═══════════════════════════════════════════════════════════════════════', 'cmd');
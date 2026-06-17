// CARREGAR PROJETOS
const projContainer = document.getElementById('deviant-projects-container');
if(projContainer) {
    projectsDeviant.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-deviant';
        card.innerHTML = `<h3 style="font-size:1.8rem;">◈ ${p.title}</h3><p style="margin:0.5rem 0; color: var(--text-dim);">${p.desc}</p><div class="skills-pile" style="margin-top:0.6rem;"><span class="skill-cyber" style="font-size:0.7rem;">${p.tech}</span></div><a href="${p.link}" target="_blank" class="demo-link"><i class="fas fa-external-link-alt"></i> EXPLORAR DEMO</a>`;
        projContainer.appendChild(card);
    });
}

// CARREGAR EXPERIÊNCIAS IMERSIVAS
const interactiveContainer = document.getElementById('interactiveContainer');
if(interactiveContainer) {
    interactiveItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'interactive-card';
        card.innerHTML = `<div class="interactive-icon"><i class="${item.icon}"></i></div><h3>${item.title}</h3><p>${item.desc}</p><a href="${item.link}" target="_blank" class="interactive-link">ACESSAR →</a>`;
        interactiveContainer.appendChild(card);
    });
}

// CARREGAR LABORATÓRIO
const labContainer = document.getElementById('labContainer');
if(labContainer) {
    labExperiments.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'lab-card';
        card.innerHTML = `<div class="lab-icon"><i class="${exp.icon}"></i></div><h3>${exp.title}</h3><p>${exp.desc}</p><a href="${exp.link}" target="_blank" class="lab-button"><i class="fas fa-flask"></i> ACESSAR LAB</a>`;
        labContainer.appendChild(card);
    });
}

// CARREGAR SKILLS
const containerSkills = document.getElementById('skill-mega-list');
skillsCore.forEach(s => {
    let span = document.createElement('span');
    span.className = 'skill-cyber';
    span.innerText = s;
    containerSkills.appendChild(span);
});
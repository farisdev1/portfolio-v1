
// DOM Elements
const projectsContainer = document.getElementById('projects-container');
const skillsContainer = document.getElementById('skills-container');
const blogContainer = document.getElementById('blog-container');
const aboutContent = document.getElementById('about-content');
const themeToggle = document.getElementById('theme-toggle');
const themeIconSun = document.getElementById('theme-icon-sun');
const themeIconMoon = document.getElementById('theme-icon-moon');
const html = document.documentElement;

// Terminal DOM
const terminalOverlay = document.getElementById('terminal-overlay');
const terminalToggle = document.getElementById('terminal-toggle');
const closeTerminalBtn = document.getElementById('close-terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// State
let portfolioData = null;

// --- Initialization ---

async function init() {
    initTheme();
    await loadData();
    renderContent();
    initTerminal();
}

// --- Theme Logic ---

function initTheme() {
    // Check localStorage or System Preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        updateThemeIcon(true);
    } else {
        html.classList.remove('dark');
        updateThemeIcon(false);
    }
}

function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.theme = 'light';
        updateThemeIcon(false);
    } else {
        html.classList.add('dark');
        localStorage.theme = 'dark';
        updateThemeIcon(true);
    }
}

function updateThemeIcon(isDark) {
    if (isDark) {
        themeIconMoon.classList.add('hidden');
        themeIconSun.classList.remove('hidden');
    } else {
        themeIconMoon.classList.remove('hidden');
        themeIconSun.classList.add('hidden');
    }
}

themeToggle.addEventListener('click', toggleTheme);


// --- Data & Rendering ---

async function loadData() {
    try {
        const response = await fetch('data.json');
        portfolioData = await response.json();
    } catch (error) {
        console.error('Failed to load data:', error);
        projectsContainer.innerHTML = '<p class="text-red-500">Failed to load projects.</p>';
        // Fallback or Alert
    }
}

function renderContent() {
    if (!portfolioData) return;

    renderProfile();
    renderSkills();
    renderProjects();
    renderBlog();
}

function renderProfile() {
    if (!aboutContent) return;

    aboutContent.innerHTML = `
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <span class="text-primary">01.</span> About Me
        </h2>
        <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            ${portfolioData.profile.description}
        </p>
        <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            ${portfolioData.profile.skills_description}
        </p>
    `;
}

function renderSkills() {
    if (!skillsContainer) return;

    skillsContainer.innerHTML = portfolioData.skills.map(skill => `
        <div class="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-primary transition-colors">
            <span class="text-primary text-xl">▹</span>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">${skill.name}</span>
        </div>
    `).join('');
}

function renderProjects() {
    if (!projectsContainer) return;

    projectsContainer.innerHTML = portfolioData.projects.map(project => `
        <div class="group relative bg-white dark:bg-card rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full">
            <div class="h-48 bg-slate-100 dark:bg-slate-700 overflow-hidden relative">
                    <div class="absolute inset-0 bg-primary/20 group-hover:opacity-0 transition-opacity z-10"></div>
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-6 flex flex-col flex-1">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">${project.title}</h3>
                    <div class="flex gap-3 text-slate-400">
                        <a href="${project.links.repo}" target="_blank" class="hover:text-primary transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></a>
                        <a href="${project.links.demo}" target="_blank" class="hover:text-primary transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>
                    </div>
                </div>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                    ${project.description}
                </p>
                <ul class="flex flex-wrap gap-2 text-xs font-mono text-primary/80">
                    ${project.tech.map(t => `<li class="px-2 py-1 bg-primary/10 rounded">${t}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function renderBlog() {
    if (!blogContainer) return;

    // Check if blog data exists
    if (!portfolioData.blog || portfolioData.blog.length === 0) {
        blogContainer.innerHTML = '<p class="text-slate-500">Coming soon...</p>';
        return;
    }

    blogContainer.innerHTML = portfolioData.blog.map(post => `
        <div class="bg-white dark:bg-card p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all hover:shadow-lg">
            <div class="text-xs font-mono text-primary mb-2">${post.date}</div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 hover:text-primary cursor-pointer transition-colors">${post.title}</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
                ${post.excerpt}
            </p>
            <a href="#" class="inline-block mt-4 text-sm font-medium text-primary hover:underline">Read more →</a>
        </div>
    `).join('');
}


// --- Terminal Logic ---

const commands = {
    help: () => {
        return `<div class="text-slate-300">
        <span class="text-primary">Available commands:</span>
        <br>- <span class="text-yellow-400">help</span>: Show this help message
        <br>- <span class="text-yellow-400">about</span>: Display about me info
        <br>- <span class="text-yellow-400">projects</span>: List featured projects
        <br>- <span class="text-yellow-400">skills</span>: List technical skills
        <br>- <span class="text-yellow-400">blog</span>: List recent blog posts
        <br>- <span class="text-yellow-400">clear</span>: Clear terminal history
        <br>- <span class="text-yellow-400">contact</span>: Show contact info
        <br>- <span class="text-yellow-400">theme</span>: Toggle light/dark mode
        </div>`;
    },
    about: () => `<div class="text-blue-400">${portfolioData.profile.description}</div>`,
    projects: () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        const list = portfolioData.projects.map((p, i) => `${i + 1}. ${p.title} - ${p.description.substring(0, 50)}...`).join('<br>');
        return `<div class="text-purple-400">${list}</div><div class="text-xs text-slate-500 mt-1">Scrolled to Projects section...</div>`;
    },
    skills: () => {
        const list = portfolioData.skills.map(s => s.name).join(', ');
        return `<div class="text-orange-400">${list}</div>`;
    },
    blog: () => {
        document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
        const list = portfolioData.blog.map((b, i) => `${i + 1}. ${b.title} (${b.date})`).join('<br>');
        return `<div class="text-green-400">${list}</div>`;
    },
    contact: () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        return `<div class="text-green-400">${portfolioData.profile.contact_text}</div>`;
    },
    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },
    theme: () => {
        toggleTheme();
        return `<div class="text-yellow-400">Theme toggled.</div>`;
    },
    sudo: () => `<div class="text-red-500 font-bold">Permission denied: You are not root. Nice try though.</div>`
};

function initTerminal() {
    // Toggle Terminal
    function toggleTerminal() {
        terminalOverlay.classList.toggle('hidden');
        if (!terminalOverlay.classList.contains('hidden')) {
            terminalInput.focus();
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }

    terminalToggle.addEventListener('click', toggleTerminal);
    closeTerminalBtn.addEventListener('click', toggleTerminal);

    // Close on outside click
    terminalOverlay.addEventListener('click', (e) => {
        if (e.target === terminalOverlay) toggleTerminal();
    });

    // Handle Input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            if (input) {
                // Add command to output
                const cmdLine = document.createElement('div');
                cmdLine.innerHTML = `<span class="text-primary font-bold">➜</span> <span class="text-secondary font-bold">~</span> <span class="text-white">${input}</span>`;
                terminalOutput.appendChild(cmdLine);

                // Process command
                const cmd = input.toLowerCase().split(' ')[0];
                let response = '';

                if (commands[cmd]) {
                    response = commands[cmd]();
                } else {
                    response = `<span class="text-red-400">Command not found: ${cmd}. Type 'help' for available commands.</span>`;
                }

                if (response) {
                    const respDiv = document.createElement('div');
                    respDiv.classList.add('mb-2', 'animate-fade-in');
                    respDiv.innerHTML = response;
                    terminalOutput.appendChild(respDiv);
                }

                // Clear input and scroll
                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        }
    });
}


// Start App
init();

// --- Data ---
const profileData = {
    roles: ["Full Stack Developer", "Software Engineer", "AI / ML Engineer"],
    bio: "Engineering intelligent, scalable systems from Dhaka, Bangladesh.\nI architect full-stack platforms and AI/ML pipelines that solve\nreal problems — from healthcare infrastructure to NLP classifiers.\nCurrently in my 4th year at United International University, shipping\nproducts and obsessing over clean architecture."
};

const skillsData = {
    languages: [
        { name: "C", pct: 92 }, { name: "C++", pct: 90 }, { name: "C#", pct: 88 },
        { name: "Java", pct: 90 }, { name: "Python", pct: 95 }, { name: "JavaScript", pct: 95 },
        { name: "TypeScript", pct: 92 }, { name: "PHP", pct: 85 }, { name: "Ruby", pct: 80 },
        { name: "Kotlin", pct: 82 }, { name: "Dart", pct: 85 }
    ],
    frameworks: [
        { name: "React", pct: 95 }, { name: "Next.js", pct: 92 }, { name: "Node.js", pct: 95 },
        { name: "Express", pct: 93 }, { name: "Flask", pct: 90 }, { name: "FastAPI", pct: 90 },
        { name: "Django", pct: 87 }, { name: "Laravel", pct: 85 }, { name: "Spring Boot", pct: 82 },
        { name: "Ruby on Rails", pct: 80 }, { name: "TensorFlow", pct: 90 }, { name: "PyTorch", pct: 90 },
        { name: "NumPy", pct: 95 }
    ],
    tools: [
        { name: "Git", pct: 95 }, { name: "GitHub", pct: 95 }, { name: "REST API", pct: 93 },
        { name: "Socket.IO", pct: 90 }, { name: "PostgreSQL", pct: 90 }, { name: "MySQL", pct: 90 },
        { name: "Supabase", pct: 88 }, { name: "Docker", pct: 82 }, { name: "VS Code", pct: 99 }
    ]
};

const projectsData = [
    { name: "MediConnect-BD.exe", status: "LIVE", type: "web ai", desc: "> Smart healthcare system with live queue, telemedicine,\n  e-prescriptions, AI symptom checker via Gemini API.", stack: ["React", "Node.js", "MySQL", "Socket.IO", "Gemini API"], demo: "#", source: "#" },
    { name: "KaajerBazar.exe", status: "LIVE", type: "web", desc: "> Micro-project marketplace for Bangladeshi students.\n  Inspired by Upwork/Fiverr, built for local needs.", stack: ["Next.js", "Tailwind CSS", "Claude API", "Supabase", "PostgreSQL"], demo: "#", source: "#" },
    { name: "FakeNewsDetector.exe", status: "LIVE", type: "ai", desc: "> Bangla + English fake news classifier with Chrome extension.\n  BERT-powered NLP pipeline with scraped dataset.", stack: ["React", "Flask", "BERT", "Hugging Face", "JavaScript"], demo: "#", source: "#" },
    { name: "VibeTalk.apk", status: "LIVE", type: "mobile", desc: "> Real-time social communication app.", stack: ["Flutter", "Node.js", "PostgreSQL"], demo: "#", source: "#" },
    { name: "FloodAlert.sys", status: "LIVE", type: "iot", desc: "> ESP32-based IoT system for real-time flood monitoring\n  and alerts.", stack: ["ESP32", "IoT Sensors", "Embedded C"], demo: "#", source: "#" },
    { name: "ResumeGen.exe", status: "LIVE", type: "web", desc: "> Advanced OOP-based resume builder with rich JavaFX interface.", stack: ["JavaFX", "SceneBuilder"], demo: "#", source: "#" },
    { name: "SpamClassifier.exe", status: "LIVE", type: "ai", desc: "> ML-based spam detection with clean web interface.", stack: ["React", "Flask", "Naive Bayes", "Logistic Reg."], demo: "#", source: "#" },
    { name: "SmartToDo.exe", status: "LIVE", type: "web ai", desc: "> Task manager with ML-powered automatic priority classification.", stack: ["React", "Node.js", "ML Classifier"], demo: "#", source: "#" }
];

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    runBootSequence();
    initCursor();
    initAmbientParticles();
    // initMatrixRain('matrix-canvas');
    initTypewriters();
    renderSkills();
    renderProjects('all');
    initScrollAnimations();
    // initSkillGlobe();
    initRadarChart();
    initMobileMenu();
    // initTerminalInput();
    // initKonamiCode();
    updateUptime();
    setInterval(updateUptime, 1000);
});

// --- Boot Sequence ---
function runBootSequence() {
    const bootLines = [
        "ULLAS_SYS KERNEL COMPILATION v4.0",
        "=====================================================",
        "[*] Loading core modules........................ [OK]",
        "[*] Mounting encrypted skill matrix............. [OK]",
        "[*] Establishing secure tunnel to Github........ [OK]",
        "[*] Injecting runtime environment............... [OK]",
        "[*] Bypassing mainframe security protocols...... [OK]",
        "=====================================================",
        ">> ROOT ACCESS GRANTED",
        ">> WELCOME, OMOR FARUK ULLAS.",
        "=====================================================",
        ">> INITIALIZING DASHBOARD..."
    ];
    
    const bootContainer = document.getElementById('boot-sequence');
    const bootText = document.getElementById('boot-text');
    
    // Check if user prefers reduced motion or already visited (simple session check)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('booted')) {
        bootContainer.style.display = 'none';
        return;
    }
    
    let currentLine = 0;
    document.body.style.overflow = 'hidden';

    function typeLine() {
        if (currentLine < bootLines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.textContent = bootLines[currentLine];
            bootText.appendChild(lineDiv);
            currentLine++;
            setTimeout(typeLine, Math.random() * 150 + 50); // Random typing speed
        } else {
            setTimeout(() => {
                bootContainer.classList.add('glitch-out');
                setTimeout(() => {
                    bootContainer.style.display = 'none';
                    document.body.style.overflow = '';
                    sessionStorage.setItem('booted', 'true');
                }, 300);
            }, 500);
        }
    }
    typeLine();
}

// --- Custom Cursor ---
function initCursor() {
    const cursor = document.getElementById('custom-cursor');
    const trail = document.getElementById('cursor-trail');
    
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursor.style.display = 'none';
        trail.style.display = 'none';
        return; // Don't run on touch devices
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Trail follows with slight delay
        setTimeout(() => {
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
        }, 50);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        trail.style.width = '10px';
        trail.style.height = '10px';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        trail.style.width = '6px';
        trail.style.height = '6px';
    });
}

// --- Canvases ---
function initAmbientParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 255, 65, 0.5)';
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initMatrixRain(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || window.matchMedia('(max-width: 480px)').matches) return; // Skip on mobile for perf
    const ctx = canvas.getContext('2d');
    
    // Parent element sizing
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(2, 12, 2, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 50);
}

// --- Typewriter Effects ---
function initTypewriters() {
    // Roles
    const roleEl = document.getElementById('typewriter-roles');
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeRole() {
        const currentRole = profileData.roles[roleIdx];
        if (isDeleting) {
            roleEl.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            roleEl.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIdx === currentRole.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % profileData.roles.length;
            speed = 500;
        }
        setTimeout(typeRole, speed);
    }
    setTimeout(typeRole, 1000);

    // Bio
    const bioEl = document.querySelector('.typewriter-bio');
    let bioCharIdx = 0;
    
    // Create an intersection observer to trigger bio typing
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && bioCharIdx === 0) {
            function typeBio() {
                if (bioCharIdx < profileData.bio.length) {
                    bioEl.innerHTML = profileData.bio.substring(0, bioCharIdx + 1).replace(/\n/g, '<br>');
                    bioCharIdx++;
                    setTimeout(typeBio, 30);
                }
            }
            typeBio();
            observer.disconnect();
        }
    });
    observer.observe(document.getElementById('about'));
}

// --- Skills & Progress Bars ---
function renderSkills() {
    function createSkillBar(skill) {
        const fillChar = '█';
        const emptyChar = '░';
        const totalBlocks = 20;
        const filledBlocks = Math.round((skill.pct / 100) * totalBlocks);
        let blocksStr = '';
        for(let i=0; i<totalBlocks; i++) {
            blocksStr += i < filledBlocks ? fillChar : emptyChar;
        }

        return `
            <div class="skill-item">
                <div class="skill-header">
                    <span>${skill.name}</span>
                    <span>[${skill.pct}%]</span>
                </div>
                <div class="matrix-bar-bg">
                    <div class="matrix-bar-fill" data-width="${skill.pct}%" style="width: 0;"></div>
                </div>
            </div>
        `;
    }

    document.getElementById('skills-languages').innerHTML = skillsData.languages.map(createSkillBar).join('');
    document.getElementById('skills-frameworks').innerHTML = skillsData.frameworks.map(createSkillBar).join('');
    document.getElementById('skills-tools').innerHTML = skillsData.tools.map(createSkillBar).join('');
}

// --- Projects ---
function renderProjects(filterType) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    const filtered = filterType === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.type.includes(filterType));

    filtered.forEach((p, idx) => {
        const tags = p.stack.map(s => `<span class="tech-tag">${s}</span>`).join('');
        const card = `
            <div class="project-card" style="animation: fadeUp 0.5s ${idx * 0.1}s backwards">
                <div class="project-header">
                    <span>[ ${p.name} ]</span>
                    <span class="project-status">[${p.status}]</span>
                </div>
                <div class="project-desc">${p.desc}</div>
                <div class="project-stack">
                    ${tags}
                </div>
                <div class="project-links">
                    <a href="${p.demo}" class="project-link">> DEMO</a>
                    <a href="${p.source}" class="project-link">> SOURCE</a>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProjects(e.target.dataset.filter);
    });
});

// --- Scroll Animations & Interactions ---
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate counters
                if (entry.target.id === 'about') {
                    document.querySelectorAll('.counter').forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const updateCount = () => {
                            const inc = target / 50;
                            if (count < target) {
                                count += inc;
                                counter.innerText = Math.ceil(count);
                                setTimeout(updateCount, 40);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                }
                
                // Animate skill bars
                if (entry.target.id === 'skills') {
                    setTimeout(() => {
                        document.querySelectorAll('.matrix-bar-fill').forEach((bar, i) => {
                            setTimeout(() => {
                                bar.style.width = bar.getAttribute('data-width');
                            }, i * 50); // Staggered
                        });
                        drawRadarChart();
                    }, 500);
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// --- 3D Skill Globe ---
function initSkillGlobe() {
    const container = document.getElementById('skill-globe-container');
    if (!container) return;
    
    // Combine all skills for globe
    const allSkills = [...skillsData.languages, ...skillsData.frameworks, ...skillsData.tools].map(s => s.name);
    
    const radius = window.innerWidth < 768 ? 80 : 120;
    
    allSkills.forEach((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / allSkills.length);
        const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
        
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        const el = document.createElement('div');
        el.className = 'skill-tag';
        el.innerText = skill;
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        
        // Simple scaling based on Z
        const scale = (z + radius) / (2 * radius) * 0.5 + 0.5;
        el.style.fontSize = `${scale * 1.5}rem`;
        el.style.opacity = scale;
        
        container.appendChild(el);
    });

    let angleX = 0;
    let angleY = 0;
    
    function animateGlobe() {
        angleX += 0.005;
        angleY += 0.005;
        
        const tags = container.querySelectorAll('.skill-tag');
        tags.forEach((tag, i) => {
            const phi = Math.acos(-1 + (2 * i) / allSkills.length);
            const theta = Math.sqrt(allSkills.length * Math.PI) * phi + angleY;
            
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            
            tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            const scale = (z + radius) / (2 * radius) * 0.5 + 0.5;
            tag.style.fontSize = `${scale * 1.5}rem`;
            tag.style.opacity = scale;
            tag.style.zIndex = Math.round(z);
        });
        
        requestAnimationFrame(animateGlobe);
    }
    animateGlobe();
}

// --- Radar Chart ---
let radarDrawn = false;
function initRadarChart() {
    const canvas = document.getElementById('skill-radar');
    if (!canvas) return;
    canvas.width = 400;
    canvas.height = 400;
}

function drawRadarChart() {
    if (radarDrawn) return;
    const canvas = document.getElementById('skill-radar');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;
    
    const labels = ["Frontend", "Backend", "AI/ML", "Mobile", "IoT", "DevOps"];
    const values = [0.95, 0.90, 0.85, 0.70, 0.60, 0.80]; // 0 to 1
    
    const sides = 6;
    const angle = (Math.PI * 2) / sides;
    
    // Draw background grid
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.2)';
    ctx.lineWidth = 1;
    for(let i=1; i<=5; i++) {
        ctx.beginPath();
        for(let j=0; j<sides; j++) {
            const r = radius * (i/5);
            const x = centerX + r * Math.sin(j * angle);
            const y = centerY - r * Math.cos(j * angle);
            if(j===0) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Draw axes
    for(let j=0; j<sides; j++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const x = centerX + radius * Math.sin(j * angle);
        const y = centerY - radius * Math.cos(j * angle);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#00ffff';
        ctx.font = '12px "Share Tech Mono"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const lx = centerX + (radius + 20) * Math.sin(j * angle);
        const ly = centerY - (radius + 20) * Math.cos(j * angle);
        ctx.fillText(labels[j], lx, ly);
    }

    // Draw data polygon with animation
    let progress = 0;
    function animateData() {
        progress += 0.05;
        if (progress > 1) progress = 1;
        
        ctx.clearRect(0,0, canvas.width, canvas.height); // clear and redraw bg ideally, but keeping it simple
        initRadarChart(); // Reset canvas
        // Redraw grid
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.2)';
        ctx.lineWidth = 1;
        for(let i=1; i<=5; i++) {
            ctx.beginPath();
            for(let j=0; j<sides; j++) {
                const r = radius * (i/5);
                const x = centerX + r * Math.sin(j * angle);
                const y = centerY - r * Math.cos(j * angle);
                if(j===0) ctx.moveTo(x,y);
                else ctx.lineTo(x,y);
            }
            ctx.closePath();
            ctx.stroke();
        }
        for(let j=0; j<sides; j++) {
            ctx.beginPath(); ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + radius * Math.sin(j * angle), centerY - radius * Math.cos(j * angle));
            ctx.stroke();
            ctx.fillStyle = '#00ffff'; ctx.font = '12px "Share Tech Mono"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(labels[j], centerX + (radius + 20) * Math.sin(j * angle), centerY - (radius + 20) * Math.cos(j * angle));
        }

        ctx.beginPath();
        for(let j=0; j<sides; j++) {
            const val = values[j] * progress;
            const x = centerX + (radius * val) * Math.sin(j * angle);
            const y = centerY - (radius * val) * Math.cos(j * angle);
            if(j===0) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (progress < 1) requestAnimationFrame(animateData);
        else radarDrawn = true;
    }
    animateData();
}

// --- Terminal Input ---
function initTerminalInput() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    
    // WPM tracking
    let charCount = 0;
    let startTime = 0;
    let wpmTimer = null;
    const wpmEl = document.getElementById('wpm-val');

    input.addEventListener('input', () => {
        if (!startTime) startTime = Date.now();
        charCount++;
        
        clearTimeout(wpmTimer);
        wpmTimer = setTimeout(() => {
            const timeMin = (Date.now() - startTime) / 60000;
            const words = charCount / 5;
            const wpm = Math.round(words / timeMin);
            wpmEl.innerText = isNaN(wpm) ? '--' : wpm;
            // Reset after 2s of inactivity
            startTime = 0;
            charCount = 0;
        }, 2000);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';
            
            let response = '';
            switch(cmd) {
                case 'help': response = 'Available commands: help, whoami, skills, projects, contact, clear, sudo, hire'; break;
                case 'whoami': response = 'Omor Faruk Ullas - Full Stack & AI/ML Engineer.'; break;
                case 'skills': document.getElementById('skills').scrollIntoView(); response = 'Scanning skills matrix...'; break;
                case 'projects': document.getElementById('projects').scrollIntoView(); response = 'Loading projects database...'; break;
                case 'contact': document.getElementById('contact').scrollIntoView(); response = 'Opening secure comms channel...'; break;
                case 'clear': output.innerText = ''; return;
                case 'sudo': response = 'Permission denied. Nice try. This incident will be reported.'; break;
                case 'hire': document.getElementById('contact').scrollIntoView(); response = 'Excellent choice. Redirecting to secure channel...'; break;
                case '': return;
                default: response = `bash: ${cmd}: command not found`;
            }
            output.innerText = `> ${cmd}\n${response}`;
        }
    });
}

// --- Konami Code ---
function initKonamiCode() {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konami[konamiIndex] || e.key === konami[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konami.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function triggerEasterEgg() {
    const egg = document.getElementById('matrix-easter-egg');
    egg.style.display = 'block';
    initMatrixRain('matrix-easter-canvas');
    setTimeout(() => {
        egg.style.opacity = '0';
        egg.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            egg.style.display = 'none';
            egg.style.opacity = '1';
        }, 1000);
    }, 4000);
}

// --- Utils ---
function updateUptime() {
    const start = new Date('2022-01-01T00:00:00');
    const now = new Date();
    const diff = now - start;
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    
    const el = document.getElementById('uptime-counter');
    if (el) el.innerText = `${d}d ${h.toString().padStart(2,'0')}h ${m.toString().padStart(2,'0')}m ${s.toString().padStart(2,'0')}s`;
}

function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-menu-btn');
    const linksContainer = document.querySelector('.mobile-links');
    
    const links = [
        {text: '[ABOUT]', href: '#about'},
        {text: '[SKILLS]', href: '#skills'},
        {text: '[PROJECTS]', href: '#projects'},
        {text: '[EDUCATION]', href: '#education'},
        {text: '[CONTACT]', href: '#contact'}
    ];

    btn.addEventListener('click', () => {
        overlay.style.display = 'flex';
        linksContainer.innerHTML = '';
        
        // Typewriter effect for links
        links.forEach((link, idx) => {
            setTimeout(() => {
                const a = document.createElement('a');
                a.href = link.href;
                a.className = 'nav-link';
                a.style.display = 'block';
                a.innerText = link.text;
                a.addEventListener('click', () => overlay.style.display = 'none');
                linksContainer.appendChild(a);
            }, idx * 200);
        });
    });

    closeBtn.addEventListener('click', () => overlay.style.display = 'none');
}

// Contact Form 
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = '[ TRANSMITTING... ]';
    
    setTimeout(() => {
        btn.innerText = 'MESSAGE DELIVERED ✓';
        btn.style.color = 'var(--accent-cyan)';
        btn.style.borderColor = 'var(--accent-cyan)';
        e.target.reset();
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 3000);
    }, 1500);
});

// ============================================
// MAIN JAVASCRIPT FILE FOR PORTFOLIO INTERACTIVITY
// ============================================

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar/Header interactivity
class HeaderManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.isScrolled = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateHeaderOnScroll());
        this.addHeaderInteractivity();
    }

    updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            if (!this.isScrolled) {
                this.header?.classList.add('scrolled');
                this.isScrolled = true;
            }
        } else {
            this.header?.classList.remove('scrolled');
            this.isScrolled = false;
        }
    }

    addHeaderInteractivity() {
        // Add hover effects to header
        this.header?.addEventListener('mouseenter', () => {
            this.header?.classList.add('hovered');
        });
        this.header?.addEventListener('mouseleave', () => {
            this.header?.classList.remove('hovered');
        });
    }
}

// Button interactivity with ripple effect
class ButtonManager {
    constructor() {
        this.buttons = document.querySelectorAll('button');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
            button.addEventListener('mouseenter', () => this.addHoverClass(button));
            button.addEventListener('mouseleave', () => this.removeHoverClass(button));
        });
    }

    createRipple(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    addHoverClass(button) {
        button.classList.add('btn-hover');
    }

    removeHoverClass(button) {
        button.classList.remove('btn-hover');
    }
}

// Intersection Observer for fade-in animations
class AnimationObserver {
    constructor() {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), this.options);
        this.init();
    }

    init() {
        // Observe sections for fade-in animation
        document.querySelectorAll('section, .light, .dark, .skill, .certified').forEach(element => {
            element.classList.add('fade-in');
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }
}

// Theme Toggle (Dark/Light mode)
class ThemeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.createToggleButton();
    }

    createToggleButton() {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'theme-toggle-btn';
        toggleBtn.textContent = this.theme === 'light' ? '🌙' : '☀️';
        toggleBtn.title = `Switch to ${this.theme === 'light' ? 'dark' : 'light'} mode`;
        
        toggleBtn.addEventListener('click', () => this.toggleTheme());
        
        document.body.appendChild(toggleBtn);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);
        
        const toggleBtn = document.getElementById('theme-toggle');
        toggleBtn.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
            document.documentElement.style.setProperty('--text-color', '#ffffff');
        } else {
            document.documentElement.style.setProperty('--bg-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#000000');
        }
    }
}

// Form handling with validation
class FormValidator {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
    }

    handleSubmit(e, form) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
                this.showError(input);
            } else {
                this.clearError(input);
            }
        });

        if (isValid) {
            this.showSuccess(form);
            form.reset();
        }
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (!value) return false;
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }
        
        if (field.name === 'phone') {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            return phoneRegex.test(value) && value.length >= 10;
        }
        
        return true;
    }

    showError(field) {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
    }

    clearError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
    }

    showSuccess(form) {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = '✓ Message sent successfully!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }
}

// Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.progressBar = document.createElement('div');
        this.progressBar.id = 'scroll-progress';
        this.progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            z-index: 1001;
            width: 0%;
        `;
        document.body.appendChild(this.progressBar);
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateProgress());
    }

    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        this.progressBar.style.width = scrolled + '%';
    }
}

// Active Navigation Link Indicator
class ActiveNavigation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section, .light, .dark, .skill, .certified');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
}

// Initialize all modules on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new HeaderManager();
    new ButtonManager();
    new AnimationObserver();
    new ThemeToggle();
    new FormValidator();
    new ScrollProgress();
    new ActiveNavigation();
    
    console.log('✓ Portfolio interactivity loaded successfully!');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press '/' to focus search or show commands
    if (e.key === '/' && !document.activeElement.matches('input, textarea')) {
        e.preventDefault();
        console.log('Command palette would open here');
    }
    
    // Press 'Escape' to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the theme preference
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode when the button is clicked
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save the preference
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
    
    // Apply smooth scrolling to anchor links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 60, // Adjust for the sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active nav section based on scroll position
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = [...navLinks].map(link => {
        const id = link.getAttribute('href');
        return document.querySelector(id);
    });
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 70; // Adjust for header
        
        sections.forEach((section, index) => {
            if (!section) return;
            
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }
    
    // Add a small animation to the code snippets
    document.querySelectorAll('pre code').forEach(block => {
        const lines = block.innerHTML.split('\n');
        let html = '';
        
        lines.forEach((line, index) => {
            if (line.trim() !== '') {
                html += `<div class="code-line" style="animation-delay: ${index * 50}ms">${line}</div>`;
            } else {
                html += '<div class="code-line" style="height: 1em;"></div>';
            }
        });
        
        block.innerHTML = html;
    });
    
    // Initial call to highlight the active section
    highlightActiveSection();
    
    // Add scroll event listener
    window.addEventListener('scroll', highlightActiveSection);
});
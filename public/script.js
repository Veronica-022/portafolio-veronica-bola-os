      // Theme Toggle
        const themeSwitch = document.getElementById('theme-switch');
        const body = document.body;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
        }

        themeSwitch.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Mobile menu functionality
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = body.classList.contains('light-theme') 
                    ? 'rgba(255, 255, 255, 0.95)' 
                    : 'rgba(10, 10, 10, 0.95)';
            } else {
                header.style.background = body.classList.contains('light-theme') 
                    ? 'rgba(255, 255, 255, 0.8)' 
                    : 'rgba(10, 10, 10, 0.8)';
            }
        });

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('¡Mensaje enviado correctamente! Te responderé pronto.');
                    contactForm.reset();
                } else {
                    throw new Error('Error en el envío');
                }
            } catch (error) {
                alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

        // Typing animation for hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing animation when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-title');
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            const heroImage = document.querySelector('.hero-image');
            
            if (hero && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
                heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add skill card animations with delay
        document.querySelectorAll('.skill-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Add floating animation to hero elements
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 2}s`;
        });

        // Initialize scroll animations for skill and project cards
        setTimeout(() => {
            document.querySelectorAll('.skill-card, .project-card').forEach((card, index) => {
                card.style.opacity = '1';
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }, 100);
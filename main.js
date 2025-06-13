// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    if (hamburger && document.querySelector('.nav-links')) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            (document.querySelector('.nav-links')).classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close mobile menu when a nav link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                (document.querySelector('.nav-links')).classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a'); 

    function setActiveLink() {
        const headerHeight = document.querySelector('header').offsetHeight;
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        
        if (navLinks.length > 0) {
            navLinks.forEach(link => { 
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', setActiveLink);

    // Initialize active link on page load
    setActiveLink();

    
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simulate form submission (in a real app, this would send data to a server)
            console.log('Form submitted:', { name, email, message });

            // Show success message (assuming showNotification is available globally or imported)
            showNotification('Thank you for your message! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }

    // Animations on scroll
    const animateOnScroll = () => {
        const elementsToAnimate = document.querySelectorAll('.section-header, .menu-item, .about-content, .contact-content');

        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .menu-item, .about-content, .contact-content {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .section-header.animate, .menu-item.animate, .about-content.animate, .contact-content.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .menu-item {
          transition-delay: calc(var(--i, 0) * 0.1s);
        }
    `;
    document.head.appendChild(style);

    // Set animation delay for menu items
    const menuItemsAnimated = document.querySelectorAll('.menu-item'); // Renommé pour éviter conflit avec le tableau de données
    menuItemsAnimated.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    
});
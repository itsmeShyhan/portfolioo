/**
 * Portfolio Website - Main JavaScript
 * Author: Your Name
 * Description: Functionality for a professional software engineer portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const contactForm = document.getElementById('contactForm');
    const currentYear = document.getElementById('year');

    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /**
     * Handle sticky navbar on scroll
     */
    window.addEventListener('scroll', () => {
        // Add sticky class to navbar when scrolling down
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Show/hide scroll to top button
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // Highlight active section in navbar
        highlightActiveSection();
    });

    /**
     * Mobile menu functionality
     */
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    /**
     * Close mobile menu when clicking on a nav link
     */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /**
     * Smooth scrolling for anchor links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip for # links

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            // Calculate position to scroll to (with navbar offset)
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    /**
     * Project filtering functionality
     */
    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Get filter value
                const filterValue = btn.getAttribute('data-filter');

                // Filter projects
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /**
     * Highlight active section in navbar based on scroll position
     */
    function highlightActiveSection() {
        // Get current scroll position
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;

        // Check each section and highlight corresponding nav link
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding nav link
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    /**
     * Contact form submission handling
     * Note: This is a basic implementation. In a real application, you would
     * typically send the form data to a server using AJAX or fetch.
     */
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formDataObject = {};

            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });

            // Example: Log form data to console (in a real app, you would send this to your server)
            console.log('Form Data:', formDataObject);

            // EDIT: Add your actual form submission logic here
            // For example:
            // fetch('your-api-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formDataObject),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle successful form submission
            //     alert('Message sent successfully!');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     // Handle error
            //     console.error('Error:', error);
            //     alert('Failed to send message. Please try again later.');
            // });

            // For now, just show a success message and reset the form
            alert('Thank you for your message! This is a demo form and does not actually send emails.');
            this.reset();
        });
    }

    /**
     * Animation on scroll (simple implementation)
     * Add 'animate' class to elements when they enter the viewport
     *
     * Note: For more complex animations, consider using libraries like
     * AOS (Animate On Scroll) or GSAP.
     */
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.animate');

        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 50) {
                element.classList.add('active');
            }
        });
    }

    // Initial call to set up animations
    animateOnScroll();

    // Listen for scroll events to trigger animations
    window.addEventListener('scroll', animateOnScroll);

    /**
     * Resume download analytics (optional)
     * Track when users download your resume
     */
    const resumeBtn = document.querySelector('a[href="resume.pdf"]');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function() {
            // EDIT: Add your analytics tracking code here
            console.log('Resume downloaded');
        });
    }

    /**
     * Project modal view (optional enhancement)
     * If you want to add modal popups for project details
     */
    // Uncomment this section if you add modal functionality to your HTML
    /*
    const projectLinks = document.querySelectorAll('.project-link');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Open modal when clicking on project
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModalId = this.getAttribute('data-modal');
            const targetModal = document.getElementById(targetModalId);

            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking close button
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside of modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    */
});

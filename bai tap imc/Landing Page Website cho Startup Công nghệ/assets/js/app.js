// Main Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Initialize Swiper Testimonial Slider
    if (document.querySelector('.testimonial-slider')) {
        const testimonialSwiper = new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Set active menu item based on current page
    function setActiveMenu() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (linkPage === 'index.html' && currentPage === '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveMenu();
    
    // Pricing Toggle (Monthly/Yearly)
    const pricingToggle = document.getElementById('pricingToggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const monthlyPrices = document.querySelectorAll('.price-amount.monthly');
            const yearlyPrices = document.querySelectorAll('.price-amount.yearly');
            
            if (this.classList.contains('active')) {
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'inline');
            } else {
                monthlyPrices.forEach(price => price.style.display = 'inline');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }
    
    // Feature Card 3D Hover Effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // Video Modal
    const videoButtons = document.querySelectorAll('.video-btn');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const modalClose = document.getElementById('modalClose');
    
    if (videoModal) {
        videoButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const videoId = this.getAttribute('data-video-id');
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        modalClose.addEventListener('click', function() {
            videoModal.classList.remove('active');
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        });
        
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                videoModal.classList.remove('active');
                videoFrame.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Form Validation and Submission
    const ctaForm = document.getElementById('ctaForm');
    const contactForm = document.getElementById('contactForm');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate form function
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            const errorElement = document.getElementById(`${input.id}Error`);
            
            // Reset error
            if (errorElement) {
                errorElement.textContent = '';
            }
            
            // Check if empty
            if (!input.value.trim()) {
                isValid = false;
                if (errorElement) {
                    errorElement.textContent = 'Trường này là bắt buộc';
                }
                input.style.borderColor = '#f94144';
            } 
            // Check email format
            else if (input.type === 'email' && !emailRegex.test(input.value)) {
                isValid = false;
                if (errorElement) {
                    errorElement.textContent = 'Email không hợp lệ';
                }
                input.style.borderColor = '#f94144';
            }
            // Check checkbox
            else if (input.type === 'checkbox' && !input.checked) {
                isValid = false;
                if (errorElement) {
                    errorElement.textContent = 'Bạn phải đồng ý với điều khoản';
                }
            } 
            else {
                input.style.borderColor = '#4cc9f0';
            }
        });
        
        return isValid;
    }
    
    // CTA Form Submission
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('.btn-submit');
                const emailInput = document.getElementById('ctaEmail');
                
                // Show loading state
                submitBtn.classList.add('loading');
                
                // Simulate API call
                setTimeout(() => {
                    // Save to localStorage
                    const userData = {
                        email: emailInput.value,
                        date: new Date().toISOString(),
                        source: 'homepage_cta'
                    };
                    
                    localStorage.setItem('techhub_lead', JSON.stringify(userData));
                    
                    // Hide loading state
                    submitBtn.classList.remove('loading');
                    
                    // Show success toast
                    showToast('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset border colors
                    const inputs = this.querySelectorAll('.form-input');
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                    });
                }, 1500);
            }
        });
    }
    
    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('.btn-submit');
                
                // Show loading state
                submitBtn.classList.add('loading');
                
                // Collect form data
                const formData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('contactEmail').value,
                    company: document.getElementById('company').value || 'N/A',
                    plan: document.getElementById('plan').value,
                    message: document.getElementById('message').value,
                    date: new Date().toISOString()
                };
                
                // Simulate API call
                setTimeout(() => {
                    // Save to localStorage
                    localStorage.setItem('techhub_contact', JSON.stringify(formData));
                    
                    // Hide loading state
                    submitBtn.classList.remove('loading');
                    
                    // Show success toast
                    showToast('Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi trong 24h.');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset border colors
                    const inputs = this.querySelectorAll('.form-input');
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                    });
                }, 2000);
            }
        });
    }
    
    // Toast Notification System
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastClose = document.getElementById('toastClose');
    
    function showToast(message) {
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }
    }
    
    if (toastClose) {
        toastClose.addEventListener('click', function() {
            toast.classList.remove('show');
        });
    }
    
    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Hero section animation
        gsap.from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-buttons', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 0.6,
            ease: 'power3.out'
        });
        
        // Parallax effect for hero shapes
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const shape1 = document.querySelector('.shape-1');
            const shape2 = document.querySelector('.shape-2');
            const shape3 = document.querySelector('.shape-3');
            
            if (shape1) {
                gsap.to(shape1, {
                    y: scrolled * 0.1,
                    rotation: scrolled * 0.01,
                    ease: 'none'
                });
            }
            
            if (shape2) {
                gsap.to(shape2, {
                    y: scrolled * 0.15,
                    rotation: scrolled * 0.02,
                    ease: 'none'
                });
            }
            
            if (shape3) {
                gsap.to(shape3, {
                    y: scrolled * 0.2,
                    rotation: scrolled * 0.03,
                    ease: 'none'
                });
            }
        });
        
        // Initialize ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                trigger: '.features',
                start: 'top center',
                onEnter: () => {
                    gsap.from('.feature-card', {
                        duration: 0.8,
                        y: 50,
                        opacity: 0,
                        stagger: 0.2,
                        ease: 'back.out(1.7)'
                    });
                }
            });
            
            // Parallax pricing cards
            const pricingCards = document.querySelectorAll('.pricing-card');
            pricingCards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1
                });
            });
        }
    }
    
    // One-page scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update copyright year automatically
    const copyrightElements = document.querySelectorAll('.footer-bottom p:first-child');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        if (element.textContent.includes('2024')) {
            element.textContent = element.textContent.replace('2024', currentYear);
        }
    });
});
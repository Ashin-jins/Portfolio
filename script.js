/* ==========================================================================
   INITIALIZATION & DOM ELEMENTS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  
  // Navigation & Header
  const header = document.getElementById('site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const body = document.body;
  
  // Scroll Actions
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top');
  
  // Reveal elements
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const sections = document.querySelectorAll('.nav-section');

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  // Theme Switcher System (iOS UI style)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('ashin-portfolio-theme') || 'dark-theme';
  body.className = savedTheme;

  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-checked', savedTheme === 'light-theme' ? 'true' : 'false');
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('ashin-portfolio-theme', 'light-theme');
        themeToggleBtn.setAttribute('aria-checked', 'true');
      } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('ashin-portfolio-theme', 'dark-theme');
        themeToggleBtn.setAttribute('aria-checked', 'false');
      }
    });
  }

  /* ==========================================================================
     STICKY HEADER & MOB MENU SYSTEM
     ========================================================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    const isOpen = mobileNav.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // prevent scrolling when menu is open
    } else {
      document.body.style.overflow = '';
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close Mobile Menu on Nav Links click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ==========================================================================
     DYNAMIC TYPING EFFECT
     ========================================================================== */
  const typedRoleElement = document.getElementById('typed-role');
  if (typedRoleElement) {
    const roles = [
      "BCA Student @ Don Bosco College",
      "Gen AI & Cloud Computing Intern",
      "Full-Stack Web Developer",
      "Python & AI Solutions Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    
    const typeEffect = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        // Deleting characters
        typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 50; // speed up deleting
      } else {
        // Typing characters
        typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 120; // normal typing delay
      }
      
      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing role: pause before deleting
        isDeleting = true;
        typeDelay = 1800; // pause duration
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting role: cycle to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeDelay = 300; // brief delay before typing next
      }
      
      setTimeout(typeEffect, typeDelay);
    };
    
    // Start the typing loop
    setTimeout(typeEffect, 800);
  }

  /* ==========================================================================
     SCROLL PROGRESS & SCROLL TO TOP
     ========================================================================== */
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update scroll progress bar width
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }
    
    // Toggle scroll to top button visibility
    if (scrollTop > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Smooth scroll back to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ==========================================================================
     SCROLL REVEAL SYSTEM (INTERSECTION OBSERVER)
     ========================================================================== */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once element is revealed, we stop observing it
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null, // viewport
      threshold: 0.1, // trigger when 10% of element is visible
      rootMargin: '0px 0px -40px 0px' // adjust bottom margin for earlier triggering
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    // Active Section Navbar Highlighting on Scroll
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      root: null,
      threshold: 0.4 // trigger when 40% of section is visible
    });

    sections.forEach(sec => {
      sectionObserver.observe(sec);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Direct Contact layout handles link triggers automatically without submission script.

});

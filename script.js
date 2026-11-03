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

  /* ==========================================================================
     INTERACTIVE SPIDEY WEB CANVAS ENGINE
     ========================================================================== */
  const canvas = document.getElementById('spidey-web-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates & state
    const mouse = {
      x: null,
      y: null,
      radius: 190, // Connection threshold to cursor
      active: false
    };

    // Responsive node count
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const nodeCount = isMobile ? 25 : Math.min(75, Math.floor((width * height) / 18000));
    const nodes = [];

    class WebNode {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.baseRadius = Math.random() * 1.8 + 1.2;
        this.radius = this.baseRadius;
      }

      update() {
        // Bounce off canvas boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interaction with cursor (tensile pull like a spider web)
        if (mouse.active && mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const pullForce = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * pullForce * 1.8;
            this.y += (dy / dist) * pullForce * 1.8;
            this.radius = this.baseRadius * 1.4;
          } else {
            this.radius = this.baseRadius;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new WebNode());
    }

    // Burst Web Strike particles on click
    let webBursts = [];
    window.addEventListener('click', (e) => {
      for (let i = 0; i < 12; i++) {
        const angle = ((Math.PI * 2) / 12) * i + Math.random() * 0.2;
        webBursts.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * (Math.random() * 6 + 4),
          vy: Math.sin(angle) * (Math.random() * 6 + 4),
          life: 1.0,
          decay: 0.035
        });
      }
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Main animation loop
    const animateWeb = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw web links between nodes
      const maxConnectDist = 120;
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw Spidey silk threads connecting to cursor!
        if (mouse.active && mouse.x !== null) {
          const dx = mouse.x - nodes[i].x;
          const dy = mouse.y - nodes[i].y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.85;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            // Dynamic curve / tension towards cursor
            const midX = (nodes[i].x + mouse.x) / 2 + (Math.random() - 0.5) * 4;
            const midY = (nodes[i].y + mouse.y) / 2 + (Math.random() - 0.5) * 4;
            ctx.quadraticCurveTo(midX, midY, mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = (1 - dist / mouse.radius) * 2.2 + 0.5;
            ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
            ctx.shadowBlur = 8;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Small glowing dewdrop on web connection
            ctx.beginPath();
            ctx.arc(midX, midY, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
          }
        }
      }

      // Draw active web strike bursts
      for (let i = webBursts.length - 1; i >= 0; i--) {
        const b = webBursts[i];
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        b.x += b.vx;
        b.y += b.vy;
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.life})`;
        ctx.lineWidth = b.life * 2;
        ctx.stroke();

        b.life -= b.decay;
        if (b.life <= 0) {
          webBursts.splice(i, 1);
        }
      }

      requestAnimationFrame(animateWeb);
    };

    requestAnimationFrame(animateWeb);
  }

  /* ==========================================================================
     INTERACTIVE AIMING EYE (GAZE & RETICLE TRACKER)
     ========================================================================== */
  const aimingEye = document.getElementById('aiming-eye');
  const eyeIris = document.getElementById('eye-iris');
  const eyeOuter = document.querySelector('.eye-outer');
  const eyeStatusLabel = document.querySelector('.eye-status-label');

  if (aimingEye && eyeIris) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const rect = aimingEye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.hypot(deltaX, deltaY);

      // Max pupil offset within sclera
      const maxOffset = 9;
      const offset = Math.min(maxOffset, distance / 35);

      targetX = Math.cos(angle) * offset;
      targetY = Math.sin(angle) * offset;
    });

    // Smooth eye gaze interpolation
    const updateEyeGaze = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      eyeIris.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(updateEyeGaze);
    };
    requestAnimationFrame(updateEyeGaze);

    // Natural Eye Blink Loop
    const triggerBlink = () => {
      if (eyeOuter) {
        eyeOuter.classList.add('blinking');
        setTimeout(() => {
          eyeOuter.classList.remove('blinking');
        }, 160);
      }
      const nextBlink = Math.random() * 3500 + 3000;
      setTimeout(triggerBlink, nextBlink);
    };
    setTimeout(triggerBlink, 3000);
  }

  /* ==========================================================================
     AIMING RETICLE CUSTOM CURSOR ENGINE
     ========================================================================== */
  const cursorDot = document.getElementById('spidey-cursor-dot');
  const cursorRing = document.getElementById('spidey-cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    window.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    // Smooth cursor ring lerp
    const updateCursorRing = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(updateCursorRing);
    };
    requestAnimationFrame(updateCursorRing);

    // Interactive element lock-on targeting
    const interactiveTargets = document.querySelectorAll(
      'a, button, .glass-card, .tag, .tech-pill, .fact-card, .contact-detail-item, .project-feature-item, .ios-theme-toggle'
    );

    interactiveTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        cursorRing.classList.add('locked-on');
        cursorDot.classList.add('locked-on');
        if (aimingEye && eyeStatusLabel) {
          aimingEye.classList.add('locked');
          eyeStatusLabel.innerHTML = '<span class="eye-status-dot"></span> LOCKED';
        }
      });

      target.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('locked-on');
        cursorDot.classList.remove('locked-on');
        if (aimingEye && eyeStatusLabel) {
          aimingEye.classList.remove('locked');
          eyeStatusLabel.innerHTML = '<span class="eye-status-dot"></span> AIMING';
        }
      });
    });

    // Click effect (web tension release)
    window.addEventListener('mousedown', () => {
      cursorRing.classList.add('clicking');
      cursorDot.classList.add('clicking');
    });

    window.addEventListener('mouseup', () => {
      cursorRing.classList.remove('clicking');
      cursorDot.classList.remove('clicking');
    });
  }

});

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
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ==========================================================================
     ACTIVE NAVIGATION POSITION ANIMATION ENGINE (HEADER PILL & SIDE RUNNER)
     ========================================================================== */
  const navList = document.querySelector('.nav-list');
  const navPill = document.getElementById('nav-active-pill');
  const sideRunner = document.getElementById('side-nav-runner');
  const sideNavItems = document.querySelectorAll('.side-nav-item');

  // Move header indicator pill to target link with animated position & width
  const moveNavPillTo = (targetLink) => {
    if (!navPill || !navList || !targetLink) return;
    const linkRect = targetLink.getBoundingClientRect();
    const listRect = navList.getBoundingClientRect();

    const offsetX = linkRect.left - listRect.left;
    const width = linkRect.width;

    navPill.style.transform = `translateX(${offsetX}px)`;
    navPill.style.width = `${width}px`;
    navPill.style.opacity = '1';
  };

  // Move side nav runner to target item
  const moveSideRunnerTo = (targetItem) => {
    if (!sideRunner || !targetItem) return;
    const track = targetItem.parentElement;
    const trackRect = track.getBoundingClientRect();
    const itemRect = targetItem.getBoundingClientRect();

    const offsetY = itemRect.top - trackRect.top;
    sideRunner.style.transform = `translate(-50%, ${offsetY}px)`;
    sideRunner.style.opacity = '1';
  };

  // Synchronize navigation on scroll dynamically
  const updateActiveSectionOnScroll = () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    let currentSectionId = '';

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (!currentSectionId && window.scrollY < 200) {
      currentSectionId = 'home';
    }

    if (currentSectionId) {
      // Update desktop header links & slide pill
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
          moveNavPillTo(link);
        } else {
          link.classList.remove('active');
        }
      });

      // Update mobile links
      mobileNavLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Update side nav dots & slide runner
      sideNavItems.forEach((item) => {
        if (item.getAttribute('href') === `#${currentSectionId}`) {
          item.classList.add('active');
          moveSideRunnerTo(item);
        } else {
          item.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateActiveSectionOnScroll, { passive: true });
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) moveNavPillTo(activeLink);
    const activeSideItem = document.querySelector('.side-nav-item.active');
    if (activeSideItem) moveSideRunnerTo(activeSideItem);
  });

  // Smooth hover previews on header nav items
  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      moveNavPillTo(link);
    });
  });

  if (navList) {
    navList.addEventListener('mouseleave', () => {
      const activeLink = document.querySelector('.nav-link.active');
      if (activeLink) moveNavPillTo(activeLink);
    });
  }

  // Initial trigger after DOM ready
  setTimeout(() => {
    updateActiveSectionOnScroll();
  }, 120);

  // Direct Contact layout handles link triggers automatically without submission script.

  /* ==========================================================================
     INTERACTIVE SPIDEY WEB EDGE-CATCH & STICK ENGINE
     ========================================================================== */
  const canvas = document.getElementById('spidey-web-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates & movement tracking
    const mouse = {
      x: -500,
      y: -500,
      prevX: -500,
      prevY: -500,
      speed: 0,
      active: false
    };

    // Sticking & Catching Thresholds
    const EDGE_CATCH_DIST = 160;   // Distance from viewport edge to trigger catch
    const CORNER_CATCH_DIST = 240; // Distance from corner to trigger corner net
    const MAX_STRETCH_DIST = 380;  // Maximum distance before web snaps/releases
    const CARD_CATCH_DIST = 75;    // Distance from card borders to catch web
    const CARD_MAX_STRETCH = 260;  // Card web max stretch

    // Active stuck webs: Map<id, StuckWeb>
    const stuckWebs = new Map();
    const snapParticles = [];

    // Query interactive card targets
    let cachedCardRects = [];
    const refreshCardRects = () => {
      const cards = document.querySelectorAll('.glass-card, .info-card, .project-card, .cert-card, .fact-card');
      cachedCardRects = [];
      cards.forEach((card, index) => {
        const r = card.getBoundingClientRect();
        // Only include cards currently visible in viewport
        if (r.bottom > 0 && r.top < height && r.right > 0 && r.left < width) {
          cachedCardRects.push({
            id: `card-${index}`,
            left: r.left,
            top: r.top,
            right: r.right,
            bottom: r.bottom,
            width: r.width,
            height: r.height
          });
        }
      });
    };

    refreshCardRects();
    window.addEventListener('scroll', refreshCardRects, { passive: true });
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      refreshCardRects();
    });

    // Check & update stuck webs from screen edges & card borders
    const evaluateEdgeWebs = () => {
      if (!mouse.active || mouse.x < 0 || mouse.y < 0) {
        stuckWebs.clear();
        return;
      }

      const mx = mouse.x;
      const my = mouse.y;

      // 1. LEFT SCREEN EDGE
      const dLeft = mx;
      if (dLeft < EDGE_CATCH_DIST && !stuckWebs.has('edge-left')) {
        stuckWebs.set('edge-left', {
          id: 'edge-left',
          anchorX: 0,
          anchorY: my,
          normalX: 1,
          normalY: 0,
          maxDist: MAX_STRETCH_DIST,
          born: Date.now()
        });
      }

      // 2. RIGHT SCREEN EDGE
      const dRight = width - mx;
      if (dRight < EDGE_CATCH_DIST && !stuckWebs.has('edge-right')) {
        stuckWebs.set('edge-right', {
          id: 'edge-right',
          anchorX: width,
          anchorY: my,
          normalX: -1,
          normalY: 0,
          maxDist: MAX_STRETCH_DIST,
          born: Date.now()
        });
      }

      // 3. TOP SCREEN EDGE
      const dTop = my;
      if (dTop < EDGE_CATCH_DIST && !stuckWebs.has('edge-top')) {
        stuckWebs.set('edge-top', {
          id: 'edge-top',
          anchorX: mx,
          anchorY: 0,
          normalX: 0,
          normalY: 1,
          maxDist: MAX_STRETCH_DIST,
          born: Date.now()
        });
      }

      // 4. BOTTOM SCREEN EDGE
      const dBottom = height - my;
      if (dBottom < EDGE_CATCH_DIST && !stuckWebs.has('edge-bottom')) {
        stuckWebs.set('edge-bottom', {
          id: 'edge-bottom',
          anchorX: mx,
          anchorY: height,
          normalX: 0,
          normalY: -1,
          maxDist: MAX_STRETCH_DIST,
          born: Date.now()
        });
      }

      // 5. CORNERS (Classic Spidey Corner Web Catch)
      const corners = [
        { id: 'corner-tl', x: 0, y: 0, normalX: 0.7, normalY: 0.7 },
        { id: 'corner-tr', x: width, y: 0, normalX: -0.7, normalY: 0.7 },
        { id: 'corner-bl', x: 0, y: height, normalX: 0.7, normalY: -0.7 },
        { id: 'corner-br', x: width, y: height, normalX: -0.7, normalY: -0.7 }
      ];

      corners.forEach((c) => {
        const dCorner = Math.hypot(mx - c.x, my - c.y);
        if (dCorner < CORNER_CATCH_DIST && !stuckWebs.has(c.id)) {
          stuckWebs.set(c.id, {
            id: c.id,
            anchorX: c.x,
            anchorY: c.y,
            normalX: c.normalX,
            normalY: c.normalY,
            isCorner: true,
            maxDist: MAX_STRETCH_DIST + 40,
            born: Date.now()
          });
        }
      });

      // 6. CARD BORDERS & EDGES
      cachedCardRects.forEach((c) => {
        // Find closest point on card perimeter
        const clampX = Math.max(c.left, Math.min(mx, c.right));
        const clampY = Math.max(c.top, Math.min(my, c.bottom));
        const dist = Math.hypot(mx - clampX, my - clampY);

        // If outside card and close to perimeter
        const isInside = mx >= c.left && mx <= c.right && my >= c.top && my <= c.bottom;
        if (!isInside && dist < CARD_CATCH_DIST && !stuckWebs.has(c.id)) {
          // Compute normal pointing out of card
          const nx = (clampX === c.left ? -1 : clampX === c.right ? 1 : 0);
          const ny = (clampY === c.top ? -1 : clampY === c.bottom ? 1 : 0);

          stuckWebs.set(c.id, {
            id: c.id,
            anchorX: clampX,
            anchorY: clampY,
            normalX: nx,
            normalY: ny,
            maxDist: CARD_MAX_STRETCH,
            born: Date.now()
          });
        }
      });

      // 7. EVALUATE STRETCH & SNAP
      stuckWebs.forEach((w, id) => {
        const dist = Math.hypot(mx - w.anchorX, my - w.anchorY);
        // If pulled too far, the web snaps with a burst of silk particles!
        if (dist > w.maxDist) {
          // Spawn snap particles
          for (let i = 0; i < 7; i++) {
            const angle = Math.atan2(w.anchorY - my, w.anchorX - mx) + (Math.random() - 0.5) * 0.8;
            snapParticles.push({
              x: mx,
              y: my,
              vx: Math.cos(angle) * (Math.random() * 5 + 3),
              vy: Math.sin(angle) * (Math.random() * 5 + 3),
              life: 1.0,
              decay: 0.05
            });
          }
          stuckWebs.delete(id);
        }
      });
    };

    window.addEventListener('mousemove', (e) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.speed = Math.hypot(mouse.x - mouse.prevX, mouse.y - mouse.prevY);
      mouse.active = true;
      evaluateEdgeWebs();
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      stuckWebs.clear();
    });

    // Web Strike blast on click
    window.addEventListener('click', (e) => {
      for (let i = 0; i < 14; i++) {
        const angle = ((Math.PI * 2) / 14) * i + Math.random() * 0.15;
        snapParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * (Math.random() * 7 + 4),
          vy: Math.sin(angle) * (Math.random() * 7 + 4),
          life: 1.0,
          decay: 0.04
        });
      }
    });

    // Main animation loop
    let animTime = 0;
    const animateSpideyWebs = () => {
      animTime += 0.03;
      ctx.clearRect(0, 0, width, height);

      const mx = mouse.x;
      const my = mouse.y;
      const websArray = Array.from(stuckWebs.values());

      // If webs are stuck, signal cursor ring to pulse
      const ring = document.getElementById('spidey-cursor-ring');
      if (ring) {
        if (websArray.length > 0) {
          ring.style.boxShadow = '0 0 22px rgba(255, 255, 255, 0.9), 0 0 35px var(--color-accent-1)';
        } else {
          ring.style.boxShadow = '';
        }
      }

      // Draw all caught & sticking webs
      websArray.forEach((w) => {
        const dist = Math.hypot(mx - w.anchorX, my - w.anchorY);
        const tension = Math.min(1, dist / w.maxDist);
        // Tension sag: when loose, it curves; when taut, it straightens with vibration
        const sag = (1 - tension) * 18 + Math.sin(animTime * 12 + dist) * (tension * 2);
        const midX = (w.anchorX + mx) / 2 + w.normalX * sag;
        const midY = (w.anchorY + my) / 2 + w.normalY * sag;

        // 1. Draw Edge Anchor Base (Spider-Web Foot sticking to edge)
        ctx.save();
        ctx.beginPath();
        ctx.arc(w.anchorX, w.anchorY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
        ctx.shadowBlur = 10;
        ctx.fill();

        // 2-3 Triangular Anchor Root Threads gripping the edge
        const perpX = -w.normalY * 16;
        const perpY = w.normalX * 16;
        ctx.beginPath();
        ctx.moveTo(w.anchorX + perpX, w.anchorY + perpY);
        ctx.lineTo(w.anchorX + w.normalX * 8, w.anchorY + w.normalY * 8);
        ctx.lineTo(w.anchorX - perpX, w.anchorY - perpY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // 2. Main Tensile Silk Web Cord (Outer Glow + Crisp White Core)
        ctx.save();
        // Pass A: Luminous Golden Silk Glow
        ctx.beginPath();
        ctx.moveTo(w.anchorX, w.anchorY);
        ctx.quadraticCurveTo(midX, midY, mx, my);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
        ctx.lineWidth = 3.8 * (1 - tension * 0.4);
        ctx.shadowColor = 'rgba(212, 175, 55, 0.85)';
        ctx.shadowBlur = 14;
        ctx.stroke();

        // Pass B: Bright White Silk Core Cord
        ctx.beginPath();
        ctx.moveTo(w.anchorX, w.anchorY);
        ctx.quadraticCurveTo(midX, midY, mx, my);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Pass C: Dewdrop sparkle at midpoint
        ctx.beginPath();
        ctx.arc(midX, midY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      // 3. Draw Spider-Web Cross-Lattices (Cobweb web fans between multiple caught edges!)
      if (websArray.length >= 2) {
        for (let i = 0; i < websArray.length; i++) {
          for (let j = i + 1; j < websArray.length; j++) {
            const w1 = websArray[i];
            const w2 = websArray[j];
            const dBetween = Math.hypot(w1.anchorX - w2.anchorX, w1.anchorY - w2.anchorY);

            // Connect if anchors are adjacent or corner
            if (dBetween < 600) {
              const rungs = [0.35, 0.58, 0.78];
              rungs.forEach((t) => {
                const p1x = w1.anchorX + (mx - w1.anchorX) * t;
                const p1y = w1.anchorY + (my - w1.anchorY) * t;
                const p2x = w2.anchorX + (mx - w2.anchorX) * t;
                const p2y = w2.anchorY + (my - w2.anchorY) * t;

                // Parabolic sag towards the cursor
                const bow = 10 * (1 - t);
                const crossMidX = (p1x + p2x) / 2 + (mx - (p1x + p2x) / 2) * 0.25;
                const crossMidY = (p1y + p2y) / 2 + (my - (p1y + p2y) / 2) * 0.25;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(p1x, p1y);
                ctx.quadraticCurveTo(crossMidX, crossMidY, p2x, p2y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
                ctx.lineWidth = 1.0;
                ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
                ctx.shadowBlur = 6;
                ctx.stroke();
                ctx.restore();
              });
            }
          }
        }
      }

      // 4. Draw Sticky Web Filaments wrapped around the cursor pointer!
      if (websArray.length > 0) {
        ctx.save();
        ctx.beginPath();
        for (let a = 0; a < 4; a++) {
          const ang = a * (Math.PI / 2) + animTime * 3;
          const fx = mx + Math.cos(ang) * 9;
          const fy = my + Math.sin(ang) * 9;
          ctx.moveTo(mx, my);
          ctx.lineTo(fx, fy);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.2;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw Snap Particles & Web Strike sparks
      for (let i = snapParticles.length - 1; i >= 0; i--) {
        const p = snapParticles[i];
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        p.x += p.vx;
        p.y += p.vy;
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.life})`;
        ctx.lineWidth = p.life * 2.2;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.restore();

        p.life -= p.decay;
        if (p.life <= 0) {
          snapParticles.splice(i, 1);
        }
      }

      requestAnimationFrame(animateSpideyWebs);
    };

    requestAnimationFrame(animateSpideyWebs);
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

// ===== ANIMATIONS JAVASCRIPT =====

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      
      // Add animation classes based on element type
      if (element.classList.contains('reveal')) {
        element.classList.add('active');
      }
      
      if (element.classList.contains('reveal-left')) {
        element.classList.add('active');
      }
      
      if (element.classList.contains('reveal-right')) {
        element.classList.add('active');
      }
      
      if (element.classList.contains('reveal-scale')) {
        element.classList.add('active');
      }
      
      if (element.classList.contains('stagger-item')) {
        element.classList.add('animate');
      }
      
      // Unobserve after animation
      animationObserver.unobserve(element);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// ===== INITIALIZE SCROLL ANIMATIONS =====
function initScrollAnimations() {
  // Add reveal classes to elements
  const elementsToAnimate = [
    // Hero elements
    '.hero__title',
    '.hero__description', 
    '.hero__buttons',
    '.hero__stats',
    '.hero__visual',
    
    // About elements
    '.about__content',
    '.about__visual',
    '.about__feature',
    
    // Services elements
    '.service__card',
    
    // Products elements
    '.product__card',
    
    // Contact elements
    '.contact__content',
    '.contact__form',
    
    // Footer elements
    '.footer__brand',
    '.footer__group'
  ];
  
  elementsToAnimate.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      // Add appropriate reveal class based on position
      if (selector.includes('visual') || selector.includes('form')) {
        element.classList.add('reveal-right');
      } else if (selector.includes('content')) {
        element.classList.add('reveal-left');
      } else {
        element.classList.add('reveal');
      }
      
      // Add stagger delay for multiple elements
      if (elements.length > 1) {
        element.style.animationDelay = `${index * 0.1}s`;
      }
      
      // Observe element
      animationObserver.observe(element);
    });
  });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.hero__stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + suffix;
    }, stepTime);
  });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const typingElements = document.querySelectorAll('.typing');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typing when element is visible
    const typingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500);
          typingObserver.unobserve(element);
        }
      });
    });
    
    typingObserver.observe(element);
  });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const rate = scrolled * -0.5;
      element.style.transform = `translateY(${rate}px)`;
    });
  }
  
  // Throttled scroll handler
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
      setTimeout(() => { ticking = false; }, 16);
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// ===== MOUSE FOLLOW EFFECT =====
/*function initMouseFollowEffect() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .btn');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.background = 'var(--secondary-color)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'var(--primary-color)';
    });
  });
}*/

// ===== FLOATING ELEMENTS =====
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating');
  
  floatingElements.forEach((element, index) => {
    const delay = index * 0.5;
    const duration = 3 + (index % 3);
    
    element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
  }
  
  window.addEventListener('scroll', updateProgress);
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.btn, .nav__social-link');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// ===== TEXT REVEAL ANIMATION =====
function initTextReveal() {
  const textElements = document.querySelectorAll('.text-reveal');
  
  textElements.forEach(element => {
    const text = element.textContent;
    const words = text.split(' ');
    
    element.innerHTML = words.map(word => 
      `<span class="word">${word}</span>`
    ).join(' ');
    
    const wordElements = element.querySelectorAll('.word');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          wordElements.forEach((word, index) => {
            setTimeout(() => {
              word.style.opacity = '1';
              word.style.transform = 'translateY(0)';
            }, index * 100);
          });
          revealObserver.unobserve(element);
        }
      });
    });
    
    // Style words
    wordElements.forEach(word => {
      word.style.opacity = '0';
      word.style.transform = 'translateY(20px)';
      word.style.transition = 'all 0.6s ease';
      word.style.display = 'inline-block';
    });
    
    revealObserver.observe(element);
  });
}

// ===== INITIALIZE ALL ANIMATIONS =====
function initAllAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    initScrollAnimations();
    initTypingAnimation();
    initParallax();
    initFloatingElements();
    initScrollProgress();
    initMagneticButtons();
    initTextReveal();
    
    // Only add mouse follow on desktop
    if (window.innerWidth > 1024) {
      initMouseFollowEffect();
    }
    
    // Animate counters when hero stats are visible
    const heroStats = document.querySelector('.hero__stats');
    if (heroStats) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(heroStats);
          }
        });
      });
      statsObserver.observe(heroStats);
    }
  }
}

// ===== PERFORMANCE MONITORING =====
function monitorPerformance() {
  // Monitor frame rate
  let lastTime = performance.now();
  let frameCount = 0;
  
  function checkFrameRate() {
    const currentTime = performance.now();
    frameCount++;
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      
      // If FPS is too low, disable some animations
      if (fps < 30) {
        document.body.classList.add('low-performance');
        console.warn('Low performance detected, some animations disabled');
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(checkFrameRate);
  }
  
  checkFrameRate();
}

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
  initAllAnimations();
  monitorPerformance();
  
  console.log('🎨 Animations initialized successfully');
});

// ===== HANDLE VISIBILITY CHANGE =====
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    document.body.classList.add('animations-paused');
  } else {
    // Resume animations when tab becomes visible
    document.body.classList.remove('animations-paused');
  }
});
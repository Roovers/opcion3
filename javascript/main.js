// ===== MAIN JAVASCRIPT =====

// DOM Elements
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');

// ===== MOBILE MENU =====
// Show menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    document.body.style.overflow = 'hidden';
  });
}

// Hide menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = 'auto';
  });
}

// Hide menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = 'auto';
  });
});

// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = 'auto';
  }
});

// ===== HEADER SCROLL EFFECT =====
function scrollHeader() {
  if (this.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}
window.addEventListener('scroll', scrollHeader);

// ===== ACTIVE LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav__link[href*=${sectionId}]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      correspondingLink?.classList.add('active-link');
    } else {
      correspondingLink?.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

// ===== SMOOTH SCROLLING =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service__card, .about__feature, .product__card, .footer__group, .clients__logo');
animateElements.forEach(el => observer.observe(el));

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('btn--loading');
    submitBtn.innerHTML = '<span>Enviando...</span>';
    
    // Simulate form submission (replace with actual form handling)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success state
      submitBtn.innerHTML = '<span>¡Enviado!</span><i class="fas fa-check"></i>';
      submitBtn.style.background = 'var(--accent-color)';
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.classList.remove('btn--loading');
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 3000);
      
    } catch (error) {
      // Error state
      submitBtn.innerHTML = '<span>Error</span><i class="fas fa-times"></i>';
      submitBtn.style.background = 'var(--error-color)';
      
      setTimeout(() => {
        submitBtn.classList.remove('btn--loading');
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 3000);
    }
  });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(scrollHeader, 10));
window.addEventListener('scroll', throttle(scrollActive, 10));

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = 'auto';
    navToggle.focus();
  }
});

// Focus management for mobile menu
navToggle.addEventListener('click', () => {
  setTimeout(() => {
    navClose.focus();
  }, 100);
});

navClose.addEventListener('click', () => {
  navToggle.focus();
});

// ===== PRELOADER (Optional) =====
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 300);
  }
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== CONSOLE BRANDING =====
console.log(
  '%c🚀 Roovers Insumos - Sitio Web Desarrollado con Tecnología Moderna',
  'color: #6366f1; font-size: 16px; font-weight: bold; padding: 10px;'
);

console.log(
  '%c✨ Diseño responsivo, animaciones fluidas y experiencia de usuario optimizada',
  'color: #10b981; font-size: 12px; padding: 5px;'
);
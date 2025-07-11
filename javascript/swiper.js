// ===== SWIPER CONFIGURATION =====

// Products Swiper
const productsSwiper = new Swiper('.products__container', {
  // Basic settings
  loop: true,
  spaceBetween: 30,
  grabCursor: true,
  centeredSlides: false,
  
  // Responsive breakpoints
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    }
  },
  
  // Navigation
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  
  // Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  
  // Autoplay
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  
  // Effects
  effect: 'slide',
  speed: 600,
  
  // Accessibility
  a11y: {
    prevSlideMessage: 'Producto anterior',
    nextSlideMessage: 'Producto siguiente',
    paginationBulletMessage: 'Ir al producto {{index}}',
  },
  
  // Events
  on: {
    init: function () {
      console.log('Products Swiper initialized');
    },
    slideChange: function () {
      // Add animation to active slide
      const activeSlide = this.slides[this.activeIndex];
      const productCard = activeSlide.querySelector('.product__card');
      
      if (productCard) {
        productCard.style.transform = 'scale(1.02)';
        setTimeout(() => {
          productCard.style.transform = '';
        }, 300);
      }
    }
  }
});

// Hero Swiper (if needed for hero images)
const heroSwiper = new Swiper('.hero__swiper', {
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.hero__pagination',
    clickable: true,
  },
  on: {
    slideChangeTransitionStart: function() {
      // Add fade animation to hero content
      const heroContent = document.querySelector('.hero__content');
      if (heroContent) {
        heroContent.style.opacity = '0.8';
        heroContent.style.transform = 'translateY(20px)';
      }
    },
    slideChangeTransitionEnd: function() {
      // Reset hero content animation
      const heroContent = document.querySelector('.hero__content');
      if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }
    }
  }
});

// Testimonials Swiper (if added later)
const testimonialsSwiper = new Swiper('.testimonials__swiper', {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  },
  
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  
  pagination: {
    el: '.testimonials__pagination',
    clickable: true,
  },
  
  navigation: {
    nextEl: '.testimonials__button-next',
    prevEl: '.testimonials__button-prev',
  }
});

// Team Swiper (if added later)
const teamSwiper = new Swiper('.team__swiper', {
  loop: true,
  spaceBetween: 30,
  
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    }
  },
  
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  
  pagination: {
    el: '.team__pagination',
    clickable: true,
  }
});

// Gallery Swiper (if added later)
const gallerySwiper = new Swiper('.gallery__swiper', {
  loop: true,
  spaceBetween: 20,
  centeredSlides: true,
  
  breakpoints: {
    320: {
      slidesPerView: 1.2,
    },
    640: {
      slidesPerView: 2.2,
    },
    1024: {
      slidesPerView: 3.2,
    }
  },
  
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  
  pagination: {
    el: '.gallery__pagination',
    clickable: true,
  },
  
  // Parallax effect
  parallax: true,
  speed: 800,
});

// ===== SWIPER UTILITIES =====

// Pause autoplay on hover
function pauseAutoplayOnHover(swiper, selector) {
  const swiperContainer = document.querySelector(selector);
  if (swiperContainer && swiper) {
    swiperContainer.addEventListener('mouseenter', () => {
      swiper.autoplay.stop();
    });
    
    swiperContainer.addEventListener('mouseleave', () => {
      swiper.autoplay.start();
    });
  }
}

// Apply hover pause to all swipers
pauseAutoplayOnHover(productsSwiper, '.products__container');
pauseAutoplayOnHover(heroSwiper, '.hero__swiper');
pauseAutoplayOnHover(testimonialsSwiper, '.testimonials__swiper');
pauseAutoplayOnHover(teamSwiper, '.team__swiper');
pauseAutoplayOnHover(gallerySwiper, '.gallery__swiper');

// ===== RESPONSIVE HANDLING =====
function handleSwiperResize() {
  // Update swipers on window resize
  if (productsSwiper) productsSwiper.update();
  if (heroSwiper) heroSwiper.update();
  if (testimonialsSwiper) testimonialsSwiper.update();
  if (teamSwiper) teamSwiper.update();
  if (gallerySwiper) gallerySwiper.update();
}

// Throttled resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleSwiperResize, 250);
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for swipers
document.addEventListener('keydown', (e) => {
  const focusedElement = document.activeElement;
  const swiperContainer = focusedElement.closest('.swiper');
  
  if (swiperContainer) {
    let swiper;
    
    // Determine which swiper is focused
    if (swiperContainer.classList.contains('products__container')) {
      swiper = productsSwiper;
    } else if (swiperContainer.classList.contains('hero__swiper')) {
      swiper = heroSwiper;
    } else if (swiperContainer.classList.contains('testimonials__swiper')) {
      swiper = testimonialsSwiper;
    } else if (swiperContainer.classList.contains('team__swiper')) {
      swiper = teamSwiper;
    } else if (swiperContainer.classList.contains('gallery__swiper')) {
      swiper = gallerySwiper;
    }
    
    if (swiper) {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          swiper.slidePrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          swiper.slideNext();
          break;
        case ' ': // Spacebar
          e.preventDefault();
          if (swiper.autoplay.running) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.start();
          }
          break;
      }
    }
  }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for swiper slides
const swiperLazyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const slide = entry.target;
      const lazyImages = slide.querySelectorAll('img[data-src]');
      
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      });
      
      swiperLazyObserver.unobserve(slide);
    }
  });
}, {
  rootMargin: '50px'
});

// Observe swiper slides for lazy loading
document.querySelectorAll('.swiper-slide').forEach(slide => {
  swiperLazyObserver.observe(slide);
});

// ===== ERROR HANDLING =====
// Handle swiper initialization errors
window.addEventListener('error', (e) => {
  if (e.message.includes('Swiper')) {
    console.warn('Swiper error detected, attempting to reinitialize...');
    
    // Attempt to reinitialize swipers after a delay
    setTimeout(() => {
      try {
        if (typeof Swiper !== 'undefined') {
          // Reinitialize swipers here if needed
          console.log('Swiper reinitialization attempted');
        }
      } catch (error) {
        console.error('Failed to reinitialize Swiper:', error);
      }
    }, 1000);
  }
});

console.log('🎠 Swiper configurations loaded successfully');
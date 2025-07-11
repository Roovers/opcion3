const productosSwiper = new Swiper('.productos-swiper', {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  freeMode: {
    enabled: true,
    momentum: false,
  },
  grabCursor: true,
  breakpoints: {
    0: { slidesPerView: 1 },
    480: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 }
  }
});
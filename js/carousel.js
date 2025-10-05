// carousel.js - versão simplificada com SwiperJS
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.swiper', {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 1,
    centeredSlides: false,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});
// Accessibility: make carousel items focusable
    document.querySelectorAll('.carousel-item').forEach((it, i) => { it.setAttribute('tabindex', '0'); });
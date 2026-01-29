jQuery(document).ready(function($) {
  "use strict";
  //  TESTIMONIALS CAROUSEL HOOK
  $('#customers-testimonials').owlCarousel({
      loop: true,
      center: true,
      items: 3,
      margin: 50,
      autoplay: true,
      dots:true,
      autoplayTimeout: 8500,
      smartSpeed: 450,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1170: {
          items: 3
        }
      }
  });
});

// MEDIA / OUR WORK CAROUSEL
$('.about-us-info.owl-carousel').owlCarousel({
  loop: true,
  margin: 50,
  nav: true,              // ← ARROWS ENABLED
  dots: false,
  mouseDrag: true,
  touchDrag: true,
  navText: [
    "<span class='media-nav media-prev'>&lsaquo;</span>",
    "<span class='media-nav media-next'>&rsaquo;</span>"
  ],
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1200: {
      items: 3
    }
  }
});

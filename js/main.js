document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  //                  HEADER
  // ============================================
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const header = document.querySelector('.header');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', !isOpen);
      mobileMenu.setAttribute('aria-hidden', isOpen);
    });

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileMenu.setAttribute('aria-hidden', true);
      });
    });

    document.addEventListener('click', (e) => {
      if (header && !header.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileMenu.setAttribute('aria-hidden', true);
      }
    });
  }

  if (header) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      lastScrollY = currentScrollY;
    });
  }


  // ============================================
  //          STANDARDS CARDS CAROUSEL
  // ============================================
  const carousel = document.querySelector('.standards-cards');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const standardsCards = document.querySelectorAll('.standards-card');

  let currentIndex = 0;
  let autoplayInterval;

  function goToCard(index) {
    const cardWidth = carousel.querySelector('.standards-card').offsetWidth + 16;

    if (standardsCards[currentIndex]) {
      standardsCards[currentIndex].querySelector('.standards-card-inner').style.transform = 'rotateY(0deg)';
    }

    currentIndex = index;

    carousel.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });

    carouselDots.forEach(dot => dot.classList.remove('active'));
    if (carouselDots[currentIndex]) carouselDots[currentIndex].classList.add('active');

    setTimeout(() => {
      if (standardsCards[currentIndex]) {
        standardsCards[currentIndex].querySelector('.standards-card-inner').style.transform = 'rotateY(180deg)';
      }
    }, 400);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % standardsCards.length;
      goToCard(nextIndex);
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function isMobile() {
    return window.innerWidth < 600;
  }

  if (carousel && standardsCards.length) {
    if (isMobile()) {
      goToCard(0);
      startAutoplay();
      carousel.addEventListener('touchstart', stopAutoplay);
      carousel.addEventListener('touchend', () => setTimeout(startAutoplay, 1000));
    } else {
      standardsCards.forEach(card => {
        const inner = card.querySelector('.standards-card-inner');
        card.addEventListener('mouseenter', () => inner.style.transform = 'rotateY(180deg)');
        card.addEventListener('mouseleave', () => inner.style.transform = 'rotateY(0deg)');
      });
    }

    window.addEventListener('resize', () => {
      stopAutoplay();
      if (isMobile()) {
        goToCard(0);
        startAutoplay();
      } else {
        standardsCards.forEach(card => {
          card.querySelector('.standards-card-inner').style.transform = 'rotateY(0deg)';
        });
      }
    });
  }


  // ============================================
  //           SERVICES CARDS CAROUSEL
  // ============================================
  const servicesCarousel = document.querySelector('.cards-container');
  const servicesDots = document.querySelectorAll('.services-dot');
  const serviceCards = document.querySelectorAll('.cards-container .card');

  let servicesIndex = 0;
  let servicesInterval;

  function goToServiceCard(index) {
    const cardWidth = servicesCarousel.querySelector('.card').offsetWidth + 16;

    if (serviceCards[servicesIndex]) {
      serviceCards[servicesIndex].querySelector('.card-inner').style.transform = 'rotateY(0deg)';
    }

    servicesIndex = index;
    servicesCarousel.scrollTo({ left: cardWidth * servicesIndex, behavior: 'smooth' });

    servicesDots.forEach(dot => dot.classList.remove('active'));
    if (servicesDots[servicesIndex]) servicesDots[servicesIndex].classList.add('active');

    setTimeout(() => {
      if (serviceCards[servicesIndex]) {
        serviceCards[servicesIndex].querySelector('.card-inner').style.transform = 'rotateY(180deg)';
      }
    }, 400);
  }

  function startServicesAutoplay() {
    servicesInterval = setInterval(() => {
      const nextIndex = (servicesIndex + 1) % serviceCards.length;
      goToServiceCard(nextIndex);
    }, 5000);
  }

  function stopServicesAutoplay() {
    clearInterval(servicesInterval);
  }

  function attachServiceHoverListeners() {
    serviceCards.forEach(card => {
      const inner = card.querySelector('.card-inner');
      if (!inner) return;
      card.addEventListener('mouseenter', () => inner.style.transform = 'rotateY(180deg)');
      card.addEventListener('mouseleave', () => inner.style.transform = 'rotateY(0deg)');
    });
  }

  function resetServiceCards() {
    serviceCards.forEach(card => {
      const inner = card.querySelector('.card-inner');
      if (inner) inner.style.transform = 'rotateY(0deg)';
    });
  }

  function isServicesMobile() {
    return window.innerWidth < 600;
  }

  if (servicesCarousel && serviceCards.length) {
    if (isServicesMobile()) {
      goToServiceCard(0);
      startServicesAutoplay();
      servicesCarousel.addEventListener('touchstart', stopServicesAutoplay);
      servicesCarousel.addEventListener('touchend', () => setTimeout(startServicesAutoplay, 1000));
    } else {
      resetServiceCards();
      attachServiceHoverListeners();
    }

    window.addEventListener('resize', () => {
      stopServicesAutoplay();
      resetServiceCards();
      if (isServicesMobile()) {
        goToServiceCard(0);
        startServicesAutoplay();
      } else {
        attachServiceHoverListeners();
      }
    });
  }


  // ============================================
  //           PORTFOLIO CAROUSEL
  // ============================================
  const portfolioCarousel = document.querySelector('.portfolio-cards');
  const portfolioDots = document.querySelectorAll('.portfolio-dot');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (portfolioCarousel && portfolioCards.length) {
    portfolioCarousel.addEventListener('scroll', () => {
      const cardWidth = portfolioCarousel.querySelector('.portfolio-card').offsetWidth + 16;
      const index = Math.round(portfolioCarousel.scrollLeft / cardWidth);
      portfolioDots.forEach(dot => dot.classList.remove('active'));
      if (portfolioDots[index]) portfolioDots[index].classList.add('active');
    });
  }


  // ============================================
  //           SLIDESHOW (SERVICE DETAIL)
  // ============================================
  const slides = document.querySelectorAll('.slide');
  const slideshowDots = document.querySelectorAll('.slideshow-dot');
  const prevBtn = document.querySelector('.slide-prev');
  const nextBtn = document.querySelector('.slide-next');

  let slideIndex = 0;

  function goToSlide(index) {
    slides[slideIndex].classList.remove('active');
    slideshowDots[slideIndex].classList.remove('active');
    slideIndex = (index + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    slideshowDots[slideIndex].classList.add('active');
  }

  if (slides.length && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goToSlide(slideIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(slideIndex + 1));
    slideshowDots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });
  }


  // ============================================
  //           ACCORDION (SERVICE DETAIL)
  // ============================================
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      accordionTriggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.classList.remove('open');
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        content.classList.add('open');
      }
    });
  });

});



// PROCESS ACCORDION
const processTriggers = document.querySelectorAll('.process-trigger');

processTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const content = trigger.nextElementSibling;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    processTriggers.forEach(t => {
      t.setAttribute('aria-expanded', 'false');
      t.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      trigger.setAttribute('aria-expanded', 'true');
      content.classList.add('open');
    }
  });
});
/* ============================================
   MANISH KUMAR — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // === Navbar Scroll Effect ===
  const navbar = document.querySelector('.navbar');
  const isHomePage = document.querySelector('.hero'); // Only home page has .hero

  if (navbar && isHomePage) {
    // Home page: toggle scrolled class based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }
  // Inner pages: navbar keeps 'scrolled' class from HTML — no toggling

  // === Mobile Menu Toggle ===
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (mobileToggle && mobileDrawer && mobileOverlay) {
    const toggleMenu = () => {
      const isOpen = mobileDrawer.classList.contains('active');
      mobileToggle.classList.toggle('active', !isOpen);
      mobileDrawer.classList.toggle('active', !isOpen);
      mobileOverlay.classList.toggle('active', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
      mobileToggle.classList.remove('active');
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    // Close on link click
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // === Active Nav Link Highlight ===
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length && sections.length) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));
  }

  // === Scroll Animations (Intersection Observer) ===
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length) {
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target); // animate only once
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    });

    animatedElements.forEach(el => animObserver.observe(el));
  }

  // === Animated Number Counters ===
  const counters = document.querySelectorAll('.counter');

  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // === FAQ Accordion ===
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === WhatsApp Helper ===
  window.openWhatsApp = function(message) {
    const phone = '91XXXXXXXXXX'; // Replace with actual number
    const encodedMessage = encodeURIComponent(message || 'Hi Manish! I would like to know more about your services.');
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  // === Contact Form → WhatsApp ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = this.querySelector('[name="name"]')?.value || '';
      const phone = this.querySelector('[name="phone"]')?.value || '';
      const service = this.querySelector('[name="service"]')?.value || '';
      const message = this.querySelector('[name="message"]')?.value || '';

      const whatsappMessage = `Hi Manish! I'm ${name}.
Phone: ${phone}
Interested in: ${service}
Message: ${message}`;

      window.openWhatsApp(whatsappMessage);
    });
  }

  // === Image Lazy Loading ===
  const lazyImages = document.querySelectorAll('img[data-src]');

  if (lazyImages.length) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  }

  // === Hero Text Reveal Animation ===
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.style.animation = 'fadeInUp 1s var(--ease-out) 0.3s both';
  }

  const heroTagline = document.querySelector('.hero-tagline');
  if (heroTagline) {
    heroTagline.style.animation = 'fadeInUp 1s var(--ease-out) 0.5s both';
  }

  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) {
    heroDesc.style.animation = 'fadeInUp 1s var(--ease-out) 0.7s both';
  }

  const heroButtons = document.querySelector('.hero-buttons');
  if (heroButtons) {
    heroButtons.style.animation = 'fadeInUp 1s var(--ease-out) 0.9s both';
  }

  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    heroTag.style.animation = 'fadeInUp 1s var(--ease-out) 0.1s both';
  }
});

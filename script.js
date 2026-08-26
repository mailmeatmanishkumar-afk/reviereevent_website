/* ============================================
   MANISH KUMAR — LUXURY EVENT PLANNING & MANAGEMENT
   Shared JavaScript & Interactions (Final Polish)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // === Navbar Scroll Effect ===
  const navbar = document.querySelector('.navbar');
  const isHomePage = document.querySelector('.hero');

  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else if (isHomePage) {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // === Mobile Drawer Navigation ===
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

    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // === Scroll Animations (Intersection Observer) ===
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length) {
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
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
    }, { threshold: 0.2 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

  // === WhatsApp Helper ===
  window.openWhatsApp = function(message) {
    const phone = '919800000000'; // Target WhatsApp Number
    const encodedMessage = encodeURIComponent(message || "Hi Manish! I visited your website and would like to inquire about Event Planning & Management services.");
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  // === Contact Form Submission → WhatsApp ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = this.querySelector('[name="name"]')?.value || '';
      const phone = this.querySelector('[name="phone"]')?.value || '';
      const eventType = this.querySelector('[name="eventType"]')?.value || this.querySelector('[name="service"]')?.value || '';
      const eventDate = this.querySelector('[name="eventDate"]')?.value || '';
      const message = this.querySelector('[name="message"]')?.value || '';

      let whatsappMsg = `Hi Manish! I would like to inquire about Event Planning.\n\n`;
      whatsappMsg += `• Name: ${name}\n`;
      whatsappMsg += `• Phone: ${phone}\n`;
      if (eventType) whatsappMsg += `• Event Type: ${eventType}\n`;
      if (eventDate) whatsappMsg += `• Tentative Date: ${eventDate}\n`;
      if (message) whatsappMsg += `• Details: ${message}`;

      window.openWhatsApp(whatsappMsg);
    });
  }

  // === Active Nav Link Highlight based on current URL path ===
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

'use strict';

/**
 * Add event listener to single or multiple elements
 */
const addEvent = (elem, type, callback) => {
  if (elem instanceof NodeList || Array.isArray(elem)) {
    elem.forEach(item => item.addEventListener(type, callback));
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * IntersectionObserver for scroll-animate (hero section)
 */
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target); // Stop observing once animated
          }, index * 50); // Stagger at 50ms
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
});

/**
 * IntersectionObserver for fade-animate (services section)
 */
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll('.fade-animate');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-visible');
          }, index * 100); // Stagger at 50ms for sequential effect
        } else {
          entry.target.classList.remove('fade-visible');
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));
});


// ---heading scroll animation---

window.addEventListener("scroll", function() {
  const headings = document.querySelectorAll(".scroll-heading"); // Select all elements with this class
  const viewportHeight = window.innerHeight;

  headings.forEach(function(heading) {
    const headingPosition = heading.getBoundingClientRect().top;

    // When the heading enters the viewport, animate it
    if (headingPosition <= viewportHeight / 1.5) {
      heading.classList.add("visible");
    } else {
      heading.classList.remove("visible");
    }
  });
});


/**
 * Close navbar on link click
 */
document.querySelectorAll('[data-nav-link]').forEach(link => {
  link.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbar) || new bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  });
});

/**
 * Add active class to header on scroll + change nav-link color
 */
const header = document.querySelector('[data-header]');
const navLinks = document.querySelectorAll('.nav-link');

const toggleHeader = () => {
  header.classList.toggle('active', window.scrollY > 100);

  navLinks.forEach(link => {
    if (window.scrollY > 100) {
      link.classList.add('scrolled');
    } else {
      link.classList.remove('scrolled');
    }
  });
};
addEvent(window, 'scroll', toggleHeader);


/**
 * Toggle dropdown on mobile click
 */
const dropdownToggles = document.querySelectorAll('.nav-item.dropdown .nav-link');
addEvent(dropdownToggles, 'click', function (e) {
  if (window.innerWidth < 992) {
    e.preventDefault();
    const dropdown = this.parentElement;
    dropdown.classList.toggle('active');
  }
});


/**
 * Stats counter
 */
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const speed = 200; // smaller = faster
    const increment = target / speed;

    const updateCount = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      animateCounters();
      hasAnimated = true;
      observer.disconnect(); // Stop observing after animation
    }
  });
}, {
  threshold: 0.5 // Trigger when 50% of #stats is visible
});

const statsSection = document.querySelector('#stats');
observer.observe(statsSection);
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
 * Close navbar on link click
 */
  // Collapse navbar after clicking any nav link (mobile)
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

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
const navbarLinks = document.querySelectorAll('[data-nav-link]');
const closeNavbar = () => {
  const navbar = document.querySelector('.navbar-collapse');
  if (navbar && navbar.classList.contains('show')) {
    bootstrap.Collapse.getInstance(navbar).hide();
  }
};
addEvent(navbarLinks, 'click', closeNavbar);

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

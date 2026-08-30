/* =========================================================
   WAVEFORM MODULAR — script.js
   Week 3: DOM interactivity
========================================================= */

const menuBtn = document.querySelector('#mobile-menu-btn');
const mobileLinks = document.querySelector('#mobile-links');

menuBtn.addEventListener('click', function () {
  mobileLinks.classList.toggle('hidden');
  const isOpen = !mobileLinks.classList.contains('hidden');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

const themeToggleBtn = document.querySelector('#theme-toggle');
const sunIcon = document.querySelector('#icon-sun');
const moonIcon = document.querySelector('#icon-moon');
const htmlEl = document.documentElement;

function updateThemeIcon() {
  const isDark = htmlEl.classList.contains('dark');
  sunIcon.classList.toggle('hidden', !isDark);
  moonIcon.classList.toggle('hidden', isDark);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  htmlEl.classList.add('dark');
}
updateThemeIcon();

themeToggleBtn.addEventListener('click', function () {
  htmlEl.classList.toggle('dark');
  const nowDark = htmlEl.classList.contains('dark');
  localStorage.setItem('theme', nowDark ? 'dark' : 'light');
  updateThemeIcon();
});

const faqButtons = document.querySelectorAll('.faq-btn');

faqButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer.open').forEach(function (openAnswer) {
      openAnswer.classList.remove('open');
    });
    document.querySelectorAll('.faq-btn').forEach(function (otherBtn) {
      otherBtn.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

const nameInput = document.querySelector('#notify-name');
const nameError = document.querySelector('#notify-name-error');
const emailInput = document.querySelector('#notify-email');
const emailError = document.querySelector('#notify-email-error');
const notifyForm = document.querySelector('#notify-form');
const successMsg = document.querySelector('#notify-success');

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateName() {
  const isValid = nameInput.value.trim().length > 0;
  nameError.classList.toggle('hidden', isValid);
  nameInput.classList.toggle('border-red-500', !isValid);
  nameInput.classList.toggle('border-green-500', isValid);
  return isValid;
}

function validateEmail() {
  const isValid = isValidEmail(emailInput.value.trim());
  emailError.classList.toggle('hidden', isValid);
  emailInput.classList.toggle('border-red-500', !isValid);
  emailInput.classList.toggle('border-green-500', isValid);
  return isValid;
}

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);

notifyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const nameOk = validateName();
  const emailOk = validateEmail();

  if (nameOk && emailOk) {
    successMsg.classList.remove('hidden');
    notifyForm.reset();
    nameInput.classList.remove('border-green-500');
    emailInput.classList.remove('border-green-500');
  }
});
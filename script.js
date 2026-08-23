/* =========================================================
   WAVEFORM MODULAR — script.js
   Week 3: DOM interactivity
   Every section below is one independent feature. 
========================================================= */


/* ---------------------------------------------------------
   1. MOBILE MENU
   Grab the hamburger button and the links list, then toggle
   the "hidden" class on click. classList.toggle() adds the
   class if it's missing and removes it if it's there — so
   the SAME function opens AND closes the menu.
--------------------------------------------------------- */
const menuBtn = document.querySelector('#mobile-menu-btn');
const mobileLinks = document.querySelector('#mobile-links');

menuBtn.addEventListener('click', function () {
  mobileLinks.classList.toggle('hidden');

  // aria-expanded tells screen readers whether the menu is open.
  // We flip it between "true" and "false" each time, matching
  // whatever we just did to the hidden class above.
  const isOpen = !mobileLinks.classList.contains('hidden');
  menuBtn.setAttribute('aria-expanded', isOpen);
});


/* ---------------------------------------------------------
   2. DARK / LIGHT MODE TOGGLE
   The <html> tag gets a "dark" class added or removed.
   Our CSS (see the <style> block in index.html) defines two
   sets of color variables: one under :root (light, default)
   and one under html.dark (dark). Toggling the class is all
   it takes to swap every color on the page at once.
--------------------------------------------------------- */
const themeToggleBtn = document.querySelector('#theme-toggle');
const sunIcon = document.querySelector('#icon-sun');
const moonIcon = document.querySelector('#icon-moon');
const htmlEl = document.documentElement; // the <html> element itself

// Helper: shows the correct icon depending on current theme,
// and keeps them in sync so we don't repeat this logic twice.
function updateThemeIcon() {
  const isDark = htmlEl.classList.contains('dark');
  sunIcon.classList.toggle('hidden', !isDark);
  moonIcon.classList.toggle('hidden', isDark);
}

// On page load: check if the user chose a theme last time.
// localStorage persists even after closing the browser, so
// this is what makes the choice "remembered" on refresh.
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  htmlEl.classList.add('dark');
}
updateThemeIcon();

themeToggleBtn.addEventListener('click', function () {
  htmlEl.classList.toggle('dark');

  // Save whichever state we just switched TO, so next visit
  // starts in the same theme.
  const nowDark = htmlEl.classList.contains('dark');
  localStorage.setItem('theme', nowDark ? 'dark' : 'light');

  updateThemeIcon();
});


/* ---------------------------------------------------------
   3. FAQ ACCORDION
   There are multiple FAQ buttons, so we use querySelectorAll
   (grabs ALL matches as a list) + forEach (loops over each
   one, attaching the same click behavior individually).
--------------------------------------------------------- */
const faqButtons = document.querySelectorAll('.faq-btn');

faqButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // "next element sibling" = the answer div sitting right
    // after this button in the HTML. This is why the HTML
    // structure matters: button, then answer, always paired.
    const answer = btn.nextElementSibling;

    const isOpen = answer.classList.contains('open');

    // Optional UX choice: close any other open FAQ first,
    // so only one answer is expanded at a time.
    document.querySelectorAll('.faq-answer.open').forEach(function (openAnswer) {
      openAnswer.classList.remove('open');
    });
    document.querySelectorAll('.faq-btn').forEach(function (otherBtn) {
      otherBtn.setAttribute('aria-expanded', 'false');
    });

    // If it wasn't already open, open it now (this re-opens
    // the one we just clicked, since the loop above closed it).
    if (!isOpen) {
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});


/* ---------------------------------------------------------
   4. REAL-TIME FORM VALIDATION
   Instead of waiting for "submit", we listen to the "input"
   event — this fires on every keystroke, so feedback shows
   up as the person types, not after.
--------------------------------------------------------- */
const nameInput = document.querySelector('#notify-name');
const nameError = document.querySelector('#notify-name-error');

const emailInput = document.querySelector('#notify-email');
const emailError = document.querySelector('#notify-email-error');

const notifyForm = document.querySelector('#notify-form');
const successMsg = document.querySelector('#notify-success');

// A simple check for "looks like an email": something, then
// an @, then something, then a dot, then something.
// Not perfect (no regex is), but plenty for front-end validation.
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

// "input" fires on every keystroke — this is what makes it real-time.
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);

notifyForm.addEventListener('submit', function (event) {
  // Stops the browser's default "reload the page" behavior,
  // since we're handling everything with JS instead.
  event.preventDefault();

  const nameOk = validateName();
  const emailOk = validateEmail();

  if (nameOk && emailOk) {
    successMsg.classList.remove('hidden');
    notifyForm.reset();
    // Reset border colors since the fields are now empty again
    nameInput.classList.remove('border-green-500');
    emailInput.classList.remove('border-green-500');
  }
});
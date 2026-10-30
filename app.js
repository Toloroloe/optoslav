'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const imageDialog = document.querySelector('#image-dialog');
const screenshotButton = document.querySelector('[data-open-image]');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Закрыть меню' : 'Открыть меню');
  navigation.classList.toggle('is-open', opening);
});

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});

window.matchMedia('(min-width: 601px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

screenshotButton.addEventListener('click', () => {
  imageDialog.showModal();
  document.body.classList.add('dialog-open');
});

document.querySelector('[data-close-image]').addEventListener('click', () => imageDialog.close());

imageDialog.addEventListener('click', event => {
  if (event.target === imageDialog) {
    const rect = imageDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) imageDialog.close();
  }
});

imageDialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  screenshotButton.focus({preventScroll: true});
});

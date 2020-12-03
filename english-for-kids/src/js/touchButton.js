export default function (button, menu, overlay, body) {
  button.addEventListener('click', (e) => {
    e.preventDefault;

    if (button.classList.contains('header__touch-button_open')) {
      button.classList.remove('header__touch-button_open');
      menu.classList.remove('header__menu_open');
      overlay.classList.add('hide');
      body.classList.remove('noscroll');
    } else {
      button.classList.add('header__touch-button_open');
      menu.classList.add('header__menu_open');
      overlay.classList.remove('hide');
      body.classList.add('noscroll');
    }
  });

  menu.addEventListener('click', (e) => {
    if (e.target) {
      button.classList.remove('header__touch-button_open');
      menu.classList.remove('header__menu_open');
      overlay.classList.add('hide');
      body.classList.remove('noscroll');
    }
  });
}

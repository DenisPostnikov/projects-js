import '../scss/style.scss';
import loadContent from './Rendor';
import MenuItem from './Menu/MenuItem';
import touchButton from './touchButton';

touchButton(
  document.querySelector('.header__touch-button'),
  document.querySelector('.header__menu'),
  document.querySelector('.overlay'),
  document.querySelector('body')
);

let menu = new MenuItem(document.querySelector('.header__menu'));
menu.create();

window.addEventListener('hashchange', loadContent);

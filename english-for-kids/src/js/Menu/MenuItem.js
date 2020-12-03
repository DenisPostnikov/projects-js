import cardsData from '../data';

export default class MenuItem {
  constructor(wrap) {
    this.wrap = wrap;
  }

  create() {
    for (let i = 0; i < cardsData.length; i++) {
      let name = cardsData[i].name;

      this.rendorItem(name);
    }
  }

  rendorItem(name) {
    let item = document.createElement('li');

    item.classList.add('header__menu-item');
    item.innerHTML = `
      <a class="header__menu-link" href="#${name}">
        <i class="header__menu-icon" style="background-image: url(../src/assets/images/icons/${name}.svg)"></i>
        ${name}
      </a>
      `;
    this.wrap.appendChild(item);
  }
}

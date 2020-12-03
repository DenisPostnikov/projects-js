import cardsData from '../data';
import CategoryHtml from './CategoryHtml';

export default class Category {
  constructor(wrap) {
    this.wrap = wrap;

    this.init();
  }

  init() {
    return this.create();
  }

  create() {
    for (let i = 0; i < cardsData.length; i++) {
      let name = cardsData[i].name,
        lowerName = name.toLowerCase();

      this.rendorCardCategory('div', name, lowerName);
    }
  }

  rendorCardCategory(item, name, lowerName) {
    let category = document.createElement(item);

    category.classList.add('cards__category');
    category.innerHTML = CategoryHtml(name, lowerName);
    this.wrap.appendChild(category);
  }
}

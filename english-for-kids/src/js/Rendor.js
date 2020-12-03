import Category from './Category/Category';
import CardsWord from './CardsWord/CardsWord';

const categoryItems = new Category(document.querySelector('.cards'));

function getContent(fragmentId) {
  const cardsWord = new CardsWord(document.querySelector('.cards'), fragmentId);

  cardsWord.create();
}

function loadContent() {
  let contentDiv = document.querySelector('.cards');
  let fragmentId = location.hash.substr(1);

  if (!fragmentId) {
    contentDiv.innerHTML = '';
    categoryItems.init();
  } else {
    contentDiv.innerHTML = '';
    getContent(fragmentId);
  }
}

export default loadContent;

import cardsData from '../data';
import CardsWordTemplate from './CardsWordTemplate';

export default class CardsWord {
  constructor(wrap, hash) {
    this.wrap = wrap;
    this.hash = hash;
  }

  create() {
    let currentCard = cardsData.find((el) => el.name === this.hash);

    currentCard.cards.forEach((item) => {
      this.rendorCardsWord(item);
    });
  }

  rendorCardsWord(item) {
    let word = item.word,
      translate = item.translation,
      image = item.image,
      audioUrl = item.audioSrc,
      card = document.createElement('div');

    card.classList.add('cards__word');
    card.innerHTML = CardsWordTemplate(word, translate, image, audioUrl);

    this.wrap.appendChild(card);

    this.soundClick(card.querySelector('.cards__word-sound'));
    this.addTurnClass(card, card.querySelector('.cards__word-turn'));
    this.removeTurnClass(card);
  }

  soundClick(el) {
    el.addEventListener('click', (e) => {
      let audioElem = e.target.querySelector('audio');

      if (audioElem) audioElem.play();
    });
  }

  addTurnClass(wrap, el) {
    el.addEventListener('click', () => {
      wrap.classList.add('cards__word_3d');
    });
  }

  removeTurnClass(el) {
    el.addEventListener('mouseleave', (e) => {
      e.target.classList.remove('cards__word_3d');
    });
  }
}

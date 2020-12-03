export default function CardsWordTemplate(word, translate, image, audioUrl) {
  return `
    <div class="cards__word-front">
      <div class="cards__word-image">
        <img src="${image}" alt="${word}">
      </div>
      <div class="cards__word-title">${word}</div>
      <div class="cards__word-sound">
        <audio src="${audioUrl}"></audio>
      </div>
      <div class="cards__word-turn"></div>
    </div>
    <div class="cards__word-back">
      <div class="cards__word-image">
        <img src="${image}" alt="${word}">
      </div>
      <div class="cards__word-title">${translate}</div>
    </div>
  `;
}

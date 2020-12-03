export default function CategoryTemplate(name, lowerName) {
  return `
    <a href="#${lowerName}">
      <div class="cards__image cards__image_${lowerName}">
        <img src="../src/assets/images/categories/${lowerName}.png" alt="${name}">
      </div>
      <div class="cards__title">${name}</div>
    </a>
  `;
}

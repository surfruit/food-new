// API key
const apiKey = "d9b451e1420247af96f8b20086f9b084";

// Endpoint URLs
const breakfastURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=breakfast`;
const lunchURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=lunch`;
const dinnerURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=dinner`;

// Select card containers
const breakfastCards = document.querySelectorAll("#breakfast .card-container");
const lunchCards = document.querySelectorAll("#lunch .card-container");
const dinnerCards = document.querySelectorAll("#dinner .card-container");

// Generate recipe cards
async function generateRecipeCards(url, cards) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const recipes = data.recipes;

    cards.forEach((card, index) => {
      const recipe = recipes[index];
      const { title, image, sourceUrl } = recipe;

      // Create card element
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      // Create image element
      const imageElement = document.createElement("img");
      imageElement.src = image;
      imageElement.alt = title;
      imageElement.classList.add("card-img");

      // Create recipe title element
      const titleElement = document.createElement("h3");
      titleElement.textContent = title;
      titleElement.classList.add("card-title");

      // Create recipe link element
      const linkElement = document.createElement("a");
      linkElement.href = sourceUrl;
      linkElement.textContent = "Дивитися рецепт";
      linkElement.classList.add("card-link");

      // Append elements to card container
      cardElement.appendChild(imageElement);
      cardElement.appendChild(titleElement);
      cardElement.appendChild(linkElement);
      card.appendChild(cardElement);
    });
  } catch (error) {
    console.log(error);
  }
}

// Generate recipe cards on page load
generateRecipeCards(breakfastURL, breakfastCards);
generateRecipeCards(lunchURL, lunchCards);
generateRecipeCards(dinnerURL, dinnerCards);

// Update recipe cards on refresh button click
const refreshButton = document.querySelector("#refresh-button");
refreshButton.addEventListener("click", () => {
  generateRecipeCards(breakfastURL, breakfastCards);
  generateRecipeCards(lunchURL, lunchCards);
  generateRecipeCards(dinnerURL, dinnerCards);
});


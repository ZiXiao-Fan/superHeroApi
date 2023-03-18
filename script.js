//https://superheroapi.com/api/access-token
const SUPERHERO_TOKEN = "862079114856361";
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
const newHeroButton = document.getElementById("newHeroButton");
const heroImageDiv = document.getElementById("heroImage");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const getSuperHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      showHeroInfo(json);
    });
};

const statToEmoji = {
  intelligence: "🧠",
  strength: "💪",
  speed: "⚡️",
  durability: "🏊",
  power: "📈",
  combat: "👊",
};

const showHeroInfo = (character) => {
  const name = `<h2>${character.name}</h2>`;

  const img = `<img src="${character.image.url}" height = 200 width = 200/>`;
  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${
        character.powerstats[stat]
      }</p>`;
    })
    .join("");
  // console.log(stats.join(''))
  heroImageDiv.innerHTML = `${name}${img}${stats} `;
};

const getSearchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())

    .then((json) => {
      const hero = json.results[0];

      showHeroInfo(hero);
    });
};

newHeroButton.onclick = () => {
  let randomNumber = Math.floor(Math.random() * 731) + 1;
  getSuperHero(randomNumber);
};
searchButton.onclick = () => {
  getSearchSuperHero(searchInput.value);
};

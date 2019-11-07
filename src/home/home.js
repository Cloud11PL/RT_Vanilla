import '../sass/main.scss';
import './home.scss';
import '../sass/variables.scss';
import { getPageCharacters } from '../js/axios';
import { showLoadingAnimation, closeAnimation } from './scripts/animation';

let currentPage = 1;
let maxPages;

const fetchCharacters = async () => {
  const response = await getPageCharacters(currentPage);
  return response;
}

const getCharacterComponent = (character) => {
  const newDiv = document.createElement('div');
  newDiv.className = "character";

  const nameNode = document.createElement("p");
  nameNode.innerText = `${character.name}`;
  nameNode.className = "character__name";

  const heightNode = document.createElement("p");
  heightNode.innerText = `Height: ${character.height} m`;
  const weightNode = document.createElement("p");
  weightNode.innerText = `Weight: ${character.mass} kg`;
  const filmsNode = document.createElement("p");
  filmsNode.innerText = `Films: ${character.films.length}`;
  const hairNode = document.createElement("p");
  hairNode.innerText = `Hair color: ${character.hair_color}`;

  newDiv.appendChild(nameNode);
  newDiv.appendChild(weightNode)
  newDiv.appendChild(heightNode);
  newDiv.appendChild(hairNode);
  newDiv.appendChild(filmsNode);

  const vehicleNode = document.createElement("p");
  if (character.vehicles.length > 0) {
    vehicleNode.innerText = `Has ${character.vehicles.length} vehicle`  + sOrNoS(character.vehicles.length) + "!";
  } else {
    vehicleNode.innerText = "Doesn't have any vehicles :("
  }
  newDiv.appendChild(vehicleNode);

  const starshipNode = document.createElement("p");
  if (character.starships.length > 0) {
    starshipNode.innerText = `Has ${character.starships.length} starship` + sOrNoS(character.starships.length) + "!";
  } else {
    starshipNode.innerText = "Doesn't have any starships :("
  }
  newDiv.appendChild(starshipNode);

  return newDiv;
}

const sOrNoS = (len) => len > 1 ? "s" : "";

const renderCharacters = async () => {
  showLoadingAnimation();
  const response = await fetchCharacters();
  if (response) {
    closeAnimation();
  }
  const fetchedCharacters = response.results;
  fetchedCharacters.forEach(character => {
    const characterComponent = getCharacterComponent(character);
    document.getElementById("characters").appendChild(characterComponent);
  });
  maxPages = Math.ceil(response.count/10);
  delete response.results;
  renderPagination(response, currentPage, maxPages);
  document.getElementById("characters-count").innerHTML = "Characters found: " + response.count;
}

renderCharacters();

const reRenderCharacters = () => {
  const characters = document.getElementById("characters");
  while(characters.lastChild) {
    characters.removeChild(characters.lastChild);
  }
  renderCharacters();
}

const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");

document.getElementById("prev-button").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage =  Number(currentPage) - 1;
  }
  reRenderCharacters();
});

document.getElementById("next-button").addEventListener("click", () => {
  if (currentPage < maxPages) {
    currentPage =  Number(currentPage) + 1;
  }
  reRenderCharacters();
});

const pageLinks = document.getElementById("pagelinks");
const isPageActive = (status) => status ? "pagination-link pag_active" : "pagination-link";

const renderPagination = (response) => {
  while(pageLinks.lastChild) {
    console.log('Child removed')
    pageLinks.removeChild(pageLinks.lastChild);
  }

  for (let i = 1; i <= maxPages; i++) {
    const pageLink = document.createElement("a");
    let isActive = i == currentPage;
    pageLink.className = isPageActive(isActive);
    pageLink.id = `page_${i}`
    pageLink.innerText = i;
    pageLink.addEventListener("click", () => {
      currentPage = pageLink.innerText;
      reRenderCharacters();
    })
    pageLinks.appendChild(pageLink);
  }

  prevBtn.removeAttribute("disabled");
  if (!response.previous) {
    prevBtn.setAttribute("disabled", true);
  }

  nextBtn.removeAttribute("disabled");
  if(!response.next) {
    nextBtn.setAttribute("disabled", true);
  }
}




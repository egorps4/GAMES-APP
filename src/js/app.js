//Поддержка Webp
import * as flsFunction from "./modules/functions.js";

flsFunction.isWebp();

const API_KEY = "e0fdba8f84e74c8fa0a3416de562b21f",
      API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=21&search_exact&ordering=-metacritic`; 

async function getGames(url) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    showGames(responseData);
}

function getColor(ratingColor) {
    if (ratingColor >= 70) {
        return 'green';
    } else if (ratingColor >= 50) {
        return 'orange';
    } else {
        return 'red'
    }
}

function getRating(rating) {
    if (rating) {
        return `<div class="cards__rating cards__rating--${getColor(rating)}">${rating}</div>`
    }
}

function getImage(image) {
    if (!image) {
        image = 'img/01.jpg';
    }
    return image;
}

function showGames(data) {
    const gamesContainer = document.querySelector('.cards__container');

    gamesContainer.innerHTML = '';

    data.results.forEach(game => {
        const gameCard = document.createElement('div');

        gameCard.classList.add('cards__item');

        gameCard.innerHTML = `
            <div class="cards__image"> 
                <img class="cards__img" src="${getImage(game.background_image)}" alt="${game.name}">
                ${getRating(game.metacritic)}
            </div>
            <div class="cards__description">
                <div class="cards__name">${game.name}</div>
                <div class="cards__genre">${game.genres.map(genre => ` ${genre.name}`)}</div>
            </div>
        `

        gamesContainer.appendChild(gameCard);
    });

    if (gamesContainer.children.length === 0) {
        gamesContainer.innerHTML = 'Ничего не найдено'
    }
};

getGames(API_URL);

const searchForm = document.querySelector('.header__form'),
      search = document.querySelector('.header__search');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const apiSearch = `${API_URL}&search=${search.value}`; 
    
    if (search.value) {
        getGames(apiSearch);
    }
});
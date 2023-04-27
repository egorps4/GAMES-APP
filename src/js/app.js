//Поддержка Webp
import * as flsFunction from "./modules/functions.js";
import dropDownMenu from "./modules/dropdown.js";


flsFunction.isWebp();
dropDownMenu();

let API_KEY = 'e0fdba8f84e74c8fa0a3416de562b21f',
    API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=21&search_exact&ordering=-metacritic&platforms=,4,187,18,1,186,14,16,`; 

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

        if (game.metacritic) {
            gameCard.innerHTML = `
            <div class="cards__image"> 
                <img class="cards__img" src="${getImage(game.background_image)}" alt="${game.name}">
                ${getRating(game.metacritic)}
                <div class="cards__platform">${game.platforms.map(platform => ` ${platform.platform.name}`)}</div>
            </div>
            <div class="cards__description">
                <div class="cards__name">${game.name}</div>
                <div class="cards__genre">${game.genres.map(genre => ` ${genre.name}`)}</div>
            </div>
        `
        
        gamesContainer.appendChild(gameCard);
        };
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

    if (API_URL.includes('&search=')) {
        API_URL = API_URL.replace(/&search=.+/, '');
    }

    API_URL = `${API_URL}&search=${search.value}`   

    if (search.value) {
        getGames(API_URL);
    }

    search.value = '';
    console.log(API_URL)
});


const filters = document.querySelectorAll('.submenu__item');


filters.forEach(filter => {   
    filter.addEventListener('click', (event) => {
        const target = event.target;

        if (target === filter) {
            filter.classList.toggle('active');

            const platform = filter.getAttribute('id');
   
            if (API_URL.includes(`,${platform},`)) {
                API_URL = API_URL.replace(`,${platform},`, ',');
            } else {
                API_URL = API_URL.replace(`&platforms=`, `&platforms=,${platform}`);
            } 
        } 
        
        getGames(API_URL);
    });
});

function filtersReset() {
    const filtersReset = document.querySelector('.filters__reset'),
          filters = document.querySelectorAll('.submenu__item'),
          defaultPlatform = '&platforms=,4,187,18,1,186,14,16,';
    
    filtersReset.addEventListener('click', () => {
        API_URL = API_URL.replace(/&platforms=.[0-9,]+/, defaultPlatform);
        getGames(API_URL);

        filters.forEach(filter => {
            if (!filter.classList.contains('active')) {
                filter.classList.add('active');
            }
        });
    });
};

filtersReset();


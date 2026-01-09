
const apiUrl = 'travel_recommendation_api.json';

const btnSearch = document.getElementById('btnSearch');
const inputSearch = document.getElementById('conditionInput');
btnSearch.addEventListener('click', () => dataSource(inputSearch.value));

const divRecommendations = document.getElementById('recommendations');
divRecommendations.style.display = 'none';

const dataSource = (searchData) => {


    const spanLoadingMessage = document.getElementById('loadingMessage');
    const ulRecommendationList = document.getElementById('recommendationListCountries');
    const ulRecommendationListTemples = document.getElementById('recommendationListTemples');
    const ulRecommendationListBeaches = document.getElementById('recommendationListBeaches');

    ulRecommendationList.innerHTML = '';
    ulRecommendationListTemples.innerHTML = '';
    ulRecommendationListBeaches.innerHTML = '';

    searchData = searchData.toLowerCase().trim();

    console.log(`Searching for: ${searchData}`);

    divRecommendations.style.display = 'block';
    fetch(apiUrl)
        .then(response => response.json()) // parse JSON response
        .then(data => {
            ulRecommendationList.innerHTML = ''; // Clear loading text
            spanLoadingMessage.style.display = 'none';

            if (searchData === 'beach' || searchData === 'beaches') {
                data.beaches.forEach(beach => {
                    const card = createRecommendationCard(
                        beach.imageUrl,
                        beach.name,
                        beach.description
                    );
                    ulRecommendationListBeaches.appendChild(card);
                });
            }

            if (searchData === 'temple' || searchData === 'temples') {
                data.temples.forEach(temple => {
                    const card = createRecommendationCard(
                        temple.imageUrl,
                        temple.name,
                        temple.description
                    );
                    ulRecommendationListTemples.appendChild(card);
                });
            }

            if (searchData === 'country' || searchData === 'countries') {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        const card = createRecommendationCard(
                            city.imageUrl,
                            city.name,
                            city.description
                        );
                        ulRecommendationList.appendChild(card);
                    });
                });
            }

            if (searchData !== 'beach' && searchData !== 'beaches' && searchData !== 'temple' && searchData !== 'temples' && searchData !== 'country' && searchData !== 'countries') {
                ulRecommendationList.innerHTML = '<li>Please enter "beach", "temple", or "country" to get recommendations.</li>';
            }


        });
};


const createRecommendationCard = (image, title, description) => {
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="recommendation-item">
            <div class="recommendation-img">
                <img src="./img/${image}" alt="${title}" />
            </div>
            <div class="recommendation-title">
                <h1>${title}</h1>
            </div>
            <div class="recommendation-content">
                <p>${description}</p>
            </div>
            <div class="recommendation-visit">
                <button>Visit</button>
            </div>
        </div>
    `;

    return li;
};

const btnCloseSearch = document.getElementById('btnCloseSearch');
btnCloseSearch.addEventListener('click', () => {
    divRecommendations.style.display = 'none';
    inputSearch.value = '';
});

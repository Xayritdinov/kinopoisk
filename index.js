const API_KEY = "85fc768d"

async function fetchData(title) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t="${title}"`)
    const data = await response.json()
    return data
}

const searchInputElement = document.querySelector('#movie-search-input')
const searchButtonElement= document.querySelector('#movie-search-button')

const modalTitleElement = document.querySelector("#exampleModalLabel");
const modalBodyElement = document.querySelector(".modal-body");

let movieTitleValue = ''

searchButtonElement.addEventListener('click', async () => {
    movieTitleValue = searchInputElement.value
    const movie = await fetchData(movieTitleValue)
    const cardElementTemplate = `
        <div class="card" style="width: 18rem">
            <img
            src="${movie.Poster}"
            class="card-img-top"
            alt="${movie.Title} movie poster"
            />
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Plot}</p>
                <a
                    href="#"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    id="details-button"
                    >
                    Подробнее
                </a>
            </div>
        </div>
    `
    
    const searchResultsContainer = document.querySelector('.search-results')
        
    if (searchResultsContainer.firstElementChild) {        
        searchResultsContainer.removeChild(searchResultsContainer.firstElementChild)
    }
    
    searchResultsContainer.insertAdjacentHTML('beforeend', cardElementTemplate)
    searchInputElement.value = ''

    const detailsButton = document.querySelector("#details-button");
    
    detailsButton.addEventListener("click", () => {
        modalTitleElement.textContent = movie.Title
        modalBodyElement.innerHTML = ""

        const modalContent = `
            <div class="d-flex">
                <div class="me-3">
                    <img src="${movie.Poster}" alt="${movie.Title} poster" class="img-fluid" style="max-width: 150px; height: auto;">
                </div>
                <div>
                    <p><strong>Год выпуска:</strong> ${movie.Year}</p>
                    <p><strong>Режиссёр:</strong> ${movie.Director}</p>
                    <p><strong>Актёры:</strong> ${movie.Actors}</p>
                    <p><strong>Жанр:</strong> ${movie.Genre}</p>
                    <p><strong>Рейтинг IMDb:</strong> ${movie.imdbRating}</p>
                    <p><strong>Описание:</strong> ${movie.Plot}</p>
                </div>
            </div>
        `

        modalBodyElement.insertAdjacentHTML('beforeend', modalContent)
    });
})



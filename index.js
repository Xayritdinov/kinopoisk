const API_KEY = "85fc768d";

async function fetchData(title) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
  const data = await response.json();
  return data;
}

const searchInputElement = document.querySelector('#movie-search-input');
const searchButtonElement = document.querySelector('#movie-search-button');

const modalTitleElement = document.querySelector("#exampleModalLabel");
const modalBodyElement = document.querySelector(".modal-body");

const searchResultsContainer = document.querySelector('.search-results');
const spinnerElement = document.querySelector('#loading-spinner');
const toastSuccess = document.querySelector('#toast-success');
const toastFail = document.querySelector('#toast-fail');

let movieTitleValue = '';

function showToast(toastElement) {
  const toast = new bootstrap.Toast(toastElement);
  toastElement.style.display = 'block';
  toast.show();
  setTimeout(() => {
    toastElement.style.display = 'none';
  }, 3000);
}

searchButtonElement.addEventListener('click', async () => {
  movieTitleValue = searchInputElement.value;

  while (searchResultsContainer.firstChild) {
    searchResultsContainer.removeChild(searchResultsContainer.firstChild);
  }

  spinnerElement.style.display = 'block';

  setTimeout(async () => {
    const movie = await fetchData(movieTitleValue);
    spinnerElement.style.display = 'none';

    searchInputElement.value = '';

    if (movie.Response === "True") {
      const cardElement = `
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
      searchResultsContainer.insertAdjacentHTML('beforeend', cardElement)

      showToast(toastSuccess);
      
      const detailsButton = document.querySelector("#details-button");
      detailsButton.addEventListener("click", () => {
        modalTitleElement.textContent = movie.Title;
        while (modalBodyElement.firstChild) {
          modalBodyElement.removeChild(modalBodyElement.firstChild);
        }
        const modalContent = `
          <div class="d-flex">
              <div class="me-3">
                  <img src="${movie.Poster}" alt="${movie.Title} poster" class="img-fluid" style="max-width: 200px; height: auto;">
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
        `;
        modalBodyElement.insertAdjacentHTML('beforeend', modalContent);
      });
    } else {
      showToast(toastFail);
    }
  }, 1000);
});

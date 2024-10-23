const modalBodyElement = document.querySelector(".modal-body");
const modalTitleElement = document.querySelector("#exampleModalLabel");

const favMoviesList = JSON.parse(localStorage.getItem('favMovies'));

const favMoviesContainer = document.body.querySelector('.fav-movies-container');

favMoviesList.forEach((favMovie, index) => {

    const cardElement = `
    <div class="card" style="width: 18rem" data-card-id="${index}">
        <img
        src="${favMovie.Poster}"
        class="card-img-top"
        alt="${favMovie.Title} movie poster"
        />
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${favMovie.Title}</h5>
            <p class="card-text">${favMovie.Plot}</p>
            <div class="d-flex justify-content-between flex-wrap gap-2 mt-auto">
                <a
                href="#"
                class="btn btn-primary details-button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-movie-index="${index}"
                >
                Подробнее
                </a>
                <a
                    href="#"
                    class="btn btn-danger remove-button"
                    >
                    Удалить
                </a>
            </div>
        </div>
    </div>`;

    favMoviesContainer.insertAdjacentHTML('beforeend', cardElement);

    const removeFavMovieButton = favMoviesContainer.children[favMoviesContainer.children.length - 1].querySelector('.remove-button');

    removeFavMovieButton.addEventListener('click', () => {
        const movieIdToDelete = Number(removeFavMovieButton.parentElement.parentElement.parentElement.dataset.cardId);

        favMoviesList.splice(movieIdToDelete, 1);

        localStorage.setItem('favMovies', JSON.stringify(favMoviesList));
        removeFavMovieButton.closest('.card').remove();
    });

    const detailsButton = favMoviesContainer.children[favMoviesContainer.children.length - 1].querySelector('.details-button');
    
    detailsButton.addEventListener("click", () => {
        modalTitleElement.textContent = favMovie.Title;
        while (modalBodyElement.firstChild) {
            modalBodyElement.removeChild(modalBodyElement.firstChild);
        }
        const modalContent = `
        <div class="d-flex">
            <div class="me-3">
                <img src="${favMovie.Poster}" alt="${favMovie.Title} poster" class="img-fluid" style="max-width: 200px; height: auto;">
            </div>
            <div>
                <p><strong>Год выпуска:</strong> ${favMovie.Year}</p>
                <p><strong>Режиссёр:</strong> ${favMovie.Director}</p>
                <p><strong>Актёры:</strong> ${favMovie.Actors}</p>
                <p><strong>Жанр:</strong> ${favMovie.Genre}</p>
                <p><strong>Рейтинг IMDb:</strong> ${favMovie.imdbRating}</p>
                <p><strong>Описание:</strong> ${favMovie.Plot}</p>
            </div>
        </div>`;
        modalBodyElement.insertAdjacentHTML('beforeend', modalContent);
    });
    
});

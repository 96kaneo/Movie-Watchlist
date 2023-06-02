let watchlistEl = document.getElementById('watched-list-container')
let watchHtml = ''
const placeholder =
    `<div>
<div class="search-results-placeholder-container">
    <p class="watchlist-message">Your watchlist is looking a little empty</p>
    <div class="add-message">
        <i class="fa-solid fa-circle-plus add-btn"></i>
        <a href='index.html' class="message">Let's add some movies</a>
    </div>
</div>`



function renderWatchlist(watchlistString) {
    watchlistEl.innerHTML = watchlistString

}


function watchlistHtml() {
    let localStorageData = localStorage.getItem('watchlistArr') ? JSON.parse(localStorage.getItem('watchlistArr')) : []
    if (localStorageData.length) {
        watchHtml = localStorageData.map((movie) => {
            let { Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID } = movie

            return `<div class="movie-item" id=${imdbID}>
        <img class="movie-poster" src="${Poster}">

        <div class="movie-info">
            <div class="movie-antet">
                <p class="movie-title">${Title}</p>
                <i class="fa-solid fa-star" style="color: #e6c51e;"></i>
                <p class="movie-rating">${imdbRating}</p>
            </div>

            <div class="extra-info">
                <p class="movie-runtime">${Runtime}</p>
                <p class="movie-genre">${Genre}</p>
                <div id="add-icon-container">
                <img class="delete-icon" id="delete-movie" data-movie-item=${imdbID} src="delete-icon.png" alt="a red rounded symbol with an x sign inside.">
           </div>
            </div>

            <p class="movie-plot">${Plot}</p>

        </div>
    </div>`

        }).join('')
        renderWatchlist(watchHtml)
    } else if (!localStorageData.length) {
        renderWatchlist(placeholder)

    }


}

watchlistHtml()

watchlistEl.addEventListener('click', (e) => {
    if (e.target.dataset.movieItem)
        removeItem(e.target.dataset.movieItem)
})

function removeItem(item) {
    let watchlistArr = JSON.parse(localStorage.getItem('watchlistArr'))
    for (let movie of watchlistArr) {
        if (item == movie.imdbID) {
            let movieIndex = watchlistArr.indexOf(movie)
            watchlistArr.splice(movieIndex, 1)
            localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr))
            watchlistHtml()

        }
    }
}

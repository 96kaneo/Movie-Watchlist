const searchBar = document.getElementById('search-bar')
const watchlist = document.getElementById('watched-list-container')
const movieList = document.getElementById('movie-list-container')
let movieArr = []
let watchlistArr = localStorage.getItem('watchlistArr') ? JSON.parse(localStorage.getItem('watchlistArr')) : []
let moviesHtml = ''
let watchHtml = ''


document.getElementById('search-container').addEventListener('submit', (e) => {
    e.preventDefault()
    moviesHtml = ''
    movieArr = []
    searchForMovie()

})



function searchForMovie() {
    if (searchBar.value) {
        fetch(`https://www.omdbapi.com/?apikey=d7677c22&s=${searchBar.value}`)
            .then(res => res.json())
            .then(data => { searchMovie(data.Search) })
            .catch(error => {
                movieList.innerHTML = `<div class="search-results-placeholder-container">
            <i class="fa-sharp fa-solid fa-film movie-icon"></i>
            <p class="holder-message">Unable to find what you are looking for. Please try again.</p>
        </div>
`
            })
    }

}

function searchMovie(movieData) {
    for (item of movieData) {
        fetch(`https://www.omdbapi.com/?apikey=d7677c22&t=${item.Title}`)
            .then(res => res.json())
            .then(data => {
                movieArr.push(data)
                setmoviesHtml()
            })
    }
}

function setmoviesHtml() {
    moviesHtml = movieArr.map((movie) => {
        const { Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID } = movie

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
                <img class="add-icon" id="add-movie" data-movie-item=${imdbID} src="add-icon.png" alt="a white round symbol with a plus sign inside">
                </div>
            </div>

            <p class="movie-plot">${Plot}</p>

        </div>
    </div>`
    }).join('')
    renderMovie(moviesHtml)

}


function renderMovie(movieString) {
    movieList.innerHTML = movieString

}

document.addEventListener('click', (e) => {
    if (e.target.dataset.movieItem) {
        console.log(e.target.id)
        e.preventDefault()
        e.target.parentElement.innerHTML = `<img class="add-icon" id="add-movie" src="check-icon.png" alt="a white round symbol with a plus sign inside">`
        addMovie(e.target.dataset.movieItem)



    }
})

function addMovie(movieAdded) {
    fetch(`https://www.omdbapi.com/?apikey=d7677c22&i=${movieAdded}`)
        .then(res => res.json())
        .then(data => {
            watchlistArr.push(data)
            localStorage.setItem('watchlistArr', JSON.stringify(watchlistArr))
        })

}




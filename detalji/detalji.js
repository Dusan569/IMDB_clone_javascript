let detalji = [];
let relatedMovies = [];

let movieId = localStorage.getItem("movieId");
let movieHeading = document.getElementById("movie-title");
let movieDivDescription = document.getElementById("movie-details");
let related = document.getElementById("show-movies");


axios.get(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=5ece5ffd`, {}).then((response) => {
    detalji = response.data;
    console.log(detalji);

    movieHeading.innerHTML = `${detalji.Title}`;
    movieDescription();


    axios.get(`https://www.omdbapi.com/?s=${detalji.Title}&type=movie&page=1&apikey=5ece5ffd`,{}).then((response) => {
        relatedMovies = response.data;
        relatedToTitleMovies(relatedMovies.Search);
    })
})

function pronadjiFilm(film){
    movieId = film;
    localStorage.setItem("movieId", movieId);
    location.href = "/detalji/detalji.html";
}

function movieDescription(){
   let description = `
    <div id="movie-image">
        <img id='image' src="${detalji.Poster}" alt="">
    </div>
    <div id="movie-description">
        <h5 class="card-title">Actors: <span id="actors">${detalji.Actors}</span></h5>
        <h5 class="card-title">Awards: <span id="award">${detalji.Awards}</span></h5>
        <h5 class="card-title">Country: <span id="country">${detalji.Counrty}</span></h5>
        <h5 class="card-title">Director: <span id="director">${detalji.Director}</span></h5>
        <h5 class="card-title">Genre: <span id="genre">${detalji.Genre}</span></h5>
        <h5 class="card-title">Language: <span id="language">${detalji.Language}</span></h5>
        <h5 class="card-title">Plot: <span id="plot">${detalji.Plot}</span></h5>
        <h5 class="card-title">Rating: <span id="ratings">${detalji.imdbRating}</span></h5>
        <h5 class="card-title">Realised: <span id="realised">${detalji.Released}</span></h5>
        <h5 class="card-title">Duration: <span id="time">${detalji.Runtime}</span></h5>
    </div>`;
    movieDivDescription.innerHTML = description;

    let rating = document.getElementById("ratings");
    let image = document.getElementById("image");

    if(rating.innerText < 4){
        rating.style.color = 'red';
        image.style.boxShadow = "5px 5px 10px red";
    }
    else if(rating.innerText > 4 && rating.innerText < 7){
        rating.style.color = 'yellow';
        image.style.boxShadow = "5px 5px 10px yellow";
    }
    else{
        rating.style.color = 'green';
        image.style.boxShadow = "5px 5px 10px green";
    }
}

function relatedToTitleMovies(movies){
    let result = ``;
    if(movies.Poster !== "N/A"){
        for(let movie of movies){
            let posterUrl = movie.Poster;
            if(posterUrl === "N/A"){
                posterUrl = "/images/image_not_found.png";
            }
            result += `
            <div class="card" style="width: 18rem;">
            <img src="${posterUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Year}.</p>
                <div id="hover-content">
                    <h5 class="card-title">Actors: <span id="actors"></span></h5>
                    <h5 class="card-title">Awards: <span id="award"></span></h5>
                    <h5 class="card-title">Country: <span id="country"></span></h5>
                    <button class="btn btn-primary" onclick = "pronadjiFilm('${movie.imdbID}')" id="detailsBtn">Show details</button>
                </div>
            </div>
            
        </div>`
        console.log(movie);
        }
        related.innerHTML = result;
    }
}




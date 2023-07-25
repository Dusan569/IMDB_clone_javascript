//Link = https://www.omdbapi.com/?s=${movieName}&type=movie&page=1&apikey=5ece5ffd
// http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=5ece5ffd

let searchInput = document.getElementById("formGroupExampleInput");
let showMovies = document.getElementById("show-movies");
let searchBtn = document.getElementById("search-btn");
let card = document.getElementsByClassName("card");


let niz = [];
let movieId = null;
let detaljiFilma = [];

searchBtn.addEventListener("click", () => {
    axios.get(`https://www.omdbapi.com/?s=${searchInput.value}&type=movie&page=1&apikey=5ece5ffd`, {}).then((response) => {
    niz = response.data;
    console.log(niz.Search);  
    if(niz.Response == "True" ? prikaziFilmoveUSearchu(niz.Search) : alert("No movies"));   
    searchInput.value = "";
})
})

function pronadjiFilm(film){
    movieId = film;
    localStorage.setItem("movieId", movieId);
    location.href = "/detalji/detalji.html";
}

function prikaziFilmoveUSearchu(movies){
    let result = ``;
    if(movies.Poster !== "N/A"){
        for(let movie of movies){
            let posterUrl = movie.Poster;
            if(posterUrl === "N/A"){
                posterUrl = "/images/image_not_found.png";
            }
            // axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=5ece5ffd`, {}).then((response) => {
            //     detaljiFilma = response.data;
            //     console.log(detaljiFilma);  
            // })
            result += `
            <div class="card" style="width: 18rem;">
            <img src="${posterUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">${movie.Year}.</p>
                <button class="btn btn-primary" onclick = "pronadjiFilm('${movie.imdbID}')" id="detailsBtn">Show details</button>
            </div>
            
        </div>`
        }
        showMovies.innerHTML = result;
    }
}



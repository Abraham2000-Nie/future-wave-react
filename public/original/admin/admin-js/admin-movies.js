// Load Places into Dropdowns
function loadPlaces() {

    let places = JSON.parse(localStorage.getItem("places"));

    if (!places) {
        places = ["Bangalore", "Mysore", "Chennai", "Mumbai", "Pune"];
        localStorage.setItem("places", JSON.stringify(places));
    }

    let placeSelect = document.getElementById("placeSelect");
    let viewPlace = document.getElementById("viewPlace");

    placeSelect.innerHTML = "";
    viewPlace.innerHTML = "";

    places.forEach(p=> {
        placeSelect.innerHTML += "<option>" + p + "</option>";
        viewPlace.innerHTML += "<option>" + p + "</option>";
    });
}

function addMovie() {

    let place = document.getElementById("placeSelect").value;

    let name = document.getElementById("movieName").value;
    let desc = document.getElementById("movieDesc").value;

    let rawDate = document.getElementById("movieDate").value;

    if (name === "" || desc === "" || rawDate === "") {
        alert("Please fill all fields");
        return;
    }

    let d = new Date(rawDate);

    let day = String(d.getDate()).padStart(2, "0");

    let year = d.getFullYear();

    let monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

    let month = monthNames[d.getMonth()];

    let date = day + " " + month + " " + year;


    let moviesData = JSON.parse(localStorage.getItem("moviesData")) || {};

    if (!moviesData[place]) {
        moviesData[place] = [];
    }

    moviesData[place].push({
        name: name,
        desc: desc,
        date: date
    });

    localStorage.setItem("moviesData", JSON.stringify(moviesData));

    alert("Movie added successfully!");

    document.getElementById("movieName").value = "";
    document.getElementById("movieDesc").value = "";
    document.getElementById("movieDate").value = "";

    loadMovies();
}

// Load Movies for Selected Place
function loadMovies() {

    let place = document.getElementById("viewPlace").value;

    let moviesData = JSON.parse(localStorage.getItem("moviesData")) || {};

    let list = document.getElementById("moviesList");

    list.innerHTML = "";

    if (!moviesData[place] || moviesData[place].length === 0) {
        list.innerHTML = "<p>No movies added for this place</p>";
        return;
    }

    moviesData[place].forEach((movie, index) => {

        list.innerHTML += 
    "<div class='movie-item'>" +
    "<b>" + movie.name + "</b><br>" +
    movie.desc + "<br>" +
    "Release: " + movie.date + "<br>" +
    "<button class='delete-btn' onclick='deleteMovie(\"" + place + "\"," + index + ")'>" +
    "Delete</button>" +
    "</div>";

       
    });
}

// Delete Movie
function deleteMovie(place, index) {

    let moviesData = JSON.parse(localStorage.getItem("moviesData"));

    moviesData[place].splice(index, 1);

    localStorage.setItem("moviesData", JSON.stringify(moviesData));

    alert("Movie deleted!");

    loadMovies();
}

// Back Button
function goBack() {
    window.location.href = "admin-dashboard.html";
}

// Initial Load
window.onload = function () {
    loadPlaces();
    loadMovies();
};
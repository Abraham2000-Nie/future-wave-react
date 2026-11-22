// get selected place  
let place = localStorage.getItem("selectedPlace");  

if (!place) {  
    alert("Please select a place first");  
    window.location.href = "dashboard.html";  
}  

// set title  
document.getElementById("cityTitle").innerText =  
    "Movies in " + place;  

// DEFAULT MOVIE DATA  
let defaultMovies = {  
    Bangalore: [  
        { name: "KGF Chapter 2", desc: "Action blockbuster", date: "14 Apr 2022" },  
        { name: "Kantara", desc: "Folk action drama", date: "30 Sep 2022" },  
        { name: "Charlie 777", desc: "Emotional adventure film", date: "10 Jun 2022" }  
    ],  

    Mysore: [  
        { name: "Kirik Party", desc: "College life entertainer", date: "30 Dec 2016" },  
        { name: "Yuvarathnaa", desc: "Action drama", date: "01 Apr 2021" },  
        { name: "James", desc: "Power-packed action movie", date: "17 Mar 2022" }  
    ],  

    Chennai: [  
        { name: "Vikram", desc: "Action thriller", date: "03 Jun 2022" },  
        { name: "Master", desc: "Mass action drama", date: "13 Jan 2021" },  
        { name: "Leo", desc: "Stylish action thriller", date: "19 Oct 2023" }  
    ],  

    Mumbai: [  
        { name: "Pathaan", desc: "Spy action thriller", date: "25 Jan 2023" },  
        { name: "Jawan", desc: "Mass action entertainer", date: "07 Sep 2023" },  
        { name: "Animal", desc: "Intense crime drama", date: "01 Dec 2023" }  
    ],  

    Pune: [  
        { name: "3 Idiots", desc: "College life drama", date: "25 Dec 2009" },  
        { name: "Sita Ramam", desc: "Romantic war drama", date: "05 Aug 2022" },  
        { name: "Andhadhun", desc: "Crime thriller", date: "05 Oct 2018" }  
    ]  
};  

// load movies from localStorage if available  
let storedMovies = JSON.parse(localStorage.getItem("moviesData"));  

if (!storedMovies) {  
    localStorage.setItem("moviesData", JSON.stringify(defaultMovies));  
    storedMovies = defaultMovies;  
}  

// render movies  
let moviesList = document.getElementById("moviesList");  

if (storedMovies[place]) {  
    storedMovies[place].forEach(movie => {  

        let box = document.createElement("div");  
        box.className = "movie-box";  

        box.innerHTML = `  
            <img src="images/posters/movie1.jpg" alt="Movie">  

            <h3>${movie.name}</h3>  
            <p>${movie.desc}</p>  
            <span>Release: ${movie.date}</span>  

            <div class="booking">  
                <p>Tickets available on</p>  
                <a href="https://in.bookmyshow.com" target="_blank">BookMyShow</a> |  
                <a href="https://paytm.com/movies" target="_blank">Paytm</a> |  
                <a href="https://www.district.in" target="_blank">District</a>  
            </div>  

            <p class="note">*Booking handled by external platforms</p>  
        `;  

        moviesList.appendChild(box);  
    });  

} else {  
    moviesList.innerHTML = "<h3>No movies added for this city yet.</h3>";  
}  

// navigation functions  
function goHome() {  
    window.location.href = "dashboard.html";  
}  

function goReport() {  
    let place = localStorage.getItem("selectedPlace") || "Unknown";  

    localStorage.setItem("reportSection", "Movies");  
    localStorage.setItem("reportPlace", place);  
    localStorage.setItem("returnPage", "movies.html");  

    window.location.href = "report.html";  
}
// Initialize eateries storage
function initializeEateriesData() {

    let data = JSON.parse(localStorage.getItem("eateriesData"));

    if (!data) {

        let defaultEateries = {
            Bangalore: [],
            Mysore: [],
            Chennai: [],
            Mumbai: [],
            Pune: []
        };

        localStorage.setItem("eateriesData", JSON.stringify(defaultEateries));
    }
}

// Load places into dropdowns
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

    places.forEach(p => {
        placeSelect.innerHTML += "<option>" + p + "</option>";
        viewPlace.innerHTML += "<option>" + p + "</option>";
    });
}

// FORMAT DATE AS DD MMM YYYY
function formatDate(inputDate) {

    let d = new Date(inputDate);

    let day = String(d.getDate()).padStart(2, "0");

    let year = d.getFullYear();

    let monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

    let month = monthNames[d.getMonth()];

    return day + " " + month + " " + year;
}

// Add Eatery
function addEatery() {

    let place = document.getElementById("placeSelect").value;
    let name = document.getElementById("eateryName").value;
    let desc = document.getElementById("eateryDesc").value;
    let rawDate = document.getElementById("eateryDate").value;

    if (name === "" || desc === "" || rawDate === "") {
        alert("Please fill all fields");
        return;
    }

    let date = formatDate(rawDate);

    let eateriesData = JSON.parse(localStorage.getItem("eateriesData")) || {};

    if (!eateriesData[place]) {
        eateriesData[place] = [];
    }

    eateriesData[place].push({
        name: name,
        desc: desc,
        date: date
    });

    localStorage.setItem("eateriesData", JSON.stringify(eateriesData));

    alert("Eatery added successfully!");

    document.getElementById("eateryName").value = "";
    document.getElementById("eateryDesc").value = "";
    document.getElementById("eateryDate").value = "";

    loadEateries();
}

// Load Eateries
function loadEateries() {

    let place = document.getElementById("viewPlace").value;

    let eateriesData = JSON.parse(localStorage.getItem("eateriesData")) || {};

    let list = document.getElementById("eateriesList");

    list.innerHTML = "";

    if (!eateriesData[place] || eateriesData[place].length === 0) {
        list.innerHTML = "<p>No eateries added for this place</p>";
        return;
    }

    eateriesData[place].forEach((eatery, index) => {

        list.innerHTML +=
            "<div class='eatery-item'>" +
            "<b>" + eatery.name + "</b><br>" +
            eatery.desc + "<br>" +
            "Opened: " + eatery.date + "<br>" +
            "<button class='delete-btn' onclick='deleteEatery(\"" + place + "\"," + index + ")'>" +
            "Delete</button>" +
            "</div>";

    });
}

// Delete Eatery
function deleteEatery(place, index) {

    let eateriesData = JSON.parse(localStorage.getItem("eateriesData"));

    eateriesData[place].splice(index, 1);

    localStorage.setItem("eateriesData", JSON.stringify(eateriesData));

    alert("Eatery deleted!");

    loadEateries();
}

// Back button
function goBack() {
    window.location.href = "admin-dashboard.html";
}

// Initial load
window.onload = function () {

    initializeEateriesData();
    loadPlaces();
    loadEateries();
};
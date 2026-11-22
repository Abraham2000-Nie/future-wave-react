// Ensure resortsData exists (sync with user side)
function initializeResortsData() {

    let data = JSON.parse(localStorage.getItem("resortsData"));

    if (!data) {

        let defaultResorts = {
            Bangalore: [],
            Mysore: [],
            Chennai: [],
            Mumbai: [],
            Pune: []
        };

        localStorage.setItem("resortsData", JSON.stringify(defaultResorts));
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

// Add Resort
function addResort() {

    let place = document.getElementById("placeSelect").value;
    let name = document.getElementById("resortName").value;
    let desc = document.getElementById("resortDesc").value;
    let rawDate = document.getElementById("resortDate").value;

if (rawDate === "") {
    alert("Please fill all fields");
    return;
}

// convert to required format
let d = new Date(rawDate);

let day =String(d.getDate()).padStart(2,"0");
let year = d.getFullYear();

let monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

let month = monthNames[d.getMonth()];

let date = day + " " + month + " " + year;

    if (name === "" || desc === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    let resortsData = JSON.parse(localStorage.getItem("resortsData")) || {};

    if (!resortsData[place]) {
        resortsData[place] = [];
    }

    resortsData[place].push({
        name: name,
        desc: desc,
        date: date
    });

    localStorage.setItem("resortsData", JSON.stringify(resortsData));

    alert("Resort added successfully!");

    document.getElementById("resortName").value = "";
    document.getElementById("resortDesc").value = "";
    document.getElementById("resortDate").value = "";

    loadResorts();
}

// Load Resorts
function loadResorts() {

    let place = document.getElementById("viewPlace").value;

    let resortsData = JSON.parse(localStorage.getItem("resortsData")) || {};

    let list = document.getElementById("resortsList");

    list.innerHTML = "";

    if (!resortsData[place] || resortsData[place].length === 0) {
        list.innerHTML = "<p>No resorts added for this place</p>";
        return;
    }

    resortsData[place].forEach((resort, index) => {

        list.innerHTML +=
            "<div class='resort-item'>" +
            "<b>" + resort.name + "</b><br>" +
            resort.desc + "<br>" +
            "Opened: " + resort.date + "<br>" +
            "<button class='delete-btn' onclick='deleteResort(\"" + place + "\"," + index + ")'>" +
            "Delete</button>" +
            "</div>";

    });
}

// Delete Resort
function deleteResort(place, index) {

    let resortsData = JSON.parse(localStorage.getItem("resortsData"));

    resortsData[place].splice(index, 1);

    localStorage.setItem("resortsData", JSON.stringify(resortsData));

    alert("Resort deleted!");

    loadResorts();
}

// Back button
function goBack() {
    window.location.href = "admin-dashboard.html";
}

// Initial load
window.onload = function () {

    initializeResortsData();
    loadPlaces();
    loadResorts();
};
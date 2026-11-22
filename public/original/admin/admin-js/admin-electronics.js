// Initialize electronics storage
function initializeGadgetsData() {

    let data = JSON.parse(localStorage.getItem("electronicsData"));

    if (!data) {

        let defaultGadgets = {
            Bangalore: [],
            Mysore: [],
            Chennai: [],
            Mumbai: [],
            Pune: []
        };

        localStorage.setItem("electronicsData", JSON.stringify(defaultGadgets));
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

// Add Gadget
function addGadget() {

    let place = document.getElementById("placeSelect").value;
    let name = document.getElementById("gadgetName").value;
    let desc = document.getElementById("gadgetDesc").value;
    let rawDate = document.getElementById("gadgetDate").value;

    if (name === "" || desc === "" || rawDate === "") {
        alert("Please fill all fields");
        return;
    }

    let date = formatDate(rawDate);

    let electronicsData = JSON.parse(localStorage.getItem("electronicsData")) || {};

    if (!electronicsData[place]) {
        electronicsData[place] = [];
    }

    electronicsData[place].push({
        name: name,
        desc: desc,
        date: date
    });

    localStorage.setItem("electronicsData", JSON.stringify(electronicsData));

    alert("Gadget added successfully!");

    document.getElementById("gadgetName").value = "";
    document.getElementById("gadgetDesc").value = "";
    document.getElementById("gadgetDate").value = "";

    loadGadgets();
}

// Load Gadgets
function loadGadgets() {

    let place = document.getElementById("viewPlace").value;

    let electronicsData = JSON.parse(localStorage.getItem("electronicsData")) || {};

    let list = document.getElementById("gadgetsList");

    list.innerHTML = "";

    if (!electronicsData[place] || electronicsData[place].length === 0) {
        list.innerHTML = "<p>No gadgets added for this place</p>";
        return;
    }

    electronicsData[place].forEach((gadget, index) => {

        list.innerHTML +=
            "<div class='gadget-item'>" +
            "<b>" + gadget.name + "</b><br>" +
            gadget.desc + "<br>" +
            "Launch: " + gadget.date + "<br>" +
            "<button class='delete-btn' onclick='deleteGadget(\"" + place + "\"," + index + ")'>" +
            "Delete</button>" +
            "</div>";

    });
}

// Delete Gadget
function deleteGadget(place, index) {

    let electronicsData = JSON.parse(localStorage.getItem("electronicsData"));

    electronicsData[place].splice(index, 1);

    localStorage.setItem("electronicsData", JSON.stringify(electronicsData));

    alert("Gadget deleted!");

    loadGadgets();
}

// Back button
function goBack() {
    window.location.href = "admin-dashboard.html";
}

// Initial load
window.onload = function () {

    initializeGadgetsData();
    loadPlaces();
    loadGadgets();
};
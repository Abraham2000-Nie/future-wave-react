// Initialize vehicles storage
function initializeVehiclesData() {

    let data = JSON.parse(localStorage.getItem("vehiclesData"));

    if (!data) {

        let defaultVehicles = {
            Bangalore: [],
            Mysore: [],
            Chennai: [],
            Mumbai: [],
            Pune: []
        };

        localStorage.setItem("vehiclesData", JSON.stringify(defaultVehicles));
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

// FORMAT DATE AS: DD MMM YYYY
function formatDate(inputDate) {

    let d = new Date(inputDate);

    let day = String(d.getDate()).padStart(2, "0");

    let year = d.getFullYear();

    let monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

    let month = monthNames[d.getMonth()];

    return day + " " + month + " " + year;
}

// Add Vehicle
function addVehicle() {

    let place = document.getElementById("placeSelect").value;
    let name = document.getElementById("vehicleName").value;
    let desc = document.getElementById("vehicleDesc").value;
    let rawDate = document.getElementById("vehicleDate").value;

    if (name === "" || desc === "" || rawDate === "") {
        alert("Please fill all fields");
        return;
    }

    let date = formatDate(rawDate);

    let vehiclesData = JSON.parse(localStorage.getItem("vehiclesData")) || {};

    if (!vehiclesData[place]) {
        vehiclesData[place] = [];
    }

    vehiclesData[place].push({
        name: name,
        desc: desc,
        date: date
    });

    localStorage.setItem("vehiclesData", JSON.stringify(vehiclesData));

    alert("Vehicle added successfully!");

    document.getElementById("vehicleName").value = "";
    document.getElementById("vehicleDesc").value = "";
    document.getElementById("vehicleDate").value = "";

    loadVehicles();
}

// Load Vehicles
function loadVehicles() {

    let place = document.getElementById("viewPlace").value;

    let vehiclesData = JSON.parse(localStorage.getItem("vehiclesData")) || {};

    let list = document.getElementById("vehiclesList");

    list.innerHTML = "";

    if (!vehiclesData[place] || vehiclesData[place].length === 0) {
        list.innerHTML = "<p>No vehicles added for this place</p>";
        return;
    }

    vehiclesData[place].forEach((vehicle, index) => {

        list.innerHTML +=
            "<div class='vehicle-item'>" +
            "<b>" + vehicle.name + "</b><br>" +
            vehicle.desc + "<br>" +
            "Launch: " + vehicle.date + "<br>" +
            "<button class='delete-btn' onclick='deleteVehicle(\"" + place + "\"," + index + ")'>" +
            "Delete</button>" +
            "</div>";

    });
}

// Delete Vehicle
function deleteVehicle(place, index) {

    let vehiclesData = JSON.parse(localStorage.getItem("vehiclesData"));

    vehiclesData[place].splice(index, 1);

    localStorage.setItem("vehiclesData", JSON.stringify(vehiclesData));

    alert("Vehicle deleted!");

    loadVehicles();
}

// Back button
function goBack() {
    window.location.href = "admin-dashboard.html";
}

// Initial load
window.onload = function () {

    initializeVehiclesData();
    loadPlaces();
    loadVehicles();
};
// Initialize properties storage
function initializePropertiesData() {

    let data = JSON.parse(localStorage.getItem("propertiesData"));

    if (!data) {

        let defaultProperties = {
            Bangalore: [],
            Mysore: [],
            Chennai: [],
            Mumbai: [],
            Pune: []
        };

        localStorage.setItem("propertiesData", JSON.stringify(defaultProperties));
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

// Add Property
function addProperty() {

    let place = document.getElementById("placeSelect").value;
    let name = document.getElementById("propertyName").value;
    let desc = document.getElementById("propertyDesc").value;
    let rawDate = document.getElementById("propertyDate").value;

    if (name === "" || desc === "" || rawDate === "") {
        alert("Please fill all fields");
        return;
    }

    let date = formatDate(rawDate);

    let propertiesData = JSON.parse(localStorage.getItem("propertiesData")) || {};

    if (!propertiesData[place]) {
        propertiesData[place] = [];
    }

    propertiesData[place].push({
        name: name,
        desc: desc,
        date: date
    });

    localStorage.setItem("propertiesData", JSON.stringify(propertiesData));

    alert("Property added successfully!");

    document.getElementById("propertyName").value = "";
    document.getElementById("propertyDesc").value = "";
    document.getElementById("propertyDate").value = "";

    loadProperties();
}

// Load Properties
function loadProperties() {

    let place = document.getElementById("viewPlace").value;

    let propertiesData = JSON.parse(localStorage.getItem("propertiesData")) || {};

    let list = document.getElementById("propertiesList");

    list.innerHTML = "";

    if (!propertiesData[place] || propertiesData[place].length === 0) {
        list.innerHTML = "<p>No properties added for this place</p>";
        return;
    }

    propertiesData[place].forEach((property, index) => {

        list.innerHTML +=
            "<div class='property-item'>" +
            "<b>" + property.name + "</b><br>" +
            property.desc + "<br>" +
            "Available: " + property.date + "<br>" +
            "<button class='delete-btn' onclick='deleteProperty(\"" + place + "\"," + index + ")'>" +
            "Delete</button>" +
            "</div>";

    });
}

// Delete Property
function deleteProperty(place, index) {

    let propertiesData = JSON.parse(localStorage.getItem("propertiesData"));

    propertiesData[place].splice(index, 1);

    localStorage.setItem("propertiesData", JSON.stringify(propertiesData));

    alert("Property deleted!");

    loadProperties();
}

// Back button
function goBack() {
    window.location.href = "admin-dashboard.html";
}

// Initial load
window.onload = function () {

    initializePropertiesData();
    loadPlaces();
    loadProperties();
};
const place = localStorage.getItem("selectedPlace");

document.getElementById("selected-place").innerText = place || "";

// -------- SECTION REDIRECT FUNCTIONS --------

function openMovies() {
    let selected = localStorage.getItem("selectedPlace");
    window.location.href = "movies.html?place=" + selected;
}

function openResorts() {
    let selected = localStorage.getItem("selectedPlace");
    window.location.href = "resorts.html?place=" + selected;
}

function openVehicles() {
    let selected = localStorage.getItem("selectedPlace");
    window.location.href = "vehicles.html?place=" + selected;
}

function openElectronics() {
    let selected = localStorage.getItem("selectedPlace");
    window.location.href = "electronics.html?place=" + selected;
}

function openEateries() {
    let selected = localStorage.getItem("selectedPlace");
    window.location.href = "eateries.html?place=" + selected;
}
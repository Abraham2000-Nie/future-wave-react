function loadUserPlaces() {

    let places = JSON.parse(localStorage.getItem("places")) || [];

    let container = document.getElementById("placeContainer");

    container.innerHTML = "";   // clear old buttons

    places.forEach(city => {

        let btn = document.createElement("button");
        btn.className = "back-btn";
        btn.innerText = city;

        btn.onclick = function () {
            selectPlace(city);
        };

        container.appendChild(btn);
        container.appendChild(document.createElement("br"));
    });
}

function selectPlace(city) {
    localStorage.setItem("selectedPlace", city);
    window.location.href = "dashboard.html";
}

function goDashboard() {
    window.location.href = "dashboard.html";
}

window.onload = loadUserPlaces;
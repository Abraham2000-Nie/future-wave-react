function loadPlaces() {

    let defaultPlaces = ["Bangalore", "Mysore", "Hyderabad", "Chennai", "Mumbai", "Pune"];

    if (localStorage.getItem("places") === null) {
        localStorage.setItem("places", JSON.stringify(defaultPlaces));
    }

    let places = JSON.parse(localStorage.getItem("places")) || [];

    let list = document.getElementById("placeList");

    list.innerHTML = "";

    places.forEach((place, index) => {

        list.innerHTML += `
            <div class="place-item">
                <span>${place}</span>
                <button class="delete-btn" onclick="deletePlace(${index})">Delete</button>
            </div>
        `;
    });
}

function addPlace() {

    let name = document.getElementById("placeName").value;

    if (name === "") {
        alert("Please enter place name");
        return;
    }

    let places = JSON.parse(localStorage.getItem("places")) || [];

    places.push(name);

    localStorage.setItem("places", JSON.stringify(places));

    alert("Place Added Successfully");

    document.getElementById("placeName").value = "";

    loadPlaces();
}

function deletePlace(index) {

    let places = JSON.parse(localStorage.getItem("places")) || [];

    places.splice(index, 1);

    localStorage.setItem("places", JSON.stringify(places));

    loadPlaces();
}

function goBack() {
    window.location.href = "admin-dashboard.html";
}

window.onload = loadPlaces;
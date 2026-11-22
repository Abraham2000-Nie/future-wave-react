// get selected place
let place = localStorage.getItem("selectedPlace");

if (!place) {
    alert("Please select a place first");
    window.location.href = "dashboard.html";
}

// set title
document.getElementById("cityTitle").innerText =
    "Vehicles in " + place;

// DEFAULT VEHICLE DATA
let defaultVehicles = {

    Bangalore: [
        { name: "Honda City 2023", desc: "Sedan - Petrol", date: "Launched: 10 Jan 2023" },
        { name: "Hyundai Creta", desc: "SUV - Diesel", date: "Launched: 20 Feb 2022" },
        { name: "Royal Enfield Classic 350", desc: "Bike - 350cc", date: "Launched: 05 Aug 2021" }
    ],

    Mysore: [
        { name: "Tata Nexon", desc: "Compact SUV - Petrol", date: "Launched: 15 Mar 2023" },
        { name: "TVS Apache RTR", desc: "Bike - 200cc", date: "Launched: 12 Jul 2022" },
        { name: "Mahindra Thar", desc: "Off-road SUV", date: "Launched: 01 Jan 2021" }
    ],

    Chennai: [
        { name: "Kia Seltos", desc: "SUV - Diesel", date: "Launched: 11 Nov 2022" },
        { name: "Bajaj Pulsar NS200", desc: "Bike - Sports", date: "Launched: 18 Jun 2021" },
        { name: "Toyota Innova Crysta", desc: "Premium MPV", date: "Launched: 02 Apr 2020" }
    ],

    Mumbai: [
        { name: "Maruti Swift", desc: "Hatchback - Petrol", date: "Launched: 25 Jan 2023" },
        { name: "Yamaha R15", desc: "Bike - 155cc", date: "Launched: 07 Sep 2022" },
        { name: "BMW X1", desc: "Luxury SUV", date: "Launched: 19 Oct 2021" }
    ],

    Pune: [
        { name: "Skoda Slavia", desc: "Premium Sedan", date: "Launched: 05 Dec 2022" },
        { name: "KTM Duke 390", desc: "Sports Bike", date: "Launched: 10 Aug 2021" },
        { name: "Jeep Compass", desc: "Off-road SUV", date: "Launched: 30 May 2020" }
    ]
};

// load vehicles from localStorage if available
let storedVehicles = JSON.parse(localStorage.getItem("vehiclesData"));

if (!storedVehicles) {
    localStorage.setItem("vehiclesData", JSON.stringify(defaultVehicles));
    storedVehicles = defaultVehicles;
}

// render vehicles
let vehiclesList = document.getElementById("vehiclesList");

if (storedVehicles[place]) {

    storedVehicles[place].forEach(vehicle => {

        let box = document.createElement("div");
        box.className = "vehicle-box";

        box.innerHTML = `
            <img src="images/posters/vehicles1.jpg" alt="Vehicle">

            <h3>${vehicle.name}</h3>
            <p>${vehicle.desc}</p>
            <span>${vehicle.date}</span>

            <div class="booking">
                <p>More details on</p>
                <a href="https://www.cardekho.com" target="_blank">CarDekho</a> |
                <a href="https://www.bikewale.com" target="_blank">BikeWale</a> |
                <a href="https://www.zigwheels.com" target="_blank">ZigWheels</a>
            </div>

            <p class="note">*Details handled by external platforms</p>
        `;

        vehiclesList.appendChild(box);

    });

} else {
    vehiclesList.innerHTML = "<h3>No vehicles added for this city yet.</h3>";
}

// navigation functions
function goHome() {
    window.location.href = "dashboard.html";
}

function goReport() {
    let place = localStorage.getItem("selectedPlace") || "Unknown";

    localStorage.setItem("reportSection", "Vehicles");
    localStorage.setItem("reportPlace", place);
    localStorage.setItem("returnPage", "vehicles.html");

    window.location.href = "report.html";
}
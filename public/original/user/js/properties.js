// get selected place
let place = localStorage.getItem("selectedPlace");

if (!place) {
    alert("Please select a place first");
    window.location.href = "dashboard.html";
}

// set title
document.getElementById("cityTitle").innerText =
    "Properties in " + place;

// DEFAULT PROPERTY DATA
let defaultProperties = {
    Bangalore: [
        { name: "Prestige Lakeside", desc: "Luxury apartment project", date: "12 Feb 2022" },
        { name: "Brigade Meadows", desc: "Premium residential flats", date: "05 Jun 2021" },
        { name: "Sobha City", desc: "Modern housing community", date: "18 Aug 2020" }
    ],

    Mysore: [
        { name: "Sankalp Central Park", desc: "Affordable housing project", date: "22 Mar 2021" },
        { name: "GSS Meadows", desc: "Family friendly apartments", date: "10 Jan 2020" },
        { name: "Premier Residency", desc: "City center properties", date: "15 Jul 2019" }
    ],

    Chennai: [
        { name: "TVH Quadrant", desc: "Premium apartments", date: "30 Apr 2021" },
        { name: "DLF Garden City", desc: "Luxury gated community", date: "14 Nov 2020" },
        { name: "Casagrand Boulevard", desc: "Modern residential homes", date: "05 Sep 2019" }
    ],

    Mumbai: [
        { name: "Lodha World Towers", desc: "Ultra luxury flats", date: "01 Jan 2022" },
        { name: "Hiranandani Estate", desc: "High class township", date: "18 Aug 2020" },
        { name: "Godrej Properties", desc: "Modern housing project", date: "07 Mar 2021" }
    ],

    Pune: [
        { name: "Amanora Park Town", desc: "Premium township", date: "20 Feb 2021" },
        { name: "Magarpatta City", desc: "Integrated housing project", date: "12 Dec 2019" },
        { name: "Kolte Patil Life Republic", desc: "Smart city homes", date: "03 Jun 2020" }
    ]
};

// load from localStorage if available
let storedProperties = JSON.parse(localStorage.getItem("propertiesData"));

if (!storedProperties) {
    localStorage.setItem("propertiesData", JSON.stringify(defaultProperties));
    storedProperties = defaultProperties;
}

// render properties
let propertiesList = document.getElementById("propertiesList");

if (storedProperties[place]) {

    storedProperties[place].forEach(property => {

        let box = document.createElement("div");
        box.className = "property-box";

        box.innerHTML = `
            <img src="images/posters/properties1.jpg" alt="Property">

            <h3>${property.name}</h3>
            <p>${property.desc}</p>
            <span>Launched: ${property.date}</span>

            <div class="booking">
                <p>More Details on</p>
                <a href="https://www.99acres.com" target="_blank">99Acres</a> |
                <a href="https://www.magicbricks.com" target="_blank">MagicBricks</a> |
                <a href="https://housing.com" target="_blank">Housing.com</a>
            </div>

            <p class="note">*Details handled by external platforms</p>
        `;

        propertiesList.appendChild(box);
    });

} else {
    propertiesList.innerHTML = "<h3>No properties added for this city yet.</h3>";
}

// navigation functions
function goHome() {
    window.location.href = "dashboard.html";
}

function goReport() {
    let place = localStorage.getItem("selectedPlace") || "Unknown";

    localStorage.setItem("reportSection", "Properties");
    localStorage.setItem("reportPlace", place);
    localStorage.setItem("returnPage", "properties.html");

    window.location.href = "report.html";
}
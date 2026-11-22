// get selected place
let place = localStorage.getItem("selectedPlace");

if (!place) {
    alert("Please select a place first");
    window.location.href = "dashboard.html";
}

// set title
document.getElementById("cityTitle").innerText =
    "Eateries in " + place;

// DEFAULT EATERIES DATA
let defaultEateries = {
    Bangalore: [
        { name: "Empire Restaurant", desc: "Famous for biryani and grills", date: "Established 1966" },
        { name: "CTR Malleshwaram", desc: "Iconic dosa and filter coffee", date: "Established 1950" },
        { name: "Meghana Foods", desc: "Popular Andhra style food", date: "Established 2006" }
    ],

    Mysore: [
        { name: "RRR Restaurant", desc: "Traditional non-veg meals", date: "Established 1982" },
        { name: "Hotel Mylari", desc: "World famous soft dosas", date: "Established 1938" },
        { name: "Depth N Green", desc: "Healthy vegetarian café", date: "Established 2015" }
    ],

    Chennai: [
        { name: "Saravana Bhavan", desc: "Legendary South Indian chain", date: "Established 1981" },
        { name: "Murugan Idli Shop", desc: "Authentic idli varieties", date: "Established 1993" },
        { name: "Annalakshmi", desc: "Fine dining vegetarian", date: "Established 1984" }
    ],

    Mumbai: [
        { name: "Leopold Cafe", desc: "Historic café at Colaba", date: "Established 1871" },
        { name: "Britannia & Co", desc: "Famous Parsi restaurant", date: "Established 1923" },
        { name: "Bademiya", desc: "Popular late-night food spot", date: "Established 1946" }
    ],

    Pune: [
        { name: "Vaishali", desc: "Most loved breakfast place", date: "Established 1951" },
        { name: "German Bakery", desc: "Iconic bakery and café", date: "Established 1988" },
        { name: "Marz-O-Rin", desc: "Famous sandwiches and shakes", date: "Established 1965" }
    ]
};

// load from localStorage if available
let storedEateries = JSON.parse(localStorage.getItem("eateriesData"));

if (!storedEateries) {
    localStorage.setItem("eateriesData", JSON.stringify(defaultEateries));
    storedEateries = defaultEateries;
}

// render eateries
let eateriesList = document.getElementById("eateriesList");

if (storedEateries[place]) {

    storedEateries[place].forEach(eatery => {

        let box = document.createElement("div");
        box.className = "eatery-box";

        box.innerHTML = `
            <img src="images/posters/eateries1.jpg" alt="Eatery">

            <h3>${eatery.name}</h3>
            <p>${eatery.desc}</p>
            <span>${eatery.date}</span>

            <div class="booking">
                <p>Find on</p>
                <a href="https://www.zomato.com" target="_blank">Zomato</a> |
                <a href="https://www.swiggy.com" target="_blank">Swiggy</a> |
                <a href="https://www.dineout.co.in" target="_blank">Dineout</a>
            </div>

            <p class="note">*Ordering handled by external platforms</p>
        `;

        eateriesList.appendChild(box);
    });

} else {
    eateriesList.innerHTML = "<h3>No eateries added for this city yet.</h3>";
}

// navigation functions
function goHome() {
    window.location.href = "dashboard.html";
}

function goReport() {
    let place = localStorage.getItem("selectedPlace") || "Unknown";

    localStorage.setItem("reportSection", "Eateries");
    localStorage.setItem("reportPlace", place);
    localStorage.setItem("returnPage", "eateries.html");

    window.location.href = "report.html";
}
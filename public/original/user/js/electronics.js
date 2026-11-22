// get selected place
let place = localStorage.getItem("selectedPlace");

if (!place) {
    alert("Please select a place first");
    window.location.href = "dashboard.html";
}

// set title
document.getElementById("cityTitle").innerText =
    "Electronics in " + place;

// DEFAULT ELECTRONICS DATA
let defaultElectronics = {

    Bangalore: [
        { name: "iPhone 15", desc: "Apple Smartphone", date: "Launched: 12 Sep 2023" },
        { name: "Samsung Galaxy S23", desc: "Android Flagship", date: "Launched: 01 Feb 2023" },
        { name: "Sony Bravia TV", desc: "4K Smart TV", date: "Launched: 15 Mar 2022" }
    ],

    Mysore: [
        { name: "Dell Inspiron Laptop", desc: "Core i5 Laptop", date: "Launched: 20 Jun 2022" },
        { name: "Boat Airpods", desc: "Wireless Earbuds", date: "Launched: 10 Jan 2023" },
        { name: "Canon DSLR Camera", desc: "Professional Camera", date: "Launched: 18 Aug 2021" }
    ],

    Chennai: [
        { name: "HP Pavilion Laptop", desc: "Gaming Laptop", date: "Launched: 25 Nov 2022" },
        { name: "OnePlus Nord", desc: "Midrange Smartphone", date: "Launched: 12 Apr 2023" },
        { name: "LG Refrigerator", desc: "Double Door Fridge", date: "Launched: 05 May 2021" }
    ],

    Mumbai: [
        { name: "MacBook Air M2", desc: "Apple Laptop", date: "Launched: 10 Jul 2022" },
        { name: "JBL Bluetooth Speaker", desc: "Portable Speaker", date: "Launched: 14 Feb 2023" },
        { name: "PlayStation 5", desc: "Gaming Console", date: "Launched: 01 Dec 2021" }
    ],

    Pune: [
        { name: "Realme Smart TV", desc: "Android Smart TV", date: "Launched: 22 Mar 2022" },
        { name: "Asus Gaming Laptop", desc: "ROG Series", date: "Launched: 30 Oct 2022" },
        { name: "Mi Smart Watch", desc: "Fitness Tracker", date: "Launched: 12 Jan 2023" }
    ]
};

// load electronics from localStorage if available
let storedElectronics = JSON.parse(localStorage.getItem("electronicsData"));

if (!storedElectronics) {
    localStorage.setItem("electronicsData", JSON.stringify(defaultElectronics));
    storedElectronics = defaultElectronics;
}

// render electronics
let electronicsList = document.getElementById("electronicsList");

if (storedElectronics[place]) {

    storedElectronics[place].forEach(item => {

        let box = document.createElement("div");
        box.className = "electronics-box";

        box.innerHTML = `
            <img src="images/posters/electronics1.jpg" alt="Electronics">

            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <span>${item.date}</span>

            <div class="booking">
                <p>Buy on</p>
                <a href="https://www.amazon.in" target="_blank">Amazon</a> |
                <a href="https://www.flipkart.com" target="_blank">Flipkart</a> |
                <a href="https://www.reliancedigital.in" target="_blank">Reliance Digital</a>
            </div>

            <p class="note">*Purchases handled by external platforms</p>
        `;

        electronicsList.appendChild(box);

    });

} else {
    electronicsList.innerHTML = "<h3>No electronics added for this city yet.</h3>";
}

// navigation functions
function goHome() {
    window.location.href = "dashboard.html";
}

function goReport() {
    let place = localStorage.getItem("selectedPlace") || "Unknown";

    localStorage.setItem("reportSection", "Electronics");
    localStorage.setItem("reportPlace", place);
    localStorage.setItem("returnPage", "electronics.html");

    window.location.href = "report.html";
}
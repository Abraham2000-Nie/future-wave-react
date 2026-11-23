// get selected place
let place = localStorage.getItem("selectedPlace");

if (!place) {
    alert("Please select a place first");
    window.location.href = "dashboard.html";
}

// set title
document.getElementById("cityTitle").innerText =
    "Resorts in " + place;


// DEFAULT RESORT DATA (initial data)
let defaultResorts = {

    Bangalore: [
        { name: "Golden Palm Resort", desc: "Luxury nature retreat", date: "15 Jan 2022" },
        { name: "Palm Meadows", desc: "Premium leisure resort", date: "10 Mar 2021" },
        { name: "Clarks Exotica", desc: "Hilltop luxury resort", date: "05 Aug 2020" }
    ],

    Mysore: [
        { name: "Silent Shores", desc: "Lake-side luxury resort", date: "10 Oct 2020" },
        { name: "Country Inn", desc: "Family-friendly holiday stay", date: "15 Mar 2019" },
        { name: "Royal Orchid", desc: "Elegant city resort", date: "01 Jan 2021" }
    ],

    Chennai: [
        { name: "Radisson Blu", desc: "Beachside luxury resort", date: "25 May 2020" },
        { name: "InterContinental", desc: "Premium sea-view stay", date: "12 Dec 2019" },
        { name: "Ideal Beach Resort", desc: "Relaxing coastal retreat", date: "08 Jul 2018" }
    ],

    Mumbai: [
        { name: "The Resort Madh Island", desc: "Beachfront holiday resort", date: "14 Feb 2019" },
        { name: "Fariyas Resort", desc: "Luxury hill resort", date: "20 Aug 2020" },
        { name: "Eskay Resort", desc: "Nature & spa retreat", date: "05 Jun 2018" }
    ],

    Pune: [
        { name: "Atmantan Wellness", desc: "Luxury wellness retreat", date: "10 Jan 2021" },
        { name: "Malhar Machi", desc: "Eco-friendly hill resort", date: "18 Sep 2019" },
        { name: "Jalsrushti", desc: "Lakeside eco resort", date: "22 Apr 2020" }
    ]
};

let storedResorts = JSON.parse(localStorage.getItem("resortsData"));

// if storage exists but all cities are empty, reload defaults
let isEmpty = true;

if (storedResorts) {
    for (let key in storedResorts) {
        if (storedResorts[key].length > 0) {
            isEmpty = false;
            break;
        }
    }
}

if (!storedResorts || isEmpty) {
    localStorage.setItem("resortsData", JSON.stringify(defaultResorts));
    storedResorts = defaultResorts;
}



// render resorts
let resortsList = document.getElementById("resortsList");

if (storedResorts[place]) {

    storedResorts[place].forEach(resort => {

        let box = document.createElement("div");
        box.className = "resort-box";

        box.innerHTML = `
            <h3>${resort.name}</h3>
            <p>${resort.desc}</p>
            <span>Opened: ${resort.date}</span>

            <div class="booking">
                <p>Book on</p>
                <a href="https://www.makemytrip.com/hotels" target="_blank">MakeMyTrip</a> |
                <a href="https://www.goibibo.com/hotels" target="_blank">Goibibo</a> |
                <a href="https://www.booking.com" target="_blank">Booking.com</a>
            </div>

            <p class="note">*Booking handled by external platforms</p>
        `;

        resortsList.appendChild(box);

    });

} else {
    resortsList.innerHTML = "<h3>No resorts added for this city yet.</h3>";
}


// navigation functions
function goHome() {
    window.location.href = "dashboard.html";
}

function goReport() {

    let place = localStorage.getItem("selectedPlace") || "Unknown";

    localStorage.setItem("reportSection", "Resorts");
    localStorage.setItem("reportPlace", place);
    localStorage.setItem("returnPage", "resorts.html");

    window.location.href = "report.html";
}
function loadAbout() {

    let text = localStorage.getItem("aboutContent");

    if (text) {
        document.getElementById("aboutDisplay").innerText = text;
    }
}

function goBack() {
    window.location.href = "dashboard.html";
}

window.onload = loadAbout;
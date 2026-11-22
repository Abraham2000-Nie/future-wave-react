function loadAbout() {
    let data = localStorage.getItem("aboutContent");

    if (data === null) {
        data = "Welcome to Future Wave Project!";
        localStorage.setItem("aboutContent", data);
    }

    document.getElementById("aboutText").value = data;
}

function saveAbout() {
    let text = document.getElementById("aboutText").value;

    localStorage.setItem("aboutContent", text);

    alert("About Page Updated Successfully!");
}

function goDashboard() {
    window.location.href = "admin-dashboard.html";
}

window.onload = loadAbout;
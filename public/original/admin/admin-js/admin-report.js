function loadReports() {

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    let container = document.getElementById("reportContainer");
    let noReports = document.getElementById("noReports");

    container.innerHTML = "";

    if (reports.length === 0) {
        noReports.style.display = "block";
        container.appendChild(noReports);
        return;
    }

    noReports.style.display = "none";

    reports.forEach((report, index) => {

        let div = document.createElement("div");
        div.className = "report-box";

        div.innerHTML = `
            <h3>Place: ${report.place}</h3>
            <h4>Section: ${report.section}</h4>
            <p><b>Issue Type:</b> ${report.issue}</p>
            <p><b>Description:</b> ${report.description}</p>
            <button onclick="deleteReport(${index})">Delete</button>
        `;

        container.appendChild(div);
    });
}

function deleteReport(index) {

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.splice(index, 1);

    localStorage.setItem("reports", JSON.stringify(reports));

    loadReports();
}

function clearReports() {

    localStorage.removeItem("reports");

    alert("All reports cleared!");

    loadReports();
}

function goBack() {
    window.location.href = "admin-dashboard.html";
}

window.onload = loadReports;
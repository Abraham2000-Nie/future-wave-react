function setReturnPage(page) {
    localStorage.setItem("returnPage", page);
}

window.onload = function () {
    let place = localStorage.getItem("reportPlace");
    let section = localStorage.getItem("reportSection");

    document.getElementById("placeName").innerText = place ? place : "Not Selected";
    document.getElementById("sectionName").innerText = section ? section : "Not Selected";
};
function submitReport() {

    let place = localStorage.getItem("reportPlace");
    let section = localStorage.getItem("reportSection");

    let issue = document.querySelector('input[name="issue"]:checked');
    let description = document.getElementById("description").value;

    if (!issue || description === "") {
        alert("Please select issue type and enter description");
        return;
    }

    // Get existing reports
    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    // Create new report object
    let newReport = {
        place: place,
        section: section,
        issue: issue.value,
        description: description
    };

    // Add to array
    reports.push(newReport);

    // SAVE INTO LOCAL STORAGE
    localStorage.setItem("reports", JSON.stringify(reports));

    alert("Report submitted successfully!");

    // redirect back
    let returnPage = localStorage.getItem("returnPage");

    if (returnPage) {
        window.location.href = returnPage;
    } else {
        window.location.href = "dashboard.html";
    }
}

// go back without submitting
function goBack() {

    let returnPage = localStorage.getItem("returnPage");

    if (returnPage) {
        window.location.href = returnPage;
    } else {
        window.location.href = "dashboard.html";
    }
}
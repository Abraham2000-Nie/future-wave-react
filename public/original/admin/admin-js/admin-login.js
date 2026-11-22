function togglePassword() {

    let pass = document.getElementById("adminPassword");

    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

function adminLogin() {

    let password = document.getElementById("adminPassword").value;

    if (password === "admin@123") {

        alert("Admin Login Successful");

        window.location.href = "admin-dashboard.html";

    } else {

        alert("Invalid Admin Password");
    }
}
function goBack() {
    window.location.href = "../index1.html";
}
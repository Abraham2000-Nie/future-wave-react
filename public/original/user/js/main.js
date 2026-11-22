document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let input = document.getElementById("loginInput").value;
    let password = document.getElementById("loginPassword").value;

    let isEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(input);
    let isPhone = /^[0-9]{10}$/.test(input);

    if (!isEmail && !isPhone) {
        alert("Enter valid @gmail.com email or 10 digit phone number");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = users.find(u =>
        (u.email === input || u.phone === input) &&
        u.password === password
    );

    if (found) {
        localStorage.setItem("loggedUser", input);
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email/Phone or Password");
    }

});


function togglePassword(id) {

    let field = document.getElementById(id);

    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }

}
function goBack() {
    window.location.href = "../index1.html";
}

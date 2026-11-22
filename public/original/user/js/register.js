// Function for show / hide password eye icon
function togglePassword(id) {
    let field = document.getElementById(id);

    if (field.type === "password") {
        field.type = "text";
    } else {
        field.type = "password";
    }
}

// Registration form submit event
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirm = document.getElementById("confirmPassword").value.trim();

    // Name validation
    if (name === "") {
        alert("Name cannot be empty");
        return;
    }

    // Gmail validation
    let emailRule = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRule.test(email)) {
        alert("Enter valid @gmail.com email address");
        return;
    }

    // Phone validation
    let phoneRule = /^[0-9]{10}$/;
    if (!phoneRule.test(phone)) {
        alert("Phone number must be exactly 10 digits");
        return;
    }

    // Password rule: 6-12 characters, at least one letter and one number
    let passwordRule = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+$/;
     if (!passwordRule.test(password)) {
        alert("Password must contain atleast one letter and one number");
        return;
    }

    // Confirm password match
    if (password !== confirm) {
        alert("Password and Confirm Password do not match");
        return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email or phone already exists
    let exists = users.find(u => u.email === email || u.phone === phone);

    if (exists) {
        alert("Account with this Email or Phone already exists");
        return;
    }

    // Create new user object
    let newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    // Add user to array
    users.push(newUser);

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Success message and redirect
    alert("Account Created Successfully!");

    window.location.href = "index.html";
});
function goBack() {
    window.location.href = "index.html";
}
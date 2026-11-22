function submitFeedback() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    // Validation check
    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields");
        return;
    }

    // Create feedback object
    let feedback = {
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString()
    };

    // Get existing feedback from localStorage
    let allFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];

    // Add new feedback
    allFeedback.push(feedback);

    // Save back to localStorage
    localStorage.setItem("feedbackData", JSON.stringify(allFeedback));

    alert("Thank you for your feedback!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}
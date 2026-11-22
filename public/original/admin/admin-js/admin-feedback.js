function loadFeedback() {

    let list = document.getElementById("feedbackList");

    let feedbacks = JSON.parse(localStorage.getItem("feedbackData")) || [];

    list.innerHTML = "";

    if (feedbacks.length === 0) {
        list.innerHTML = "<p>No feedback available.</p>";
        return;
    }

    feedbacks.forEach((fb, index) => {

        list.innerHTML += `

        <div class="feedback-box">

            <p><b>Name:</b> ${fb.name}</p>
            <p><b>Email:</b> ${fb.email}</p>
            <p><b>Message:</b> ${fb.message}</p>

            <button onclick="deleteFeedback(${index})">Delete</button>

        </div>

        `;
    });

}

function deleteFeedback(index) {

    let feedbacks = JSON.parse(localStorage.getItem("feedbackData")) || [];

    feedbacks.splice(index, 1);

    localStorage.setItem("feedbackData", JSON.stringify(feedbacks));

    loadFeedback();
}

function clearAll() {

    localStorage.removeItem("feedbackData");

    alert("All feedback cleared!");

    loadFeedback();
}

function goBack() {
    window.location.href = "admin-dashboard.html";
}

window.onload = loadFeedback;
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("username-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the entered GitHub username
        const username = document.getElementById("github-username").value;

        // Redirect to the next page with the username as a query parameter
        window.location.href = `next-page.html?username=${username}`;
    });
});



// https://github.com/nevilparmar11
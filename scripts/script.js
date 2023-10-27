document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("username-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("github-username").value;

        //redirection as data in url , just like get request
        window.location.href = `next-page.html?username=${username}`;
    });
});



// https://github.com/nevilparmar11
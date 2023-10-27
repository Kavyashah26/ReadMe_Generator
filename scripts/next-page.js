 // getQueryParam gets the value of a query parameter from the URL
 function getQueryParam(name) {
    //Interface based obkect
    const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams)
    return urlParams.get(name);
}

// Get the username query parameter from the URL
const username = getQueryParam('username');

if (username) {
    const usernameDisplay = document.getElementById('username-display');
    usernameDisplay.textContent = `GitHub Username: ${username}`;
} else {
    //Handleing case of tempering with url
    alert('No username provided.');
}

// Form submission handler
const aboutMeForm = document.querySelector('.submit-button');
// console.log(aboutMeForm);
aboutMeForm.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Extracting values from form
    const currentlyWorkingOn = document.getElementById('currently-working-on').value;
    const lookingToCollaborate = document.getElementById('looking-to-collaborate').value;
    const lookingForHelp = document.getElementById('looking-for-help').value;
    const currentlyLearning = document.getElementById('currently-learning').value;
    const askMeAbout = document.getElementById('ask-me-about').value;
    const funFact = document.getElementById('fun-fact').value;

    // Redirect to the next page with all the data as query parameters
    const redirectURL = `final-page.html?username=${username}&🔭currently-working-on=${currentlyWorkingOn}&👯looking-to-collaborate=${lookingToCollaborate}&🤝looking-for-help=${lookingForHelp}&🌱currently-learning=${currentlyLearning}&💬ask-me-about=${askMeAbout}&⚡fun-fact=${funFact}`;
    window.location.href = redirectURL;
})
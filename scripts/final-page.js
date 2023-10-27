// Url encoding codes , interpretetion of url codes
// Space: %20
// Exclamation Mark: %21
// Double Quote: %22
// Pound Sign (Hash): %23
// Dollar Sign: %24
// Ampersand: %26
// Single Quote: %27
// Left Parenthesis: %28
// Right Parenthesis: %29
// Plus Sign: %2B
// Comma: %2C
// Slash: %2F
// Colon: %3A
// Semicolon: %3B
// Equals Sign: %3D
// Question Mark: %3F
// Commercial At: %40

// Function to parse URL parameters
function parseURLParams(url) {
    const queryString = url.split('?')[1] || '';
    const pairs = queryString.split('&');

    return pairs.reduce((params, pair) => {
        const [name, value] = pair.split('=').map(decodeURIComponent);
        params[name] = (params[name] || []).concat((value || '').replace(/\+/g, ' '));
        return params;
    }, {});
}



// Geting URL parameters
const urlParams = new URLSearchParams(window.location.search);
const url = "?" + urlParams.toString();
const data = parseURLParams(url);

// Defining GitHub API URL
const username = data.username || "Kavyashah26"; // Default to Kavyashah26 if username is not provided
const api_url = `https://api.github.com/users/${username}`;

// Function to get GitHub data using the GitHub API
async function getGitHubData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to generate README content
async function generateReadme() {
    // Get GitHub data
    const githubData = await getGitHubData(api_url);

    // Parse URL parameters
    // const urlParams = new URLSearchParams(window.location.search);
    // const url = "?" + urlParams.toString();
    // const customText = parseURLParams(url);

    var outputString = "";

    for (var key in data) {
        if (data[key] && data[key].length > 0 && data[key] != "") {
            outputString += " " + key + ": ";

            // Check if the property exists and has values before trying to join them
            outputString += data[key] + "\n";

            outputString += "--------\n";
        }
    }

    // console.log(outputString);

    // const additionalData = parseURLParams(window.location.href);

    // Extract relevant data from URL parameters
    // const customText = additionalData.customText || "No custom text provided";

    // const urlParams = new URLSearchParams(window.location.search);

    // Snake animation
    const snakeAnimation = '<img src="https://raw.githubusercontent.com/maurodesouza/maurodesouza/output/snake.svg" alt="Snake animation" />';

    // Languages graph
    const languagesGraph = `<img src="https://github-readme-stats.vercel.app/api/top-langs?username=${username}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=${selectedTheme}&hide_border=false" height="150" alt="languages graph" />`;


    const skillsSection = selectedSkills.length > 0 ?
        `\n\n${selectedSkills.map(skill => ` <img src="${skill.image}" height="30" alt="${skill.name}" class="skillImage"> `).join("")}` :
        '';

    // Generate README content
    const readmeContent = `
    # ${githubData.name}'s GitHub Profile


    
<div align="center">
  <img height="150" src="https://camo.githubusercontent.com/62da68eb62b1e5f175f7d1f0191dd89a653d7908feb22d37d4a0ab07365d6791/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f4d3967624264396e6244724f5475314d71782f67697068792e676966"  />
</div>

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${githubData.login}&show_icons=true&theme=${selectedTheme})




## Languag graph
![GitHub test](https://github-readme-stats.vercel.app/api/top-langs?username=${username}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=${selectedTheme}&hide_border=false)


##
### 🔝 Top Contributed Repo
![contribution graph](https://github-contributor-stats.vercel.app/api?username=${username}&limit=5&theme=${selectedTheme}&)

### Streak Grapgh
![](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${selectedTheme}&hide_border=false")

###
<div align="center">
  <img src="https://visitor-badge.laobi.icu/badge?page_id=${username}.${username}&"  />
</div>

## About Me

- **Bio:** ${githubData.bio || "N/A"}
- **Location:** ${githubData.location || "N/A"}

## 🛠 Skills

${skillsSection}


## Additional Information

- ${outputString}

## Contact Me

- **Email:** ${githubData.email || "N/A"}

`;

    return readmeContent;
}


// Function to download README file
function downloadReadme() {
    generateReadme().then((content) => {
        //blob=binary large object
        const blob = new Blob([content], {
            type: "text/plain"
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "README.md";
        console.log(link)
        link.click();
    });
}



// changing theme according to user and default is dark 
const themeSelector = document.querySelector('.theme-selector');
let selectedTheme = 'dark';

themeSelector.addEventListener('change', (event) => {
    const selectedCheckbox = event.target;
    if (selectedCheckbox.checked) {
        selectedTheme = selectedCheckbox.getAttribute('data-theme');
        // console.log(`Selected Theme: ${selectedTheme}`);
    }
});


// Array to store selected skills
const selectedSkills = [];

// Function to update selected skills
function updateSelectedSkills() {
    selectedSkills.length = 0; // Clear the array

    // Get all checkboxes with a class 'skillCheckbox'
    const skillCheckboxes = document.querySelectorAll('.skillCheckbox');

    // Iterate through each checkbox and add selected skills to the array
    skillCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // const skillName = checkbox.getAttribute('data-skill-name');
            const skillImage = checkbox.getAttribute('data-skill-image');
            selectedSkills.push({
                // name: skillName,
                image: skillImage
            });
        }
    });
}


// Event listener for the "Download README" button
const downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", () => {
    updateSelectedSkills();
    downloadReadme();
});



document.getElementById('markdownInput').addEventListener('input', updatePreview);
// const readmeContent = generateReadme();
// console.log(readmeContent);

//updating preview before copy as well as download
function updatePreview() {
    const markdownInput = document.getElementById('markdownInput').value;
    const preview = document.getElementById('preview');
    preview.innerHTML = marked(markdownInput);
}


// Function that copies text to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    let copied=document.execCommand('copy',false);
    document.body.removeChild(textarea);
}

// Event listener for the Copy button
const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', () => {
    updateSelectedSkills(); // Making sure selectedSkills is up-to-date
    generateReadme().then((content) => {
        copyToClipboard(content);
        // console.log(content)
        alert('README content copied to clipboard!');
    });
});
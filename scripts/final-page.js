// Function to parse URL parameters
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {},
        i,
        n,
        v,
        nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }

    return parms;
}

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const url = "?" + urlParams.toString();
const data = parseURLParams(url);

// Define GitHub API URL
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
    const urlParams = new URLSearchParams(window.location.search);
    const url = "?" + urlParams.toString();
    const customText = parseURLParams(url);

    var outputString = "";

for (var key in customText) {
    if (customText.hasOwnProperty(key)) {
        if (customText[key] && customText[key].length > 0 && customText[key] != "") {
        outputString += " " + key + ": ";

        // Check if the property exists and has values before trying to join them
            outputString += "" + customText[key].join(", ") + "\n";
            
            outputString += "--------\n";
        } 
    }
}

// Now you can use the 'outputString' variable in your readme
console.log(outputString);

    // const additionalData = parseURLParams(window.location.href);

    // Extract relevant data from URL parameters
    // const customText = additionalData.customText || "No custom text provided";

    // const urlParams = new URLSearchParams(window.location.search);

    // Snake animation
    const snakeAnimation = '<img src="https://raw.githubusercontent.com/maurodesouza/maurodesouza/output/snake.svg" alt="Snake animation" />';

    // Languages graph
    const languagesGraph = `<img src="https://github-readme-stats.vercel.app/api/top-langs?username=${username}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=light&hide_border=false" height="150" alt="languages graph" />`;


    const skillsSection = selectedSkills.length > 0
        ? `\n\n${selectedSkills.map(skill => ` <img src="${skill.image}" height="30" alt="${skill.name}" class="skillImage"> `).join("")}`
        : '';

    // Generate README content
    const readmeContent = `
    # ${githubData.name}'s GitHub Profile


    
<div align="center">
  <img height="150" src="https://camo.githubusercontent.com/62da68eb62b1e5f175f7d1f0191dd89a653d7908feb22d37d4a0ab07365d6791/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f4d3967624264396e6244724f5475314d71782f67697068792e676966"  />
</div>

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${githubData.login}&show_icons=true)




## Languag graph
${languagesGraph}

##
### 🔝 Top Contributed Repo
![](https://github-contributor-stats.vercel.app/api?username=${username}&limit=5&theme=light&combine_all_yearly_contributions=true)

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
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "README.md";
        link.click();
    });
}

// Event listener for the download button
// const downloadButton = document.getElementById("downloadButton");
// downloadButton.addEventListener("click", downloadReadme);




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
            const skillName = checkbox.getAttribute('data-skill-name');
            const skillImage = checkbox.getAttribute('data-skill-image');
            
            selectedSkills.push({
                name: skillName,
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
        const readmeContent =  generateReadme();
        console.log(readmeContent);

        function updatePreview() {
            const markdownInput = document.getElementById('markdownInput').value;
            const preview = document.getElementById('preview');
            preview.innerHTML = DOMPurify.sanitize(marked(markdownInput));
        }


        // Function to copy text to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Event listener for the "Copy" button
const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', () => {
    updateSelectedSkills(); // Make sure selectedSkills is up-to-date
    generateReadme().then((content) => {
        copyToClipboard(content);
        // console.log(content)
        alert('README content copied to clipboard!');
    });
});

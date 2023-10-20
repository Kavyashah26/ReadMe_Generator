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
    // const additionalData = parseURLParams(window.location.href);

    // Extract relevant data from URL parameters
    // const customText = additionalData.customText || "No custom text provided";

    // const urlParams = new URLSearchParams(window.location.search);

    // Snake animation
    const snakeAnimation = '<img src="https://raw.githubusercontent.com/maurodesouza/maurodesouza/output/snake.svg" alt="Snake animation" />';

    // Languages graph
    const languagesGraph = `<img src="https://github-readme-stats.vercel.app/api/top-langs?username=${githubData.login}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=light&hide_border=false" height="150" alt="languages graph" />`;

    // Selected Skills
    // const selectedSkills = [
    //     { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    //     { name: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    //     { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    //     // Add more skills as needed
    // ];

    const skillsSection = selectedSkills.length > 0
        ? `\n\n${selectedSkills.map(skill => ` <img src="${skill.image}" height="30" alt="${skill.name}" class="skillImage"> `).join("")}`
        : '';

    // Generate README content
    const readmeContent = `# ${githubData.name}'s GitHub Profile

${snakeAnimation}

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${githubData.login}&show_icons=true)

## About Me

- **Bio:** ${githubData.bio || "N/A"}
- **Location:** ${githubData.location || "N/A"}

## Skills

${skillsSection}

## Additional Information

- **Custom Text:** ${customText}

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
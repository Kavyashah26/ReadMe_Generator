 // Function to get the value of a query parameter from the URL
 //  function getQueryParam(name) {
 // const urlParams = new URLSearchParams(window.location.search);
//     console.log(urlParams.get(name));
//     return urlParams.get(name);
// }

function parseURLParams(url) {
    // console.log("in"); 
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    // console.log(typeof parms);
    return parms;
}
// parseURLParams("www.mints.com?name=something")

const urlParams = new URLSearchParams(window.location.search);
const url="?"+urlParams.toString();
const data = parseURLParams(url);

// const currentlyWorkingOn = getQueryParam('currentlyWorkingOn');
// const lookingToCollaborate = getQueryParam('lookingToCollaborate');
// const lookingForHelp = getQueryParam('lookingForHelp');
// const currentlyLearning = getQueryParam('currentlyLearning');
// const askMeAbout = getQueryParam('askMeAbout');
// const funFact = getQueryParam('funFact');

console.log(data);
// console.log(url.indexOf("?")+1);

// console.log(data);

for (const i in data) {
    // console.log(i);
    print(data[i])
}

// const gitapi=
const api_url = 
      "https://api.github.com/users/Kavyashah26";
 
// Defining async function
async function getapi(url) {
   
    // Storing response
    const response = await fetch(url);
   
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    // if (response) {
    //     // hideloader();
    // }
    // show(data);
    // console.log(typeof data);
    return data
}
// Calling that async function
const apidata=getapi(api_url);

// console.log(apidata);

function show(apidata) {
    for (const i in apidata) {
        console.log(i);
        print(apidata[i])
    }
}
// print(data[0])

function print(name) {
    if (name!="") {   
        // console.log(currentlyLearning);
        // Display the username on the page
        console.log("1");
        const data = document.getElementById('test');
        data.innerHTML+='<br>'
        data.innerHTML += ` ${name} `;
    }
    
}
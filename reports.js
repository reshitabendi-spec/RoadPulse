import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
getFirestore,
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzihAhDMvcCmL6P6sCkZjY6ZspgWf414Y",
  authDomain: "roadpulse-e56ff.firebaseapp.com",
  projectId: "roadpulse-e56ff",
  storageBucket: "roadpulse-e56ff.firebasestorage.app",
  messagingSenderId: "595481018071",
  appId: "1:595481018071:web:f5d8caffd22eb04aa13a92"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const reportsContainer =
document.getElementById("reportsContainer");

let allReports = [];

function displayReports(reports){

reportsContainer.innerHTML = "";

reports.forEach((data)=>{

reportsContainer.innerHTML += `

<div class="report-card">

<img src="${data.image}" alt="Report">

<h3>${data.issueType}</h3>

<p><strong>📅 Date:</strong>
${data.createdAt}</p>

<p><strong>📍 Area:</strong>
${data.landmark}</p>

<p><strong>🌍 Latitude:</strong>
${data.latitude}</p>

<p><strong>🌍 Longitude:</strong>
${data.longitude}</p>

<p><strong>📝 Description:</strong>
${data.description}</p>

<a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}"
target="_blank">
📍 View on Google Maps
</a>

</div>

`;

});

}

async function loadReports(){

const querySnapshot =
await getDocs(collection(db,"reports"));

allReports = [];

querySnapshot.forEach((doc)=>{

allReports.push(doc.data());

});

const reportCount =
document.getElementById("reportCount");

if(reportCount){

reportCount.innerHTML =
`📊 Total Reports: ${allReports.length}`;

}

const areaCounts = {};

allReports.forEach((report)=>{

if(report.landmark){

const area =
report.landmark.trim();

areaCounts[area] =
(areaCounts[area] || 0) + 1;

}

});

let mostArea = "";
let highestCount = 0;

for(const area in areaCounts){

if(areaCounts[area] > highestCount){

highestCount = areaCounts[area];
mostArea = area;

}

}

const mostReportedArea =
document.getElementById("mostReportedArea");

if(mostReportedArea && mostArea){

mostReportedArea.innerHTML =
`🏆 Most Reported Area: ${mostArea} (${highestCount} Reports)`;

}

displayReports(allReports);

}

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const searchText =
searchInput.value.toLowerCase();

const filteredReports =
allReports.filter((report)=>

report.landmark &&
report.landmark
.toLowerCase()
.includes(searchText)

);

displayReports(filteredReports);

});

}

loadReports();
const statsBtn =
document.getElementById("statsBtn");

const statsPopup =
document.getElementById("statsPopup");

const closeStats =
document.getElementById("closeStats");

const statsContent =
document.getElementById("statsContent");

statsBtn.addEventListener("click",()=>{

let html = "";

const issueCounts = {};

allReports.forEach((report)=>{

if(report.issueType){

issueCounts[report.issueType] =
(issueCounts[report.issueType] || 0) + 1;

}

});

for(const issue in issueCounts){

html += `
<p>
<strong>${issue}</strong> : ${issueCounts[issue]}
</p>
`;

}

statsContent.innerHTML = html;

statsPopup.style.display = "flex";

});

closeStats.addEventListener("click",()=>{

statsPopup.style.display = "none";

});
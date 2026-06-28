
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

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

let alert500Given = false;
let alert100Given = false;

function getDistance(lat1, lon1, lat2, lon2){

const R = 6371000;

const dLat =
(lat2 - lat1) * Math.PI / 180;

const dLon =
(lon2 - lon1) * Math.PI / 180;

const a =
Math.sin(dLat/2) *
Math.sin(dLat/2)

+

Math.cos(lat1*Math.PI/180)

*

Math.cos(lat2*Math.PI/180)

*

Math.sin(dLon/2)

*

Math.sin(dLon/2);

const c =
2 * Math.atan2(
Math.sqrt(a),
Math.sqrt(1-a)
);

return R * c;
}

async function checkNearbyHazards(){

navigator.geolocation.getCurrentPosition(

async(position)=>{

const userLat =
position.coords.latitude;

const userLon =
position.coords.longitude;

const snapshot =
await getDocs(
collection(db,"reports")
);

snapshot.forEach((doc)=>{

const data = doc.data();

if(
!data.latitude ||
!data.longitude
){
return;
}

const distance =
getDistance(
userLat,
userLon,
parseFloat(data.latitude),
parseFloat(data.longitude)
);

if(
distance <= 500 &&
distance > 100 &&
!alert500Given
){

alert500Given = true;

const message =
`Warning. There is a ${data.issueType}
500 meters ahead. Please slow down and drive carefully.`;

speechSynthesis.speak(
new SpeechSynthesisUtterance(message)
);

alert(message);

}

if(
distance <= 100 &&
!alert100Given
){

alert100Given = true;

const message =
`Caution. You are approaching a ${data.issueType}
within 100 meters. Drive carefully.`;

speechSynthesis.speak(
new SpeechSynthesisUtterance(message)
);

alert(message);

}

});

}

);

}

checkNearbyHazards();

setInterval(
checkNearbyHazards,
10000
);
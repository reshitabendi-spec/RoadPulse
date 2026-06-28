
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
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

let latitude = "";
let longitude = "";
let imageBase64 = "";

const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", () => {

  const file = imageInput.files[0];

  if(!file) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = function() {

    const maxWidth = 600;

    let width = img.width;
    let height = img.height;

    if(width > maxWidth){

      height = height * (maxWidth / width);
      width = maxWidth;

    }

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);

    imageBase64 =
    canvas.toDataURL("image/jpeg", 0.6);

    preview.src = imageBase64;
    preview.style.display = "block";
  };

  img.src = URL.createObjectURL(file);

});

navigator.geolocation.getCurrentPosition(
(position) => {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    document.getElementById("locationText")
    .innerHTML = "Location Captured ✓";

},
(error) => {

    document.getElementById("locationText")
    .innerHTML = "Location Not Available";

}
);                                                                                                  

document
.getElementById("submitBtn")
.addEventListener("click", async () => {

  const issueType =
  document.getElementById("issueType").value;

  const landmark =
  document.getElementById("landmark").value;

  const description =
  document.getElementById("description").value;

  if(
    issueType === "" ||
    description === "" ||
    imageBase64 === ""
  ){
    alert(
    "Please fill all required fields."
    );
    return;
  }

  try{

    await addDoc(
      collection(db,"reports"),
      {

        issueType,
        landmark,
        description,

        latitude,
        longitude,

        image:imageBase64,

        createdAt:
        new Date().toLocaleString()
      }
    );

    alert(
    "Report Submitted Successfully!"
    );

    window.location.reload();

  }

  catch(error){

    alert(error.message);
  }
});


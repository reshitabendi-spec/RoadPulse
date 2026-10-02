import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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

document
.getElementById("verifyBtn")
.addEventListener("click", async () => {

    const enteredOTP =
        document.getElementById("otp").value.trim();

    if (enteredOTP === "") {

        alert("Please enter the OTP.");

        return;

    }

    const otpDoc = await getDoc(
        doc(db, "authorityOTP", "current")
    );

    if (!otpDoc.exists()) {

        alert("OTP not found.");

        return;

    }

    const data = otpDoc.data();

    if (enteredOTP === data.otp) {

    await deleteDoc(
        doc(db, "authorityOTP", "current")
    );

    alert("OTP Verified Successfully!");

    window.location.href = "authority.html";

}

    else {

        alert("Invalid OTP.");

    }

});
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc
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

const container = document.getElementById("authorityReports");

async function loadTemporaryHazards() {

    container.innerHTML = "";

    const q = query(
        collection(db, "reports"),
        where("isTemporary", "==", true),
        where("status", "==", "Active")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

        container.innerHTML = "<h2>No Active Temporary Hazards</h2>";
        return;
    }
       snapshot.forEach((reportDoc) => {

        const data = reportDoc.data();

        const card = document.createElement("div");
        card.className = "report-card";

        card.innerHTML = `
    <img src="${data.image}" alt="Road Image">

    <h3>${data.issueType}</h3>

    <p><strong>Landmark:</strong> ${data.landmark || "N/A"}</p>

    <p><strong>Description:</strong> ${data.description}</p>

    <p><strong>Status:</strong> ${data.status}</p>

    <button class="map-btn"
        onclick="window.open('https://www.google.com/maps?q=${data.latitude},${data.longitude}','_blank')">
        📍 Open in Google Maps
    </button>

    <br><br>

    <button class="resolve-btn">
    ✅ Resolve
</button>
`;
        container.appendChild(card);
        const resolveBtn = card.querySelector(".resolve-btn");

resolveBtn.addEventListener("click", async () => {

    const confirmResolve = confirm(
        "Are you sure this hazard has been cleared?"
    );

    if (!confirmResolve) return;

    await updateDoc(
    doc(db, "reports", reportDoc.id),
    {
        status: "Resolved"
    }
);

    alert("Hazard marked as Resolved.");

    loadTemporaryHazards();

});

    });

}

loadTemporaryHazards();
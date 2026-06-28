import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzihAhDMvcCmL6P6sCkZjY6ZspgWf414Y",
  authDomain: "roadpulse-e56ff.firebaseapp.com",
  projectId: "roadpulse-e56ff",
  storageBucket: "roadpulse-e56ff.firebasestorage.app",
  messagingSenderId: "595481018071",
  appId: "1:595481018071:web:f5d8caffd22eb04aa13a92"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* SIGNUP */

document.getElementById("signupBtn").addEventListener("click", async () => {

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await sendEmailVerification(userCredential.user);

    alert(
      "Account created successfully!\n\nA verification email has been sent to your Gmail."
    );

  } catch (error) {

    alert(error.message);
  }
});

/* LOGIN */

document.getElementById("loginBtn").addEventListener("click", async () => {

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    if (!userCredential.user.emailVerified) {

      alert(
        "Please verify your email before logging in."
      );

      return;
    }

    alert("Login Successful!");

    window.location.href = "dashboard.html";

  } catch (error) {

    alert("Invalid Email or Password");
  }
});
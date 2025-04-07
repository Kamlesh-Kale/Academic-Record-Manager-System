import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkIWStkYaj9ErSD6b8OwVdkXv9y-HkyZk",
  authDomain: "academic-record-manager-1f8e1.firebaseapp.com",
  projectId: "academic-record-manager-1f8e1",
  storageBucket: "academic-record-manager-1f8e1.appspot.com", 
  messagingSenderId: "570276514358",
  appId: "1:570276514358:web:b6e33e3a8708727830a697",
  measurementId: "G-N2HYG5MDEK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Handle Login
document.getElementById("submit").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerText = "Login successful!";
      // Redirect to index.html
      setTimeout(() => {
        window.location.href = "Main_Page/index.html";
      }, 1000);
    })
    .catch((error) => {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerText = `ERROR... ${error.message}`;
    });
});

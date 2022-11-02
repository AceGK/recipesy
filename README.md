<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
    apiKey: "AIzaSyB9DEjrG5J4xiC_apdBUidod3LlMuoK7io",
    authDomain: "recipesy-e9dae.firebaseapp.com",
    projectId: "recipesy-e9dae",
    storageBucket: "recipesy-e9dae.appspot.com",
    messagingSenderId: "364589930992",
    appId: "1:364589930992:web:e5e660b05d886bf1e5e535",
    measurementId: "G-MTSDHVJTLR"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
</script>

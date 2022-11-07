import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, where, getDocs, query, limit  } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage }
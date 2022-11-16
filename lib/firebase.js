import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, where, getDocs, query, limit } from 'firebase/firestore';
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


// helpers 

//Gets a user/{uid} document with username
 export async function getUserWithUsername(username) {

  const q = query(
    collection(firestore, 'users'), 
    where('username', '==', username),
    limit(1)
  )
  const userDoc = ( await getDocs(q) ).docs[0];
  return userDoc;
}

// get recipe by category 
export async function getRecipesByCategory(category) {

  const q = query(
    collection(firestore, 'recipes'), 
    where('category', '==', category)
  )
  const recipeDoc = ( await getDocs(q) ).docs[0];
  return recipeDoc;
}



// Converts a firestore document to JSON
 export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
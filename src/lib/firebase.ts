import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'recipesy-e9dae.firebaseapp.com',
  projectId: 'recipesy-e9dae',
  storageBucket: 'recipesy-e9dae.appspot.com',
  messagingSenderId: '364589930992',
  appId: '1:364589930992:web:e5e660b05d886bf1e5e535',
  measurementId: 'G-MTSDHVJTLR'
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };


// ---------- Helpers ----------

export interface UserData {
  uid: string;
  username: string;
  displayName?: string;
  photoURL?: string;
  [key: string]: any; // fallback for other fields
}

// Get user document by `username`
export async function getUserWithUsername(username: string): Promise<QueryDocumentSnapshot<DocumentData> | undefined> {
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs[0];
}

// Get user document by UID
export async function getUserByUID(uid: string): Promise<UserData | null> {
  const q = query(
    collection(firestore, 'users'),
    where('uid', '==', uid),
    limit(1)
  );

  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  return doc?.data() as UserData || null;
}

// Get a recipe by category
export async function getRecipesByCategory(category: string): Promise<DocumentData | undefined> {
  const q = query(
    collection(firestore, 'recipes'),
    where('category', '==', category)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs[0]?.data();
}

// Convert Firestore document to JSON
export function postToJSON(doc: DocumentSnapshot<DocumentData>) {
  const data = doc.data();
  return {
    ...data,
    // createdAt: data?.createdAt?.toMillis() || null,
    // updatedAt: data?.updatedAt?.toMillis() || null,
  };
}

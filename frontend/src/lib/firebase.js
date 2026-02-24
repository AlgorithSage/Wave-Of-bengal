import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if we have valid config (not placeholder)
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'placeholder';

let app;
let auth;
let db;

// ONLY initialize if we have valid keys. 
// If keys are missing/placeholder, we skip initialization entirely.
if (isConfigValid) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    if (app) {
      auth = getAuth(app);
      db = getFirestore(app);
    }
  } catch (error) {
    console.error("Firebase initialization skipped or failed:", error.message);
  }
}

export { auth, db };

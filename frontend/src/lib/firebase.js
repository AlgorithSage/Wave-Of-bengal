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

const isConfigValid = firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'placeholder' &&
  firebaseConfig.apiKey.length > 10;

let app = null;
let auth = null;
let db = null;

// ONLY initialize in the browser AND if we have valid keys.
// This prevents the SDK from ever running during the server-side build/export.
if (typeof window !== "undefined" && isConfigValid) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    if (app) {
      auth = getAuth(app);
      db = getFirestore(app);
    }
  } catch (err) {
    console.error("Firebase SDK init failure:", err.message);
  }
}

// Named exports (app must be named for analytics.js)
export { app, auth, db };

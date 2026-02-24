// Check if we have valid config (strictly not placeholder)
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const isConfigValid = apiKey && apiKey !== 'placeholder' && apiKey.length > 10;

// Default exports as null for UI-only hosting safety
let app = null;
let auth = null;
let db = null;

// ONLY import and initialize if we have valid keys AND are in the browser.
// This prevents the SDK from ever being evaluated during the Vercel build phase.
if (isConfigValid && typeof window !== "undefined") {
  try {
    // Dynamic requires help bypass static analysis that might trigger SDK validation during build
    const { initializeApp, getApps } = require("firebase/app");
    const { getAuth } = require("firebase/auth");
    const { getFirestore } = require("firebase/firestore");

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    if (app) {
      auth = getAuth(app);
      db = getFirestore(app);
    }
  } catch (err) {
    console.error("Firebase SDK init failure:", err.message);
  }
}

export { app, auth, db };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if API key exists to prevent initialization crash
export const isFirebaseConfigured = !!firebaseConfig.apiKey;

if (!isFirebaseConfigured) {
  console.warn("Firebase configuration is missing. Authentication and database features will be disabled. Please check your .env file.");
}

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : ({} as any);
export const auth = isFirebaseConfigured ? getAuth(app) : ({} as any);
export const analytics = isFirebaseConfigured && firebaseConfig.measurementId ? getAnalytics(app) : ({} as any);
export const db = isFirebaseConfigured ? getFirestore(app) : ({} as any);

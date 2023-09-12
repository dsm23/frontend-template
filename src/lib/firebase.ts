import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const config = {
  apiKey: import.meta.env.RUNTIME_FIREBASE_API_KEY,
  authDomain: import.meta.env.RUNTIME_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.RUNTIME_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.RUNTIME_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.RUNTIME_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.RUNTIME_FIREBASE_APP_ID,
};

export const app = initializeApp(config);

// Auth exports
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  // eslint-disable-next-line no-console
  console.log(`You are logged in as`, user);
});

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SERVER_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_SERVER_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_SERVER_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_SERVER_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SERVER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SERVER_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_SERVER_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { storage };

// const storage = firebase.storage();
// const storageRef = storage.ref();
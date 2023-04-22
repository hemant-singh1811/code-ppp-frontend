// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBnLKMxl1QTGHfXr-oeS-_idEhrCLxkZvw',
  authDomain: 'alpha-lion-chat-web-app.firebaseapp.com',
  projectId: 'alpha-lion-chat-web-app',
  storageBucket: 'alpha-lion-chat-web-app.appspot.com',
  messagingSenderId: '834402540300',
  appId: '1:834402540300:web:53651379628598658dc729',
  measurementId: 'G-RQG5MH8QEZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_SERVER_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_SERVER_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_SERVER_FIREBASE_DATABASE_URL,
//   projectId: import.meta.env.VITE_SERVER_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_SERVER_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_SERVER_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_SERVER_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { storage };

// const storage = firebase.storage();
// const storageRef = storage.ref();

// const storage = app.storage();
// const database = app.database();

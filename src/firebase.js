// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkb-eVrQUQJf4HFvaEAiuxPKfrTta5lNA",
  authDomain: "note-app-7a288.firebaseapp.com",
  projectId: "note-app-7a288",
  storageBucket: "note-app-7a288.firebasestorage.app",
  messagingSenderId: "31740659893",
  appId: "1:31740659893:web:a9af771d9367a74dea56fc",
  measurementId: "G-V3XS1EXZJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
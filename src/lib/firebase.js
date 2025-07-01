// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQuZv4Tv77CgeN62mMtQY66SxozHojPnI",
  authDomain: "aes-luxury-menu.firebaseapp.com",
  projectId: "aes-luxury-menu",
  storageBucket: "aes-luxury-menu.firebasestorage.app",
  messagingSenderId: "640543948713",
  appId: "1:640543948713:web:884fd3f3efd3dbe2cd8eb8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

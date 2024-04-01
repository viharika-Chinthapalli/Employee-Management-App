import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgH-QeGhg8o0pEMINGBZPXB5xuAa7CiSw",
  authDomain: "react-auth-3057d.firebaseapp.com",
  projectId: "react-auth-3057d",
  storageBucket: "react-auth-3057d.appspot.com",
  messagingSenderId: "970805984046",
  appId: "1:970805984046:web:655ea286f44a4f3b8318bf",
  measurementId: "G-KMYNRXV8HN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

export { app, auth, firestore };
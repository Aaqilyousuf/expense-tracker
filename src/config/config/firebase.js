// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtLp81buyQ1a_MbWxVwaOewnjwo2L6d6k",
  authDomain: "expense-tracker-9953a.firebaseapp.com",
  projectId: "expense-tracker-9953a",
  storageBucket: "expense-tracker-9953a.appspot.com",
  messagingSenderId: "779684425106",
  appId: "1:779684425106:web:c26e105fbe3252b84a654b",
  measurementId: "G-1Z836V27WN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

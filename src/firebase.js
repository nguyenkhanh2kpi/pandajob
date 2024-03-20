// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMtJWu8Ky9MHbEcV73QG0nx6UJ-p-1Z-U",
  authDomain: "quanlytuyendung-4fb2c.firebaseapp.com",
  projectId: "quanlytuyendung-4fb2c",
  storageBucket: "quanlytuyendung-4fb2c.appspot.com",
  messagingSenderId: "956601904059",
  appId: "1:956601904059:web:5b71e170f32f43ac1e729e",
  measurementId: "G-N6HJ38EZ2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};
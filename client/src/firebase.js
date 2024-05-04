// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// console.log(`${import.meta.env.FIREBASE_API_KEY}`);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-98f4a.firebaseapp.com",
  projectId: "mern-blog-98f4a",
  storageBucket: "mern-blog-98f4a.appspot.com",
  messagingSenderId: "384939654657",
  appId: "1:384939654657:web:b6fd52a5496d2db3dcca00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
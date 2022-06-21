// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwah_w_G83FLYmab3XItNuOe0DUCwcqNM",
  authDomain: "auth-c7f19.firebaseapp.com",
  projectId: "auth-c7f19",
  storageBucket: "auth-c7f19.appspot.com",
  messagingSenderId: "492003301716",
  appId: "1:492003301716:web:34218c38d822143dc350c1",
  measurementId: "G-XTVHN2RR3B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

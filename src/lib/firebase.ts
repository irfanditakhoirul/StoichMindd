import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCimcMgJwmHcR0T3SoxW4jtXg85tblzUNY",
  authDomain: "stoichmind.firebaseapp.com",
  databaseURL: "https://stoichmind-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stoichmind",
  storageBucket: "stoichmind.firebasestorage.app",
  messagingSenderId: "799501048656",
  appId: "1:799501048656:web:85052e9d14806b534eaa55",
  measurementId: "G-7J0H6L3L0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };

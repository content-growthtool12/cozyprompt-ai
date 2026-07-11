// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOizB3mITgIlwcLPhQQIMnCoUv1yynFCk",
  authDomain: "cozyprompt-ai.firebaseapp.com",
  projectId: "cozyprompt-ai",
  storageBucket: "cozyprompt-ai.firebasestorage.app",
  messagingSenderId: "1016173238245",
  appId: "1:1016173238245:web:669711237ac870f96f410c",
  measurementId: "G-DRNL0XNCEC"};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const analytics = getAnalytics(app); 
export default app;
export { analytics, auth, googleProvider, db, signOut };
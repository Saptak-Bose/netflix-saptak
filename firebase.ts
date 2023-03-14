import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqS6o6sQ5v8RXM8ZPsPNcYdy8R2B7PYPk",
  authDomain: "netflix-clone-2-e6f11.firebaseapp.com",
  projectId: "netflix-clone-2-e6f11",
  storageBucket: "netflix-clone-2-e6f11.appspot.com",
  messagingSenderId: "765641518131",
  appId: "1:765641518131:web:d427e42b7a1fb0f5660746",
  measurementId: "G-0ZNECKVMZ1",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export default app;
export { auth, db };

import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyArperSgwQubdx0PiE9ydAKkyXdaJCujK0",
  authDomain: "drive-clone-a72be.firebaseapp.com",
  projectId: "drive-clone-a72be",
  storageBucket: "drive-clone-a72be.appspot.com",
  messagingSenderId: "722403374381",
  appId: "1:722403374381:web:9ae3c41fd84e8efb9acfa4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = firebase.storage(firebaseApp);
const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);
export { db, storage, provider, auth };

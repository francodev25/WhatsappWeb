// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider  } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl-LJ82LIg1MEJLQ3Dsm5Jhkz-klX7QMk",
  authDomain: "whatsapp-clone-202125.firebaseapp.com",
  projectId: "whatsapp-clone-202125",
  storageBucket: "whatsapp-clone-202125.appspot.com",
  messagingSenderId: "426127106937",
  appId: "1:426127106937:web:45c182f96a2fc714f185a8",
  measurementId: "G-G9K2277ZHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db,auth,provider}
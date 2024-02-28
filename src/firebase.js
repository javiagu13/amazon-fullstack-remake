// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import specific modules from firebase/app
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
    apiKey: "AIzaSyB2Zr42cndbWCWlGlB-GuhvVFUtqsNkMgQ",
    authDomain: "db-33fb1.firebaseapp.com",
    projectId: "db-33fb1",
    storageBucket: "db-33fb1.appspot.com",
    messagingSenderId: "668772368245",
    appId: "1:668772368245:web:883610fff66adcadb21d3c",
    measurementId: "G-LDHXDP3BQ5"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
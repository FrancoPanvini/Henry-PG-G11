import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "adogtame-proyect.firebaseapp.com",
  projectId: "adogtame-proyect",
  storageBucket: "adogtame-proyect.appspot.com",
  messagingSenderId: "669871616621",
  appId: "1:669871616621:web:590c4e5cf1b0db2e9e4564",
  measurementId: "G-YR9K1S35E1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase as default };
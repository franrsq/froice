import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJATASBOHWAv-cYPJEgu_AbDm67Mgv1s8",
  authDomain: "quejese-aqui.firebaseapp.com",
  projectId: "quejese-aqui",
  storageBucket: "quejese-aqui.appspot.com",
  messagingSenderId: "29169646865",
  appId: "1:29169646865:web:7aa3215fdbb2a6a549a0b0",
  measurementId: "G-YPK7RE0BSJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);
const storage = getStorage(app);


// Emulators
connectFirestoreEmulator(db, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");
connectFunctionsEmulator(functions, "localhost", 5001);
connectStorageEmulator(storage, "localhost", 9199);

export { db, auth, functions, storage };

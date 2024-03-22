import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTBm4Oe05dLRf46aIXLPXcrPXuLKSkV3w",
  authDomain: "crud-app-fae0d.firebaseapp.com",
  projectId: "crud-app-fae0d",
  storageBucket: "crud-app-fae0d.appspot.com",
  messagingSenderId: "933413026567",
  appId: "1:933413026567:web:b94e9f0dbdd8899635e3a2",
  measurementId: "G-EJ5T06MKMM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtCnGVhTj0V6qpAqPZWRAKJ7TnCXGKmxY",
    authDomain: "ecommerce-exclusive-42d7b.firebaseapp.com",
    projectId: "ecommerce-exclusive-42d7b",
    storageBucket: "ecommerce-exclusive-42d7b.firebasestorage.app",
    messagingSenderId: "646705202667",
    appId: "1:646705202667:web:e88a93088ed9aaa15105ae",
    measurementId: "G-4HWJSY07DJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
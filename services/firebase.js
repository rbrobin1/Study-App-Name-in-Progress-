// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8xOfLGnoXvvktaTQSaOlr2ZJInbIgYYQ",
    authDomain: "hw3-network-api.firebaseapp.com",
    projectId: "hw3-network-api",
    storageBucket: "hw3-network-api.firebasestorage.app",
    messagingSenderId: "1010228458582",
    appId: "1:1010228458582:web:ce8abbbc733c59d04337f7",
    measurementId: "G-Z6L1FCW1VR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

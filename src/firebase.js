// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9ccBXj_IIgdJEwTzumpKmLMjluD6KyYc",
    authDomain: "my-storage-d69f8.firebaseapp.com",
    projectId: "my-storage-d69f8",
    storageBucket: "my-storage-d69f8.appspot.com",
    messagingSenderId: "911453746317",
    appId: "1:911453746317:web:55672b82043e813f839ec4",
    measurementId: "G-DVJ29Z37WL"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();

// import firebase from 'firebase/app';
// import 'firebase/auth';
//
// const firebaseConfig = {
//     apiKey: "AIzaSyC9ccBXj_IIgdJEwTzumpKmLMjluD6KyYc",
//     authDomain: "my-storage-d69f8.firebaseapp.com",
//     projectId: "my-storage-d69f8",
//     storageBucket: "my-storage-d69f8.appspot.com",
//     messagingSenderId: "911453746317",
//     appId: "1:911453746317:web:55672b82043e813f839ec4",
//     measurementId: "G-DVJ29Z37WL"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
//
// export const auth = firebase.auth();
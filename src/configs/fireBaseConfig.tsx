// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCA75zQg72pkQfT8Ey1vXQ5qpW9Yt207Q",
    authDomain: "amii-actii.firebaseapp.com",    
    projectId: "amii-actii",
    storageBucket: "amii-actii.appspot.com",
    messagingSenderId: "174545259329",
    appId: "1:174545259329:web:e015634758a1288eb5afc0",
    databaseURL: "https://amii-actii-default-rtdb.firebaseio.com"
};

const firebase = initializeApp(firebaseConfig);

//Referencia dal servicio de la BDD
export const dbRealTime = getDatabase(firebase);
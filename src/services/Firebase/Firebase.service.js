import firebase from "firebase/compat/app";
import ReactObserver from "react-event-observer";
import { getAuth } from "firebase/auth";

const config = {
    apiKey: "AIzaSyC8dD8CifNnn0IhoAvVKbhRBOaIt85EtiE",
    authDomain: "bike-app-6b32a.firebaseapp.com",
    databaseURL:
        "https://bike-app-6b32a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bike-app-6b32a",
    storageBucket: "bike-app-6b32a.appspot.com",
    messagingSenderId: "665002737333",
    appId: "1:665002737333:web:9c8b1767cbde9d7424c8fc",
    measurementId: "G-1HHLT1NPLX",
};

firebase.initializeApp(config);

export const auth = getAuth();
export const firebaseObserver = ReactObserver();

export default firebase;

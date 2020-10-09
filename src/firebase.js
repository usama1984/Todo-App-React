import firebase from "firebase";

const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyB57FCCaoVe6pQdupJBuBmTSwWl4dtZzqc",
    authDomain: "todo-app-cp-dc19c.firebaseapp.com",
    databaseURL: "https://todo-app-cp-dc19c.firebaseio.com",
    projectId: "todo-app-cp-dc19c",
    storageBucket: "todo-app-cp-dc19c.appspot.com",
    messagingSenderId: "292311931376",
    appId: "1:292311931376:web:c5a05d50edafcc1ad3a535",
    measurementId: "G-9Z3TJQXNEV",
});

const db = firebaseapp.firestore();

export default db;

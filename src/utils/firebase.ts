import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Optionally import the services that you want to use
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9ty7u-M8B_Qu6XF3nQlhT9cqeIgik_Ic",
  authDomain: "our-todo-5c53d.firebaseapp.com",
  projectId: "our-todo-5c53d",
  storageBucket: "our-todo-5c53d.appspot.com",
  messagingSenderId: "619351956798",
  appId: "1:619351956798:web:b0d21f1f8d2aa8b116206f",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App.js";

// import firebase from 'firebase';
const firebase = require("firebase");
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC_2jCs-JmuBPim6DNH4btWPeuv6vsqGjQ",
  authDomain: "mynotes-32095.firebaseapp.com",
  databaseURL: "https://mynotes-32095.firebaseio.com",
  projectId: "mynotes-32095",
  storageBucket: "mynotes-32095.appspot.com",
  messagingSenderId: "782579105978",
  appId: "1:782579105978:web:1cc31014c48faeaee54283"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App></App>, document.querySelector("#root"));

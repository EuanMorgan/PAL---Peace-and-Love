// var firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");
import * as firebase from "firebase/app";
import "firebase/database";

const config = {
    apiKey: "AIzaSyBxJb8oxSFCCqPAofx1uAWxJ72-bFkHwvQ",
    authDomain: "krapp-server.firebaseapp.com",
    databaseURL: "https://krapp-server.firebaseio.com",
    projectId: "krapp-server",
    storageBucket: "krapp-server.appspot.com",
    messagingSenderId: "994619209931",
    appId: "1:994619209931:web:6b077816b40ddd8d9b434e",
    measurementId: "G-LX4EP7Z0J4"
  };

firebase.initializeApp(config);
// const db = firebase.database();
// console.log(db);
export {config};//, db};
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABG5Fkcp2Fvrs3iL1YDc-xTWNR7neU3EA",
  authDomain: "burgervspizza-71dde.firebaseapp.com",
  databaseURL: "https://burgervspizza-71dde-default-rtdb.firebaseio.com",
  projectId: "burgervspizza-71dde",
  storageBucket: "burgervspizza-71dde.appspot.com",
  messagingSenderId: "1087940777672",
  appId: "1:1087940777672:web:ff955eb1430714d65c77fd",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

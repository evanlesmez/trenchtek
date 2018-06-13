import * as firebase from "firebase";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyCgN6jxA8LQmBiGix3vDWEeybcFz_fJtng",
  authDomain: "trenchtek.firebaseapp.com",
  databaseURL: "https://trenchtek.firebaseio.com",
  projectId: "trenchtek",
  storageBucket: "trenchtek.appspot.com",
  messagingSenderId: "390689108381"
};
export default firebase.initializeApp(config);
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;

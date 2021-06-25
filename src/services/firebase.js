import firebase from "firebase";

import "firebase/auth";
import "firebase/database";

function initFirebase() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
  };
  firebase.initializeApp(firebaseConfig);
}

initFirebase();

const auth = firebase.auth();

const database = firebase.database();

export { firebase, auth, database };

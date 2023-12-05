// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIiq_y5y2ivbmx_B6kOhchxxudc7oFM8w",
  authDomain: "boimela-8712c.firebaseapp.com",
  projectId: "boimela-8712c",
  storageBucket: "boimela-8712c.appspot.com",
  messagingSenderId: "997119546183",
  appId: "1:997119546183:web:6aaceb7d159b5b5f4cf262",
  measurementId: "G-W22S0FWXJ5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { auth, firebase };

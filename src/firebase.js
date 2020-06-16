//import firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firebase-firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBSuVqCIDZnNofkcqulvbbYm9rg9HPgC6s",
  authDomain: "smartqbe.firebaseapp.com",
  databaseURL: "https://smartqbe.firebaseio.com",
  projectId: "smartqbe",
  storageBucket: "smartqbe.appspot.com",
  messagingSenderId: "467819135969",
  appId: "1:467819135969:web:5791742ef3e126aec008a0",
  measurementId: "G-C6NM5SMT43"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

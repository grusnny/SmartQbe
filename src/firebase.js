//import firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firebase-firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBgnz4ZgUKtqFqIIvtOuoSyp3ZHr3D1LSg",
    authDomain: "smartqbe-a283c.firebaseapp.com",
    databaseURL: "https://smartqbe-a283c.firebaseio.com",
    projectId: "smartqbe-a283c",
    storageBucket: "smartqbe-a283c.appspot.com",
    messagingSenderId: "827668597629",
    appId: "1:827668597629:web:69f2f786266c9bda289a14",
    measurementId: "G-LPLXFGFF7P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

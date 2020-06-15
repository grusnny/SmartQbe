//import firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firebase-firestore';

//firebase.initializeApp({
//apiKey: "AIzaSyAyMsIqcAkMMlq1kzsonIu3vmzJ_XxFssw",
//authDomain: "ayudaencasa-94ee2.firebaseapp.com",
//databaseURL: "https://ayudaencasa-94ee2.firebaseio.com",
//projectId: "ayudaencasa-94ee2",
//storageBucket: "ayudaencasa-94ee2.appspot.com",
//messagingSenderId: "134104346585",
//appId: "1:134104346585:web:bca0de8a5db987de9e33c8",
//measurementId: "G-VJ2PT5BPLL"
//});

//let db = firebase.firestore();
//db.settings({timestampsInSnapshots:true});

//export default db;

const firebaseConfig = {
  apiKey: "AIzaSyB-17um7BlaF6ynqYhcaS-XSWuWIpnK1L0",
  authDomain: "ayudaencasa-38fe2.firebaseapp.com",
  databaseURL: "https://ayudaencasa-38fe2.firebaseio.com",
  projectId: "ayudaencasa-38fe2",
  storageBucket: "ayudaencasa-38fe2.appspot.com",
  messagingSenderId: "580367803186",
  appId: "1:580367803186:web:866c0e68eb2a00d9f7ed2b",
  measurementId: "G-WY62JM8GVH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCPODBO3RGHjNqZzTm-4ZDy7aJW0YSLzJQ",
  authDomain: "whatsapp-clone-d361a.firebaseapp.com",
  projectId: "whatsapp-clone-d361a",
  storageBucket: "whatsapp-clone-d361a.appspot.com",
  messagingSenderId: "418924733020",
  appId: "1:418924733020:web:556ec2737d414308d4fc99",
  measurementId: "G-PPCWGHEK9V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider };
export default db;
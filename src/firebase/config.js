import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJB1u-OpE-wyLl8ueH85Zyj6z3JzlA6rw",
  authDomain: "miniblog-5b050.firebaseapp.com",
  projectId: "miniblog-5b050",
  storageBucket: "miniblog-5b050.appspot.com",
  messagingSenderId: "13207776122",
  appId: "1:13207776122:web:807d16c0480790e6f404c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};
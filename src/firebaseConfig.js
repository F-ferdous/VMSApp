// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn7Zhuu_4D_3wgVYAUqGHt2EWvV4gmwxQ",
  authDomain: "vatstore-986cd.firebaseapp.com",
  projectId: "vatstore-986cd",
  storageBucket: "vatstore-986cd.appspot.com",
  messagingSenderId: "523487859061",
  appId: "1:523487859061:web:42f2852715807a40a2c33c",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

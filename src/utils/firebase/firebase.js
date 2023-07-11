import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithPopup, 
  GoogleAuthProvider ,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore,
  doc, // get doc instance
  getDoc, // getting doc data
  setDoc // settings doc data
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaDh_H84lVSdHRanB1qQCJESDMlWDQDg0",
  authDomain: "ecommerce-ea582.firebaseapp.com",
  projectId: "ecommerce-ea582",
  storageBucket: "ecommerce-ea582.appspot.com",
  messagingSenderId: "624604400874",
  appId: "1:624604400874:web:bebde1cdc564910c239b93",
  measurementId: "G-EEVL8EZBM3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore(); // Points directly to db

export const createUserDocumentFromAuth = async (userAuth, info = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  // If user doesnot exist
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...info
      })
    } catch(err) {
      console.log("Error creating user: ", err);
    }
  }

  return userDocRef;
}

//Create user using email and password
export const createAuthUserwithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

//SignIn with email and password
export const signInAuthUserwithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}
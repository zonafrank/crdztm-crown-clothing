import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIV2FOtZqxAD1YL8zgFrNoHcNLZFHdV5c",
  authDomain: "crown-db-b59d6.firebaseapp.com",
  projectId: "crown-db-b59d6",
  storageBucket: "crown-db-b59d6.appspot.com",
  messagingSenderId: "1068288080582",
  appId: "1:1068288080582:web:74c9305c4bdfd34f8975c7",
  measurementId: "G-KNVTXR3VR3",
};

export const createUserProfileDocument = async function (
  userAuth,
  additionalData
) {
  if (!userAuth) return;

  const userRef = await firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("Error creating user", error.message)
    }
  }

  return userRef;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

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
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = await firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  return collections.docs.reduce((result, collection) => {
    const { title, items } = collection.data();
    const obj = {
      routeName: encodeURI(title.toLowerCase()),
      id: collection.id,
      title,
      items,
    };
    result[title.toLowerCase()] = obj;
    return result;
  }, {});
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

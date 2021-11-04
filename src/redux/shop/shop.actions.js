import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import shopActionTypes from "./shop.types";

export const fetchCollectionsStart = () => {
  return { type: shopActionTypes.FETCH_COLLECTIONS_START };
};

export const fetchCollectionsSuccess = (collections) => {
  return {
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections,
  };
};

export const fetchCollectionsFailure = (errorMessage) => {
  return {
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: errorMessage,
  };
};

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};

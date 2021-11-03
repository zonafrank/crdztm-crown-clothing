import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {
  convertCollectionsSnapshotToMap,
  firestore
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import CollectionPage from "../collection/collection.component";
import "./shop.styles.scss";

function ShopPage({ match, updateCollections }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");
    
    const unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        updateCollections(convertCollectionsSnapshotToMap(await snapshot));
        setIsLoading(false);
      }
    );
    return () => {
      unsubscribeFromSnapshot();
    };
  }, [updateCollections]);

  if (isLoading) {
    return <WithSpinner />
  }

  return (
    <div className="shop-page">
      <Route exact path={match.path} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);

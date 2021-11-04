import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import CollectionPage from "../collection/collection.component";
import "./shop.styles.scss";

function ShopPage({ match, isFetching, fetchCollectionsStartAsync }) {
  useEffect(() => {
    fetchCollectionsStartAsync()
  }, []);

  if (isFetching) {
    return <WithSpinner />
  }

  return (
    <div className="shop-page">
      <Route exact path={match.path} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsCollectionFetching
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

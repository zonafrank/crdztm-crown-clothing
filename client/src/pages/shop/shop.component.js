import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import "./shop.styles.scss";

const CollectionsOverview = lazy(() =>
  import("../../components/collections-overview/collections-overview.component")
);

const CollectionPage = lazy(() => import("../collection/collection.component"));

function ShopPage({ match }) {
  const isFetching = useSelector(selectIsCollectionFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  if (isFetching) {
    return <WithSpinner />;
  }

  return (
    <div className="shop-page">
      <Suspense fallback={<WithSpinner />}>
        <Route exact path={match.path} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </Suspense>
    </div>
  );
}

export default ShopPage;

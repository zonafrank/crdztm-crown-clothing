import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/collection-item/collection-item.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {
  selectCollection,
  selectIsCollectionsLoaded
} from "../../redux/shop/shop.selectors";
import "./collection.styles.scss";

function CollectionPage(props) {
  const params = useParams();
  
  const collection = useSelector((state) =>
    selectCollection(params.collectionId)(state)
  );

  const isCollectionsLoaded = useSelector((state) =>
    selectIsCollectionsLoaded(state)
  );

  if (!isCollectionsLoaded) {
    return <WithSpinner />;
  }

  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;

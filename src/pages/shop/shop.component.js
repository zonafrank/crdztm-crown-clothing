import React, { useState } from "react";
import CollectionPreview from "../../components/collection.preview/collection-preview.component";
import SHOP_DATA from "./shop.data";
import "./shop.styles.scss";

function ShopPage() {
  const [collections, setCollections] = useState(SHOP_DATA);
  return (
    <div className="shop-page">
      {collections.map(({ id, ...otherCollectionProps }) => {
        return <CollectionPreview key={id} {...otherCollectionProps} />;
      })}
    </div>
  );
}

export default ShopPage;

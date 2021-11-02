import React from "react";
import CollectionPreview from "../../components/collection.preview/collection-preview.component";
import SHOP_DATA from "./shop.data";
import "./shop.styles.scss";

function ShopPage() {
  return (
    <div className="shop-page">
      {SHOP_DATA.map(({ id, ...otherCollectionProps }) => {
        return <CollectionPreview key={id} {...otherCollectionProps} />;
      })}
    </div>
  );
}

export default ShopPage;

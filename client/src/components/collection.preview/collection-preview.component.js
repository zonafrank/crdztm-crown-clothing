import React from "react";
import { Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

function CollectionPreview(props) {
  const { title, items, routeName } = props;
  
  return (
    <div className="collection-preview">
      <h1 className="title">
        <Link to={`/shop/${routeName}`}>{title.toUpperCase()}</Link>
      </h1>
      <div className="preview">
        {items.slice(0, 4).map((item) => {
          return <CollectionItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default CollectionPreview;

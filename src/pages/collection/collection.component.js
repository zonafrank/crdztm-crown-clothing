import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectCollection } from "../../redux/shop/shop.selectors";
import "./collection.styles.scss";

function CollectionPage({ collection, ...otherProps }) {
  console.log({ otherProps });
  if (!collection) {
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

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  return {
    collection: selectCollection(ownProps.match.params.collectionId)(state),
  };
};

export default connect(mapStateToProps)(CollectionPage);

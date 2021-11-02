import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from '../../redux/shop/shop.selectors';
import CollectionPreview from "../collection.preview/collection-preview.component";
import "./collections-overview.styles.scss";


function CollectionsOverview({collections}) {
  return (
    <div className="collections-overview">
      {Object.values(collections).map(({ id, ...otherCollectionProps }) => {
        return <CollectionPreview key={id} {...otherCollectionProps} />;
      })}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
})

export default connect(mapStateToProps)(CollectionsOverview)

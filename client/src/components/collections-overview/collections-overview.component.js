import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from '../../redux/shop/shop.selectors';
import CollectionPreview from "../collection.preview/collection-preview.component";
import WithSpinner from '../with-spinner/with-spinner.component';
import "./collections-overview.styles.scss";


function CollectionsOverview({collections}) {
  if (!collections) {
    return <WithSpinner />
  }

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

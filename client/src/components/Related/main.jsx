import React from 'react';
import RelatedProductsWidget from './RelatedProductsWidget.jsx';
import OutfitsWidget from './OutfitsWidget.jsx';
import helperFunctions from '../../helperFunctions.js';

class Related extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.assignImage = this.assignImage.bind(this);
  }

  assignImage(imageArray) {
    const PlaceholderPhoto = './images/missingImage.svg';

    if (imageArray) {
      if (imageArray[0].thumbnail_url) {
        return imageArray[0].thumbnail_url;
      }
    }
    return PlaceholderPhoto;
  }

  comparisonChart() {
    // compare product a to product b
  }

  render() {
    return (
      <div>
        <div id="RelatedProductsAndOutfits">
          <h4>RELATED PRODUCTS</h4>
          <RelatedProductsWidget currentProduct={this.props.currentProduct} assignImage={this.assignImage}/>
          <h4>YOUR OUTFITS</h4>
          <OutfitsWidget currentProduct={this.props.currentProduct} outfits={this.props.outfits} assignImage={this.assignImage}/>
        </div>
      </div>
    );
  }

}

export default Related;
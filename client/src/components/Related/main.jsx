import React from 'react';
import RelatedProductsWidget from './RelatedProductsWidget.jsx';
import OutfitsWidget from './OutfitsWidget.jsx';
import helperFunctions from '../../helperFunctions.js';
import Modal from './Modal.jsx';

class Related extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }

    this.assignImage = this.assignImage.bind(this);
    this.showModal = this.showModal.bind(this);
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

  showModal(e) {
    this.setComparisonFeatures(e.target.id);
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div>
        <Modal onClose={this.showModal} show={this.state.show}></Modal>
        <div id="RelatedProductsAndOutfits">
          <h4>RELATED PRODUCTS</h4>
          <RelatedProductsWidget currentProduct={this.props.currentProduct} assignImage={this.assignImage} changeCurrentProduct={this.props.changeCurrentProduct}/>
          <h4>YOUR OUTFITS</h4>
          <OutfitsWidget currentProduct={this.props.currentProduct} outfits={this.props.outfits} assignImage={this.assignImage} addToOutfit={this.props.addToOutfit}/>
        </div>
      </div>
    );
  }

}

export default Related;
import React from 'react';
import OutfitItem from './OutfitItem.jsx';
import helperFunctions from './../../helperFunctions.js';
import Carousel from './Carousel.jsx';

class OutfitsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleAddOrRemove = this.handleAddOrRemove.bind(this);
  }

  handleRemove(id) {
    this.props.updateOutfitsData(id);
    this.props.addToOutfit(id.toString());
  };

  handleAddOrRemove(e) {
    e.preventDefault();
    if (this.props.outfits.includes(this.props.currentProduct)) {
      this.props.addToOutfit(this.props.currentProduct);
    } else {
      this.props.addToOutfit(this.props.currentProduct);
    }
  }

  render() {
    return (
      <div id="OutfitsWidget">
        <Carousel
          outfitData={this.props.outfitsData}
          assignImage={this.props.assignImage}
          outfits={this.props.outfits}
          changeCurrentProduct={this.props.changeCurrentProduct}
          currentProduct={this.props.currentProduct}
          showModal={this.props.showModal}
          handleClick={this.handleClick}
          addToOutfit={this.props.addToOutfit}
          widget={'outfits'}
          productRating={this.props.productRating}
          handleRemove={this.handleRemove}
          handleAddOrRemove={this.handleAddOrRemove}/>
    </div>
  )}
}

export default OutfitsWidget;
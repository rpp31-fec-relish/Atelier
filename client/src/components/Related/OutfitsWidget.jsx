import React from 'react';
import OutfitItem from './OutfitItem.jsx';
import helperFunctions from './../../helperFunctions.js';
import Carousel from './Carousel.jsx';

class OutfitsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    //this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAddOrRemove = this.handleAddOrRemove.bind(this);
  }

  // handleTextChange(itemId = this.props.currentProduct, toggle) {
  //   if (this.props.outfits.includes(itemId)) {
  //     return '- REMOVE FROM OUTFIT';
  //   } else {
  //     return '+ ADD TO OUTFIT';
  //   }
  // }

  handleRemove(id) {
    this.props.updateOutfitsData(id);
    this.props.addToOutfit(id);
    //e.preventDefault();
    //let id = parseInt(e.target.id);
    // alert('hi');
    // if (this.props.outfits.includes(id)) {
    //   // let newOutfitsData = [...this.props.outfitsData];
    //   // const removeIndex = newOutfitsData.findIndex(item => item.id === id);
    //   // newOutfitsData.splice(removeIndex, 1);
    //   // //alert('remove');
    //   // console.log('new outfits data: ', newOutfitsData);
    //   // this.setState({outfitsData: newOutfitsData});
    //   alert(id);
    //   this.props.updateOutfitsData(id);
    //   this.props.addToOutfit(id);
    // }
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
          showModal={this.props.showModal}
          handleClick={this.handleClick}
          addToOutfit={this.props.addToOutfit}
          widget={'outfits'}
          productRating={this.props.productRating}
          handleRemove={this.handleRemove}
          handleAddOrRemove={this.handleAddOrRemove}
          handleTextChange={this.props.handleTextChange}/>
    </div>
  )}
}

export default OutfitsWidget;
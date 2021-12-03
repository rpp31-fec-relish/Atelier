import React from 'react';
import OutfitItem from './OutfitItem.jsx';
import helperFunctions from './../../helperFunctions.js';
import Carousel from './Carousel.jsx';

class OutfitsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitsData: []
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getOutfitData = this.getOutfitData.bind(this);
  }

  handleTextChange(itemId = this.props.currentProduct) {
    if (this.props.outfits.includes(itemId)) {
      return '- REMOVE FROM OUTFIT';
    } else {
      return '+ ADD TO OUTFIT';
    }
  }

  getOutfitData() {
    let CPD = this.props.currentProductData;
    let data = {
      id: CPD.id,
      name: CPD.name,
      category: CPD.category,
      price: CPD.default_price,
      image: null
    };

    helperFunctions.getProductStylesById(CPD.id)
      .then(styles => {
        data.image = styles[0].photos;
        return data;
      })
      .then(relevantData => {
        this.setState({outfitsData: [...this.state.outfitsData, relevantData]});
      })
      .catch(err => console.error(err));
  }

  handleClick(e) {
    e.preventDefault();
    // if currentProduct is already in outfits, remove from outfits
    if (!e.target.id) {
      let currentId = this.props.currentProduct;
      if (this.props.outfits.includes(currentId)) {
        let newOutfitsData = [...this.state.outfitsData];
        newOutfitsData.forEach(outfit => {
          if (outfit.id === currentId) {
            var removeIndex = newOutfitsData.map(item => item.id).indexOf(currentId);
            ~removeIndex && newOutfitsData.splice(removeIndex, 1);
          }
        })
        this.setState({outfitsData: newOutfitsData});
        this.props.addToOutfit(currentId);
      } else {
        this.getOutfitData();
        this.props.addToOutfit(currentId);
      }
    } else {
      let idToNum = parseInt(e.target.id);
      if (this.props.outfits.includes(idToNum)) {
        let newOutfitsData = [...this.state.outfitsData];
        const removeIndex = newOutfitsData.findIndex(item => item.id === idToNum);
        newOutfitsData.splice(removeIndex, 1);
        this.setState({outfitsData: newOutfitsData});
      }
      this.props.addToOutfit(e.target.id);
    }
  }

  render() {
    return (
      <div id="OutfitsWidget">
        <Carousel
          outfitData={this.state.outfitsData}
          assignImage={this.props.assignImage}
          outfits={this.props.outfits}
          changeCurrentProduct={this.props.changeCurrentProduct}
          showModal={this.props.showModal}
          handleClick={this.handleClick}
          addToOutfit={this.props.addToOutfit}
          handleTextChange={this.handleTextChange}
          widget={'outfits'}
          productRating={this.props.productRating}/>
    </div>
  )}
}

export default OutfitsWidget;
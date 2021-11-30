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
    helperFunctions.getProductById(this.props.currentProduct)
    .then(productData => {
      let data = {
        id: productData.id,
        name: productData.name,
        category: productData.category,
        price: productData.default_price,
        features: productData.features,
        image: null
      }
      return data;
    })
    .then(results =>  {
      helperFunctions.getProductStylesById(results.id)
        .then(styles => {
          results.image = styles[0].photos;
          return results;
        })
        .then(relevantData => {
          this.setState({outfitsData: [...this.state.outfitsData, relevantData]});
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  handleClick(e) {
    e.preventDefault();
    // if currentProduct is already in outfits, remove from outfits
    if (!e.target.id) {
      if (this.props.outfits.includes(this.props.currentProduct)) {
        let newOutfitsData = [...this.state.outfitsData];
        newOutfitsData.forEach(outfit => {
          if (outfit.id === this.props.currentProduct) {
            var removeIndex = newOutfitsData.map(item => item.id).indexOf(this.props.currentProduct);
            ~removeIndex && newOutfitsData.splice(removeIndex, 1);
          }
        })
        this.setState({outfitsData: newOutfitsData});
        this.props.addToOutfit(this.props.currentProduct);
      } else {
        this.getOutfitData();
        this.props.addToOutfit(this.props.currentProduct);
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
          widget={'outfits'}/>
    </div>
  )}
}

export default OutfitsWidget;
import React from 'react';
import OutfitItem from './OutfitItem.jsx';
import helperFunctions from './../../helperFunctions.js';

class OutfitsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitsId: [],
      outfitsData: []
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getOutfitData = this.getOutfitData.bind(this);
  }

  handleTextChange() {
    if (this.props.outfits.includes(this.props.currentProduct)) {
      return 'REMOVE FROM OUTFIT';
    } else {
      return 'ADD TO OUTFIT';
    }
  }

  getOutfitData() {
    let newData = [];

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
      this.setState({ outfitsId: [...this.state.outfitsId, productData.id] })
      newData.push(data);
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
    if (this.state.outfitsId.includes(this.props.currentProduct)) {
      let newOutfitsData = [...this.state.outfitsData];
      newOutfitsData.forEach(outfit => {
        if (outfit.id === this.props.currentProduct) {
          var removeIndex = newOutfitsData.map(item => item.id).indexOf(this.props.currentProduct);
          ~removeIndex && newOutfitsData.splice(removeIndex, 1);
        }
      })
      this.setState({outfitsData: newOutfitsData})
    } else {
      this.getOutfitData();
      this.props.addToOutfit(this.props.currentProduct);
    }
  }

  render() {
    return (
      <section id="OutfitsWidget">
        <div id="OutfitItem">
          <div id="addToOutfit">
            <a href='#add-outfit' id="OutfitText" onClick={(e) => {
              this.handleClick(e);
            }}>+ {this.handleTextChange()}</a>
          </div>
        </div>
        {this.state.outfitsData.map((outfit) => <OutfitItem key={'outfit_' + outfit.id} id={outfit.id} name={outfit.name} category={outfit.category} price={outfit.price} image={outfit.image} assignImage={this.props.assignImage} outfits={this.props.outfits}/>)}
      </section>
    )
  }
}

export default OutfitsWidget;
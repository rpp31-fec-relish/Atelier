import React from 'react';
import helperFunctions from '../../helperFunctions.js';

class OverviewCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sku: null,
      quantity: 1
    }
  }
  // Component for selections and buttons for adding to cart / favoriting
  // todo: confirm skus exist

  createSizes() {
    let skus = Object.keys(this.props.currentStyle.skus);
    return skus.map((sku) => (<option key={sku} value={sku}>{this.props.currentStyle.skus[sku].size}</option>));
  }

  addToCartListener(event) {

    if (this.state.sku != null) {
      console.log(`Added ${this.props.currentStyle.style_id} to cart`);
          //helperFunctions.addToCart()
    }
  }

  selectSizeListener(event) {

    if (event.target.value === 'Select Size' || event.target.value === null) {
      return;
    }
    this.setState({sku: event.target.value, sizeValue: event.target.value});

  }

  componentDidUpdate() {
    if (this.state.sku != null) {
      document.getElementById('addToCartButton').removeAttribute('disabled');
    }
  }

  render() {
    if (this.props.currentStyle) {
      return (
        <div>
          <select name='size' value={(this.state.sku === null) ? 'default' : this.state.sku} id='SizeDropdown' onChange={this.selectSizeListener.bind(this)}>
            <option value='default' disabled>Select Size</option>
            {this.createSizes()}
          </select>
          <select name='quantity' value={this.state.quantityValue} id='QuantityDropdown'>
            <option disabled>Select Quantity</option>
          </select>
          <button id='addToCartButton' onClick={this.addToCartListener.bind(this)} disabled>Add To Cart</button>
          <button>Favorite</button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewCart;
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
  // todo: handle multiple skus for different sizes, ex: sku.size is not unique for 59553

  createSizes() {
    let skus = Object.keys(this.props.currentStyle.skus);
    return skus.map((sku) => (<option key={sku} value={sku}>{this.props.currentStyle.skus[sku].size}</option>));
  }

  createQuantities() {
    if (this.state.sku === null) {
      return (<option value='1'>{1}</option>)
    } else {
      let available = this.props.currentStyle.skus[this.state.sku].quantity;
      if (available === 0) {
        return (<option value='0' disabled> No Inventory Available </option>)
      }
      let options = [];
      for (let i = 0; i < available; i++) {
        options.push(<option key={i+1} value={i+1}>{i+1}</option>)
      }
      return options;
    }
  }

  addToCartListener(event) {

    if (this.state.sku != null) {
      console.log(`Added ${this.props.currentStyle.style_id} to cart`);
          //helperFunctions.addToCart()
    }
  }

  selectSizeListener(event) {

    if (event.target.value === 'default' || event.target.value === null) {
      return;
    }
    this.setState({sku: event.target.value, sizeValue: event.target.value});

  }

  selectQuantityListener(event) {

    if (event.target.value === 'default' || event.target.value === null) {
      return;
    }
    this.setState({quantity: event.target.value});

  }

  componentDidUpdate() {
    if (this.state.sku != null) {
      document.getElementById('addToCartButton').removeAttribute('disabled');
      document.getElementById('QuantityDropdown').removeAttribute('disabled');
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
          <select name='quantity' value='1' id='QuantityDropdown' disabled>
            {this.createQuantities()}
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
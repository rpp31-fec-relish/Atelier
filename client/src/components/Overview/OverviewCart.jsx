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
    if (this.state.sku === null
      || this.props.currentStyle === null
      || !Object.keys(this.props.currentStyle.skus).includes(this.state.sku)) {
      return (<option value='1'>{1}</option>)
    } else {
      console.log('sku: ', this.state.sku);
      console.log('current style: ', this.props.currentStyle.skus);
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
      let results = [];
      for (let i = 0; i < this.state.quantity; i++) {
        // API does not accept quantity for POST items to cart.  ex: Have to make 10 POST requests to add 10 items to cart
        results.push(helperFunctions.addToCart(this.state.sku));
      }
      Promise.all(results).then((result) => {
        console.log(result, `: Added ${this.state.quantity} of ${this.state.sku} (${this.props.currentStyle.style_id}) to cart`);
      });
    } else {
      console.log('Should not happen - added to cart with a null sku');
    }
  }

  favoriteListener(event) {

    this.props.addToOutfit(this.props.currentProduct);
    console.log(`Added ${this.props.currentProduct} to outfit`);

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

  toggleSelectors() {
    // disable addToCart button and the Select Quantity dropdown if no sku selected,
    // enable them when sku selected
    let addToCartButton = window.document.getElementById('addToCartButton');
    let quantityDropdown = window.document.getElementById('QuantityDropdown');
    if (this.state.sku === null && addToCartButton != null) {
      addToCartButton.setAttribute('disabled', 'true');
    }
    if (this.state.sku === null && quantityDropdown != null) {
      quantityDropdown.setAttribute('disabled', 'true');
    }
    if (this.state.sku != null && addToCartButton != null) {
      addToCartButton.removeAttribute('disabled');
      quantityDropdown.removeAttribute('disabled');
    }
  }

  componentDidMount() {
    this.toggleSelectors();
  }

  componentDidUpdate(prevProps) {

    // if the style changed, reset the size & quantity info
    if ( this.state.sku != null &&
      (this.props.currentProduct != prevProps.currentProduct
      || this.props.currentStyle.style_id != prevProps.currentStyle.style_id)) {
        this.setState({sku: null, quantity: 1});
    }
    this.toggleSelectors();
  }

  render() {
    if (this.props.currentStyle != null) {
      return (
        <div>
          <select name='size' value={(this.state.sku === null) ? 'default' : this.state.sku} id='SizeDropdown' onChange={this.selectSizeListener.bind(this)}>
            <option value='default' disabled>Select Size</option>
            {this.createSizes()}
          </select>
          <select name='quantity' value={this.state.quantity} id='QuantityDropdown' onChange={this.selectQuantityListener.bind(this)}>
            <option value='Select Quantity' disabled>Select Quantity</option>
            {this.createQuantities()}
          </select>
          <br />
          <button id='addToCartButton' onClick={this.addToCartListener.bind(this)}>Add To Cart</button>
          <button id='favoriteButton' onClick={this.favoriteListener.bind(this)}>Favorite</button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewCart;
import React from 'react';

class OverviewCart extends React.Component {

  // Component for selections and buttons for adding to cart / favoriting
  // todo: confirm skus exist

  createSizes() {
    let skus = Object.keys(this.props.currentStyle.skus);
    return skus.map((sku) => (<option key={sku} value={sku}>{this.props.currentStyle.skus[sku].size}</option>));
  }

  render() {
    if (this.props.currentStyle) {
      return (
        <div>
          <select name='size' value='Select Size' id='SizeDropdown'>
            <option disabled>Select Size</option>
            {this.createSizes()}
          </select>
          <select name='quantity' value='Select Quantity' id='QuantityDropdown'>
            <option disabled>Select Quantity</option>
          </select>
          <button>Add To Cart</button>
          <button>Favorite</button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewCart;
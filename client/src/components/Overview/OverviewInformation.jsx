import React from 'react';

class OverviewInformation extends React.Component {

  // todo: render rating

  render() {
    if (this.props.product) {
      let price = this.props.currentStyle.original_price;
      if (this.props.currentStyle.sale_price) {
        price = (<div><del>{price}</del> {this.props.currentStyle.sale_price}</div>);
      }
      return (
        <div id='overviewInformation'>
          <div id='rating'>
            &#9733;&#9733;&#9733;&#9734;&#9734;
            <a href='#reviews'>Read all Reviews</a>
          </div>
          <div id='category'>
            {this.props.product.category}
          </div>
          <div id='productname'>
            {this.props.product.name}
          </div>
          <div id='price'>
            {price}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

}

export default OverviewInformation;
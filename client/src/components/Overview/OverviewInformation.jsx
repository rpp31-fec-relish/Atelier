import React from 'react';

class OverviewInformation extends React.Component {

  // todo: render rating

  render() {
    if (this.props.currentStyle) {
      let price = '$' + this.props.currentStyle.original_price;
      if (this.props.currentStyle.sale_price) {
        price = (<div><del>{price}</del> {'$' + this.props.currentStyle.sale_price}</div>);
      }
      return (
        <div id='OverviewInformation'>
          <div id='OverviewRating'>
            &#9733;&#9733;&#9733;&#9734;&#9734;&nbsp;&nbsp;
            <a href='#reviews'>Read all Reviews</a>
          </div>
          <br />
          <div id='OverviewCategory'>
            {this.props.product.category}
          </div>
          <div id='OverviewProductname'>
            {this.props.product.name}
          </div>
          <div id='OverviewPrice'>
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
import React from 'react';

class OverviewInformation extends React.Component {

  render() {
    if (this.props.product) {
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
            {this.props.product.default_price}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

}

export default OverviewInformation;
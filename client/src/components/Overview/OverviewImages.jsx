import React from 'react';
import helperFunctions from '../../helperFunctions.js';

class OverviewImages extends React.Component {

  // Component for image gallery of current product
  constructor(props) {
    super(props)
  }

  // renders first image, not always default style
  render() {
    if (this.props.productStyles) {
      return (
        <div>
          <img src={this.props.productStyles[0].photos[0].thumbnail_url}></img>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewImages;
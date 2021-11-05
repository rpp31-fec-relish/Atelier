import React from 'react';
import helperFunctions from '../../helperFunctions.js';

const PlaceholderPhoto = './images/missingImage.svg';

class OverviewImages extends React.Component {

  // Component for image gallery of current product
  constructor(props) {
    super(props)
  }

  getDefaultStyle() {
    if (this.props.productStyles && this.props.productStyles.length > 0) {
      for (let i = 0; i < this.props.productStyles.length; i++) {
        if (this.props.productStyles[i]['default?']) {
          return this.props.productStyles[i];
        }
      }
      // if no style marked default, choose first style
      return this.props.productStyles[0];
    }
  }

  getDefaultThumbnail() {
    let defaultStyle = this.getDefaultStyle();
    if (defaultStyle && defaultStyle.photos && defaultStyle.photos.length > 0) {
      for (let i = 0; i < defaultStyle.photos.length; i++) {
        if (defaultStyle.photos[i].thumbnail_url) {
          return defaultStyle.photos[i].thumbnail_url;
        }
      }
    }
  }


  render() {
    let imageURL = this.getDefaultThumbnail();
    imageURL = imageURL ? imageURL : PlaceholderPhoto;

    // todo: add alt text for accessibility
    if (this.props.productStyles) {
      return (
        <div>
          <img src={imageURL} width='300'></img>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewImages;
import React from 'react';
import helperFunctions from '../../helperFunctions.js';

const PlaceholderPhoto = './images/missingImage.svg';

class OverviewImages extends React.Component {

  // Component for image gallery of current product
  constructor(props) {
    super(props);
  }

  getDefaultPhoto() {
    let defaultStyle = this.props.currentStyle;
    if (defaultStyle && defaultStyle.photos && defaultStyle.photos.length > 0) {
      for (let i = 0; i < defaultStyle.photos.length; i++) {
        if (defaultStyle.photos[i].url) {
          return defaultStyle.photos[i].url;
        } else if (defaultStyle.photos[i].thumbnail_url) {
          return defaultStyle.photos[i].thumbnail_url;
        }
      }
    }
  }


  render() {
    let imageURL = this.getDefaultPhoto();
    imageURL = imageURL ? imageURL : PlaceholderPhoto;

    // todo: add alt text for accessibility
    if (this.props.currentStyle) {
      return (
        <div id='OverviewImage'>
          <img src={imageURL}></img>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewImages;
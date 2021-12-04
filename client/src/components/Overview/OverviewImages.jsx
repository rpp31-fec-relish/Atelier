import React from 'react';
import helperFunctions from '../../helperFunctions.js';

const PlaceholderPhoto = './images/missingImage.svg';

class OverviewImages extends React.Component {

  // Component for image gallery of current product
  constructor(props) {
    super(props);
    this.state = {
      currentImage: null
    }
  }

  getDefaultPhoto() {
    let defaultStyle = this.props.currentStyle;
    if (defaultStyle && defaultStyle.photos && defaultStyle.photos.length > 0) {
      for (let i = 0; i < defaultStyle.photos.length; i++) {
        if (defaultStyle.photos[i].url) {
          this.setState({currentImage: defaultStyle.photos[i]});
          return;
        }
      }
      this.setState({currentImage: {url: PlaceholderPhoto, thumbnail_url: PlaceholderPhoto}});
    }
  }

  componentDidMount() {
    this.getDefaultPhoto();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStyle != prevProps.currentStyle) {
      this.getDefaultPhoto();
    }
  }

  createImages() {
    // todo: highlight current image
    return this.props.currentStyle.photos.map((photoObject, index) => {
      let url = photoObject.thumbnail_url;
      if (this.state.currentImage != null && photoObject.url === this.state.currentImage.url) {
        return (<img id={'OverviewThumbnail' + index} key={index} className='OverviewSelectedStyle' onClick={this.handleThumbnailClick.bind(this)} src={url} width='10' height='10'></img>);
      }
      return (<img id={'OverviewThumbnail' + index} key={index} onClick={this.handleThumbnailClick.bind(this)} src={url} width='10' height='10'></img>);
    });
  }

  handleThumbnailClick(event) {
    this.setState({currentImage: this.props.currentStyle.photos[Number(event.target.id.substring(17))]});
  }

  handleMainImageClick(event) {
    let interactionsElement = document.getElementById('removable');
    if (!interactionsElement.classList.contains('hideMe')) {
      interactionsElement.classList.add('hideMe');
    } else {
      interactionsElement.classList.remove('hideMe');
    }

    let overviewImageElement = document.getElementById('OverviewImage');
    if (!overviewImageElement.classList.contains('OverviewImageHeightFixed')) {
      overviewImageElement.classList.add('OverviewImageHeightFixed');
    } else {
      overviewImageElement.classList.remove('OverviewImageHeightFixed');
    }
  }


  render() {

    if (this.props.currentStyle === null) {
      return null;
    }

    let imageURL = ((this.state.currentImage != null) && this.state.currentImage.url) ? this.state.currentImage.url : PlaceholderPhoto;

    // todo: add alt text for accessibility
    if (this.props.currentStyle) {
      return (
        <div id='OverviewImage' className='OverviewImageHeightFixed'>
          <div id='OverviewImageGallery'>
            {this.createImages()}
          </div>
          <img src={imageURL} onClick={this.handleMainImageClick}></img>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewImages;
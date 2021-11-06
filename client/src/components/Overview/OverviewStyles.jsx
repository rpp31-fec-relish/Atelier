import React from 'react';

class OverviewStyles extends React.Component {

  // Component for displaying and selecting styles of product

  constructStylePicker() {

    // todo: avoid warping when resizing
    return this.props.productStyles.map((style, index) => {
        let url = style.photos[0].thumbnail_url;
        if (url) {
          return (<img key={index} src={url} width='50' height='50'/>);
        } else {
          return (<img key={index} src='./images/missingImage.svg' width='50' height='50'/>);
        }
      });
  }

  render() {
    if (this.props.currentStyle && this.props.productStyles) {
      return (
        <div>
          <div id='CurrentStyle'>
            STYLE > {this.props.currentStyle.name}
          </div>
          <div id='StylePicker'>
            {this.constructStylePicker()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewStyles;
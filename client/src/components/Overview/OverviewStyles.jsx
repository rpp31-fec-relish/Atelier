import React from 'react';

class OverviewStyles extends React.Component {

  // Component for displaying and selecting styles of product

  handleStyleClick(event) {
    this.props.setStyle(this.props.productStyles[event.target.id]);
  }

  constructStylePicker() {

    // todo: avoid warping when resizing
    return this.props.productStyles.map((style, index) => {
        let url = style.photos[0].thumbnail_url;
        if (style.style_id && this.props.currentStyle.style_id === style.style_id) {
          if (url) {
            return (<img className='OverviewSelectedStyle' id={index} key={index} src={url} width='50' height='50' onClick={this.handleStyleClick.bind(this)}/>);
          } else {
            return (<img className='OverviewSelectedStyle' id={index} key={index} src='./images/missingImage.svg' width='50' height='50' onClick={this.handleStyleClick.bind(this)}/>);
          }
        } else {
          if (url) {
            return (<img id={index} key={index} src={url} width='50' height='50' onClick={this.handleStyleClick.bind(this)}/>);
          } else {
            return (<img id={index} key={index} src='./images/missingImage.svg' width='50' height='50' onClick={this.handleStyleClick.bind(this)}/>);
          }
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
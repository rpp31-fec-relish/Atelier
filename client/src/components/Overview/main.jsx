import React from 'react';
import OverviewImages from './OverviewImages.jsx';
import OverviewInformation from './OverviewInformation.jsx';
import OverviewStyles from './OverviewStyles.jsx';
import OverviewCart from './OverviewCart.jsx';
import OverviewDescription from './OverviewDescription.jsx';
import helperFunctions from '../../helperFunctions.js';

class Overview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStyle: null
    }

  }

  getDefaultStyle(productStyles) {
    if (productStyles && productStyles.length > 0) {
      for (let i = 0; i < productStyles.length; i++) {
        if (productStyles[i]['default?']) {
          return productStyles[i];
        }
      }
      // if no style marked default, choose first style
      return this.productStyles[0];
    }
  }

  setCurrentStyle(productStyle) {
    // todo: validation, handle productStyle as optional ID
    this.setState({currentStyle: productStyle});
  }

  componentDidMount() {

    this.setState({currentStyle: this.getDefaultStyle(this.props.currentProductStyles)});

  }

  componentDidUpdate(prevProps) {

    if (prevProps.currentProductData.id != this.props.currentProductData.id) {
      this.setState({currentStyle: this.getDefaultStyle(this.props.currentProductStyles)});
    }

  }

  render() {
    if (this.props.currentProductData === null
      || this.state.currentStyle === null
      || this.props.currentProductStyles == null) {
      return null;
    }
    return (
      <div id='Overview'>
        <div id='OverviewMain'>
          <OverviewImages product={this.props.currentProductData} currentStyle={this.state.currentStyle}/>
          <div id='OverviewInteract'>
            <OverviewInformation product={this.props.currentProductData} currentStyle={this.state.currentStyle}/>
            <OverviewStyles productStyles={this.props.currentProductStyles} currentStyle={this.state.currentStyle} setStyle={this.setCurrentStyle.bind(this)}/>
            <OverviewCart currentProduct={this.props.currentProduct} currentStyle={this.state.currentStyle} addToOutfit={this.props.addToOutfit}/>
          </div>
        </div>
        <OverviewDescription product={this.props.currentProductData}/>
      </div>
    );
  }

}

export default Overview;
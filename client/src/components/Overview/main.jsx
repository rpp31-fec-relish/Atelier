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
      product: null,
      productStyles: null,
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

  getProductsAndStyles() {

    // todo: clear currentStyle when product changes
    // had to do it nested like this to have access to
    // all the results for one setState
    helperFunctions.getProductById(this.props.currentProduct)
    .then((product) => {
      return helperFunctions.getProductStylesById(this.props.currentProduct)
        .then((productStyles) => {
          this.setState({
            product: product,
            productStyles: productStyles,
            currentStyle: this.getDefaultStyle(productStyles)
          });
        })
    })
    .catch((error) => console.error(error));

  }

  componentDidMount() {

    this.getProductsAndStyles();

  }

  componentDidUpdate(prevProps) {

    if (prevProps.currentProduct != this.props.currentProduct) {
      this.getProductsAndStyles();
    }

  }

  // table for now, will do layout properly in CSS
  render() {
    if (this.state.product === null
      || this.state.currentStyle === null
      || this.state.productStyles == null) {
      return null;
    }
    return (
      <div id='Overview'>
        <div id='OverviewMain'>
          <OverviewImages product={this.state.product} currentStyle={this.state.currentStyle}/>
          <div id='OverviewInteract'>
            <OverviewInformation product={this.state.product} currentStyle={this.state.currentStyle}/>
            <OverviewStyles productStyles={this.state.productStyles} currentStyle={this.state.currentStyle} setStyle={this.setCurrentStyle.bind(this)}/>
            <OverviewCart currentProduct={this.props.currentProduct} currentStyle={this.state.currentStyle} addToOutfit={this.props.addToOutfit}/>
          </div>
        </div>
        <OverviewDescription product={this.state.product}/>
      </div>
    );
  }

}

export default Overview;
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

  getDefaultStyle() {
    if (this.state.productStyles && this.state.productStyles.length > 0) {
      for (let i = 0; i < this.state.productStyles.length; i++) {
        if (this.state.productStyles[i]['default?']) {
          return this.state.productStyles[i];
        }
      }
      // if no style marked default, choose first style
      return this.state.productStyles[0];
    }
  }

  componentDidMount() {

    // future: avoid calling three setstates
    helperFunctions.getProductById(this.props.currentProduct)
    .then((product) => {
      console.log('setting product');
      this.setState({product});
    })
    .then(() => {
      console.log('getting styles');
      return helperFunctions.getProductStylesById(this.props.currentProduct);
    })
    .then((productStyles) => {
      console.log('setting styles');
      this.setState({productStyles});
    })
    .then(() => {
      // todo: clear currentStyle when product changes
      console.log('setting currentStyle ', this.state.currentStyle, this.getDefaultStyle());
      if (!this.state.currentStyle) {
        this.setState({currentStyle: this.getDefaultStyle()});
      }
    })
    .catch((error) => console.error(error));

  }

  // table for now, will do layout properly in CSS
  render() {
    return (
      <div id='overview'>
        <table>
          <tbody>
            <tr>
              <td>
                <OverviewImages product={this.state.product} currentStyle={this.state.currentStyle}/>
              </td>
              <td>
                <OverviewInformation product={this.state.product} currentStyle={this.state.currentStyle}/>
                <OverviewStyles productStyles={this.state.productStyles} currentStyle={this.state.currentStyle}/>
                <OverviewCart />
              </td>
            </tr>
            <tr>
              <td>
                <OverviewDescription product={this.state.product}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default Overview;
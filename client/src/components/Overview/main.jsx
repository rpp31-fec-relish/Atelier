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

  componentDidMount() {

    // todo: clear currentStyle when product changes
    // had to do it nested like this to have access to
    // all the results for one setState
    helperFunctions.getProductById(this.props.currentProduct)
    .then((product) => {
      return helperFunctions.getProductStylesById(this.props.currentProduct)
        .then((productStyles) => {
          if (!this.state.currentStyle) {
            this.setState({
              product: product,
              productStyles: productStyles,
              currentStyle: this.getDefaultStyle(productStyles)
            });
          } else {
            this.setState({
              product: product,
              productStyles: productStyles
            });
          }
        })
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
                <OverviewStyles productStyles={this.state.productStyles} currentStyle={this.state.currentStyle} setStyle={this.setCurrentStyle.bind(this)}/>
                <OverviewCart />
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
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
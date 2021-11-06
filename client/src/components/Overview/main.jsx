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
      productStyles: null
    }

  }

  componentDidMount() {

    // future: avoid calling two setstates
    helperFunctions.getProductById(this.props.currentProduct)
    .then((product) => this.setState({product}));

    helperFunctions.getProductStylesById(this.props.currentProduct)
    .then((productStyles) => this.setState({productStyles}));

  }
  // table for now, will do layout properly in CSS
  render() {
    return (
      <div id='overview'>
        <table>
          <tbody>
            <tr>
              <td>
                <OverviewImages product={this.state.product} productStyles={this.state.productStyles}/>
              </td>
              <td>
                <OverviewInformation />
                <OverviewStyles />
                <OverviewCart />
              </td>
            </tr>
            <tr>
              <td>
                <OverviewDescription />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default Overview;
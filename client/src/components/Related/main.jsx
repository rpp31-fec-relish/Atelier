import React from 'react';
import RelatedProductsWidget from './RelatedProductsWidget.jsx';
import OutfitsWidget from './OutfitsWidget.jsx';
import helperFunctions from '../../helperFunctions.js';

class Related extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  comparisonChart() {
    // compare product a to product b
    alert('click');
  }

  render() {
    return (
      <div>
        <div id="RelatedProductsAndOutfits" style={{border: "1px solid black"}}>
          <h4>Related Products</h4>
          <RelatedProductsWidget currentProduct={this.props.currentProduct}/>
          <h4>Outfits</h4>
          <OutfitsWidget outfits={this.props.outfits}/>
        </div>
      </div>
    );
  }

}

export default Related;
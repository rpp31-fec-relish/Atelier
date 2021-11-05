import React from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfits from './Outfits.jsx';

class Related extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    //console.log('relatedproducts mounted');
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
          <RelatedProducts product_id={this.props.currentProduct}/>
          <h4>Outfits</h4>
          <Outfits outfits={this.props.outfits}/>
        </div>
      </div>
    );
  }

}

export default Related;
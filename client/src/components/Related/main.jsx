import React from 'react';
import RelatedProducts from './RelatedProducts.jsx';

class Related extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product_id: '59553'
    }
  }

  componentDidMount() {
    console.log('relatedproducts mounted');
  }

  comparisonChart() {
    // compare product a to product b
    alert('click');
  }

  render() {
    return (
      <div>
        <header>
          <h2>Related Products</h2>
        </header>
        <ul id="related" style={{border: "1px solid black"}}>
          <RelatedProducts product_id={this.state.product_id}/>
        </ul>
      </div>
    );
  }

}

export default Related;
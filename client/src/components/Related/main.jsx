import React from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import Outfits from './Outfits.jsx';

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
        <ul id="related" style={{border: "1px solid black"}}>
          <RelatedProducts product_id={this.props.currentProduct}/>
          <Outfits />
        </ul>
      </div>
    );
  }

}

export default Related;
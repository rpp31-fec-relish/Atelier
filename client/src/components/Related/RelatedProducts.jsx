import React from 'react';

const RelatedProducts = (props) => {
  let product_id = props.product_id;

  return (
    <div id="related">
      <h4>Related Products</h4>
      <div id="related-products">
        <input type="image" alt="image"></input>
        <h6>Category</h6>
        <h6>Title</h6>
        <h6>Price</h6>
        <h6>Rating</h6>
      </div>
    </div>
  )

}

export default RelatedProducts;


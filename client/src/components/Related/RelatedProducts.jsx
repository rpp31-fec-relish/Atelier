import React from 'react';
import helperFunctions from './../../helperFunctions.js';

const RelatedProducts = (props) => {
  let product_id = props.product_id;
  console.log(product_id);

  let product = helperFunctions.getRelatedProductsById(product_id)
    .then(result => result.map(product => {
      console.log(product);
      let product_category = product.category;
      let product_name = product.name;
      let product_price = product.default_price;
      console.log(product_category);
      console.log(product_name);
      console.log(product_price);
      return ([product_category, product_name, product_price]);
    }))
    .then(data => console.log(data))
    .catch(err => console.log(err))

  let rating = helperFunctions.getReviewsById(product_id)
    .then(product => console.log(product))
    .catch(err => console.log(err))

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

  // return (
  //   <div id="product" key={product.id}>
  //     <div id="category">{product.category}</div>
  //     <div id="name">{product.name}</div>
  //     <div id="price">{product.price}</div>
  //     <div id="rating">3.5</div>
  //   </div>
  // )
}

export default RelatedProducts;
import React from 'react';

const RelatedProducts = (props) => {
  let product_id = props.product_id;
  // This gets the list of ids related to a specific product
  fetch(`./api/products/${product_id}/related`)
    .then(
      function(response) {
        response.json().then(function(related_ids) {
          //console.log(related_ids);
          related_ids.forEach(product => {
            // Add each product onto the main page
            fetch(`./api/products/${product}`)
              .then(
                function(response) {
                  response.json().then(function(product_info) {
                    //console.log(product_info); // category, default_price, name
                  })
                }
              )
              .catch(
                function(err) {
                  console.log('ERR: ', err);
                }
              )
          })
        })
      }
    )
    .catch(
      function(err) {
        console.log('ERR: ', err);
      }
    )

  return (
    <div class="product">
      <h4>Related Products</h4>
      <a href="#category">Category</a>
      <a href="#title">Title</a>
      <a href="#price">Price</a>
      <a href="#rating">Rating</a>
    </div>
  )

}

export default RelatedProducts;


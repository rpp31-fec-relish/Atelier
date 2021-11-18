import React from 'react';

const RelatedProduct = (props) => {
  let {id, name, category, price, image, assignImage, changeCurrentProduct} = props;

  return (
    <div id="RelatedProduct" onClick={() => changeCurrentProduct(id)}>
      <input id="RP-image" type="image" src={assignImage(image)} alt="image"></input>
      <div>{category}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div id="RP-rating">&#9733;&#9733;&#9733;&#9734;&#9734;</div>
    </div>
  )
}

export default RelatedProduct;
import React from 'react';

const RelatedProduct = (props) => {
  let {id, name, category, price, image, assignImage, changeCurrentProduct} = props;

  const openModal = () => {
    alert('open');
  }

  return (
    <div id="RelatedProduct">
      <div id="RP-star-modal" onClick={() => openModal()}>&#9734;</div>
      <input id="RP-image" type="image" src={assignImage(image)} onClick={() => changeCurrentProduct(id)} alt="image"></input>
      <div>{category}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div id="RP-rating">&#9733;&#9733;&#9733;&#9734;&#9734;</div>
    </div>
  )
}

export default RelatedProduct;
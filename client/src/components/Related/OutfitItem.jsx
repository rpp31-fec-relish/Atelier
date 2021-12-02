import React from 'react';

const OutfitItem = (props) => {
  let {id, name, category, price, image, assignImage, outfits, handleClick, addToOutfit, changeCurrentProduct} = props;

  return (
    <td id="OutfitItem">
      <div id={id} className="Outfit-star-modal" onClick={(e) => {handleClick(e); addToOutfit(id)}}>&#9746;</div>
      <input id="Outfit-image" type="image" alt="image" src={assignImage(image)} onClick={() => changeCurrentProduct(id)}></input>
      <div>{category}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div id="Outfit-rating">&#9733;&#9733;&#9733;&#9734;&#9734;</div>
    </td>
  )
};

export default OutfitItem;
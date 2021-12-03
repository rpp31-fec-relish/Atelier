import React from 'react';
import Stars from '../../../../node_modules/react-stars-display/';

const OutfitItem = (props) => {
  let {id, name, category, price, image, assignImage, outfits, addToOutfit, changeCurrentProduct, productRating, handleRemove} = props;

  return (
    <td id="OutfitItem">
      <div id={id} className="Outfit-x-button" onClick={(e) => {handleRemove(id)}}>&#9746;</div>
      <input id="Outfit-image" type="image" alt="image" src={assignImage(image)} onClick={() => changeCurrentProduct(id)}></input>
      <div>{category}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div id="Outfit-rating">
        <Stars stars={productRating ? productRating : 0}/>
      </div>
    </td>
  )
};

export default OutfitItem;
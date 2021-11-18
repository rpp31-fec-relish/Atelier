import React from 'react';

const OutfitItem = (props) => {
  let {id, name, category, price, image, assignImage, outfits} = props;

  if (outfits.length > 0) {
    return (
      <div id="OutfitItem">
        <input id="Outfit-image" type="image" alt="image" src={assignImage(image)}></input>
        <div>{category}</div>
        <div>{name}</div>
        <div>{price}</div>
        <div id="Outfit-rating">&#9733;&#9733;&#9733;&#9734;&#9734;</div>
      </div>
    )
  } else {
    return '';
  }
};

export default OutfitItem;
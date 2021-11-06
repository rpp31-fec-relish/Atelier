import React from 'react';

const OutfitItem = (props) => {
  if (props.outfits.length > 0) {
    return (
      <div id="OutfitItem">
        <input id="Outfit-image" type="image" alt="image" src={props.assignImage()}></input>
        <div>Category</div>
        <div>Name</div>
        <div>Price</div>
        <div id="Outfit-rating">&#9733;&#9733;&#9733;&#9734;&#9734;</div>
      </div>
    )
  } else {
    return '';
  }
};

export default OutfitItem;
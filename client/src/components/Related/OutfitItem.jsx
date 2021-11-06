import React from 'react';

const OutfitItem = (props) => {
  return (
    <div id="OutfitItem">
      <input id="Outfit-image" type="image" alt="image" src={props.assignImage()}></input>
      <div>Category</div>
      <div>Name</div>
      <div>Price</div>
      <div id="Outfit-rating">&#9733;&#9733;&#9733;&#9734;&#9734;</div>
    </div>
  )
};

export default OutfitItem;
import React from 'react';
import OutfitItem from './OutfitItem.jsx';
import helperFunctions from './../../helperFunctions.js';
import Carousel from './Carousel.jsx';

const OutfitsWidget = (props) => {
  let {outfitsData, assignImage, outfits, changeCurrentProduct, currentProduct, showModal, addToOutfit, productRating, updateOutfitsData} = props;

  const handleRemove = (id) => {
    updateOutfitsData(id);
    addToOutfit(id.toString());
  };

  const handleAddOrRemove = (e) => {
    e.preventDefault();
    if (outfits.includes(currentProduct)) {
      addToOutfit(currentProduct);
    } else {
      addToOutfit(currentProduct);
    }
  }

  return (
    <div id="OutfitsWidget">
      <Carousel
        outfitData={outfitsData}
        assignImage={assignImage}
        outfits={outfits}
        changeCurrentProduct={changeCurrentProduct}
        currentProduct={currentProduct}
        showModal={showModal}
        addToOutfit={addToOutfit}
        widget={'outfits'}
        productRating={productRating}
        handleRemove={handleRemove}
        handleAddOrRemove={handleAddOrRemove}/>
  </div>
  )
}

export default OutfitsWidget;
import React from 'react';
import OutfitItem from './OutfitItem.jsx';

const OutfitsWidget = (props) => {
  // go through global outfits array, get each item via helperfunction

  const AddToOutfits = () => {
    // if current product id isnt in outfits array, return 'Add to Outfits'; otherwise, return 'Remove from Outfits'
  }
  // if (props.outfits.length === 0) {
  //   return '';
  // } else {
    return (
      <section id="OutfitsWidget">
        <div id="OutfitItem">
          <div id="AddToOutfit">
            <h4>+{"\n"}Add To Outfit</h4>
          </div>
        </div>
        <OutfitItem assignImage={props.assignImage} outfits={props.outfits}/>
      </section>
    )
  // }
}

export default OutfitsWidget;
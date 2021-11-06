import React from 'react';
import OutfitItem from './OutfitItem.jsx';

const OutfitsWidget = (props) => {
  // go through global outfits array, get each item via helperfunction

  // if (props.outfits.length === 0) {
  //   return '';
  // } else {
    return (
      <section id="OutfitsWidget">
        <OutfitItem assignImage={props.assignImage}/>
      </section>
    )
  // }
}

export default OutfitsWidget;
import React from 'react';
import OutfitItem from './OutfitItem.jsx';

class OutfitsWidget extends React.Components {
  constructor(props) {
    super(props);
    this.state = {
      addToOutfit = true;
    }
  }
  // go through global outfits array, get each item via helperfunction

  const changeText = () => {
    if (props.outfits.includes(props.currentProduct)) {
      this.setState({!addToOutfit});
    }
  }

  const handleClick = (e) => {
    alert('click');
  }

  // if (props.outfits.length === 0) {
  //   return '';
  // } else {
    return (
      <section id="OutfitsWidget">
        <div id="OutfitItem">
          <div id="AddToOutfit">
            <h4 onClick={handleClick}>+</h4>
          </div>
        </div>
        <OutfitItem assignImage={props.assignImage} outfits={props.outfits}/>
      </section>
    )
  // }
}

export default OutfitsWidget;
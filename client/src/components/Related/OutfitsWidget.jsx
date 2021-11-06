import React from 'react';

const OutfitsWidget = (props) => {
  if (props.outfits.length === 0) {
    return '';
  } else {
    return (
      <section id="OutfitsWidget">
        <div id="OutfitItem">
          <p>
            <input type="image" alt="image"></input>
            <h6>Category</h6>
            <h6>Title</h6>
            <h6>Price</h6>
            <h6>Rating</h6>
          </p>
        </div>
        <div id="OutfitItem">
          <p>
            <input type="image" alt="image"></input>
            <h6>Category</h6>
            <h6>Title</h6>
            <h6>Price</h6>
            <h6>Rating</h6>
          </p>
        </div>
        <div id="OutfitItem">
          <p>
            <input type="image" alt="image"></input>
            <h6>Category</h6>
            <h6>Title</h6>
            <h6>Price</h6>
            <h6>Rating</h6>
          </p>
        </div>
        <div id="OutfitItem">
          <p>
            <input type="image" alt="image"></input>
            <h6>Category</h6>
            <h6>Title</h6>
            <h6>Price</h6>
            <h6>Rating</h6>
          </p>
        </div>
      </section>
    )
  }
}

export default OutfitsWidget;
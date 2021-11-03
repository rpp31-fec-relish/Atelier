import React from 'react';

const Outfits = (props) => {
  if (props.outfits.length === 0) {
    return (
      <div id="outfits">
        <h4>Outfits</h4>
        <div id="outfits-product"></div>
      </div>)
  } else {
    return (
      <div id="outfits">
        <h4>Outfits</h4>
        <div id="outfits-product">
          <input type="image" alt="image"></input>
          <h6>Category</h6>
          <h6>Title</h6>
          <h6>Price</h6>
          <h6>Rating</h6>
        </div>
      </div>
    )
  }
}

export default Outfits;
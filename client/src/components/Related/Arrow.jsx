import React from 'react';

const Arrow = ({ direction, handleClick, glyph, currentImageIndex }) => {
  if (currentImageIndex === 0 || currentImageIndex === 3) {
    glyph = '';
  }
  return (
    <div className={`slide-arrow ${direction}`} onClick={ handleClick }>{ glyph }
    </div>
  )
}

export default Arrow;
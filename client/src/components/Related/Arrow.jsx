import React from 'react';

const Arrow = ({ direction, handleClick, glyph, currentImageIndex, max }) => {
  if ((currentImageIndex === 0 && direction === 'left') || (direction === 'right' && currentImageIndex + 4 === max)) {
    glyph = ''
  }
  return (
    <div className={`slide-arrow ${direction}`} onClick={ handleClick }>{ glyph }
    </div>
  )
}

export default Arrow;
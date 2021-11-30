import React from 'react';

const Arrow = ({ direction, handleClick, glyph, relatedIndex, outfitIndex, max, widget }) => {
  if ((relatedIndex === 0 && direction === 'left') || (direction === 'right' && relatedIndex + 4 === max)) {
    glyph = ''
  }

  if ((outfitIndex === 0) || (direction === 'right' && outfitIndex < 4)) {
    glyph = ''
  }

  return (
    <div className={`slide-arrow ${direction}`} onClick={() => {handleClick(widget)} }>{ glyph }
    </div>
  )
}

export default Arrow;
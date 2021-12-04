import React from 'react';

const Arrow = ({ direction, handleClick, glyph, relatedIndex, outfitIndex, max, widget }) => {
  if ((relatedIndex === 0 && direction === 'left') || (direction === 'right' && relatedIndex + 4 === max)) {
    glyph = ''
  }

  if (max < 4 && direction === 'right' || outfitIndex === 0 && direction === 'left' || direction === 'right' && outfitIndex + 3 === max) {
    glyph = ''
  }

  return (
    <div id="Related-arrows" className={`slide-arrow ${direction}`} onClick={() => {handleClick(widget)} }>{ glyph }
    </div>
  )
}

export default Arrow;
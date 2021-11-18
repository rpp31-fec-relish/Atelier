import React from 'react';

const Arrow = ({ direction, handleClick, glyph }) => {
  return (
    <div className={`slide-arrow ${direction}`} onClick={ handleClick }>{ glyph }
    </div>
  )
}

export default Arrow;
import React from 'react';

const ImageSlider = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="carousel-item" style={styles}></div>
  )
}

export default ImageSlider;
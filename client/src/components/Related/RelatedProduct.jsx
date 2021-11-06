import React from 'react';

const RelatedProduct = (props) => {
  let {id, name, category, price, image} = props;

  const checkImage = (imageArray) => {
    //temporary placeholder image; --later--discuss global placeholder image
    let placeholderPhoto = 'https://lessonpix.com/drawings/1709614/380x380/Relish.png';

    if (imageArray) {
      console.log('IMAGE ARRAY FIRST ENTRY: ', imageArray[0]
      );
      if (imageArray[0].thumbnail_url) {
        return imageArray[0].thumbnail_url;
      } else {
        return placeholderPhoto;
      }
    } else {
      return placeholderPhoto;
    }
  }

  checkImage(image);

  return (
    <div id="RelatedProduct">
      <input id="RP-image" type="image" src={checkImage(image)} alt="image"></input>
      <h6>{category}</h6>
      <h6>{name}</h6>
      <h6>{price}</h6>
      <div id="RP-rating">&#9733;&#9733;&#9733;&#9734;&#9734;</div>
    </div>
  )
}

export default RelatedProduct;
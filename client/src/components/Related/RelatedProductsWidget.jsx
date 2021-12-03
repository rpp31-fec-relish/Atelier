import React from 'react';
import Carousel from './Carousel.jsx';

const RelatedProductsWidget = (props) => {
  let {relatedProductsData, assignImage, changeCurrentProduct, showModal, currentProduct} = props;

  return (
    <div id="RelatedProductsWidget">
      <Carousel data={relatedProductsData} assignImage={assignImage} changeCurrentProduct={changeCurrentProduct} showModal={showModal} widget={'related'}/>
    </div>
  )
}

export default RelatedProductsWidget;
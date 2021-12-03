import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/main.jsx';
import QandA from './components/QandA/main.jsx';
import Related from './components/Related/main.jsx';
import Reviews from './components/Reviews/main.jsx';
import helperFunctions from './helperFunctions.js';

const Default_Product = 59553

function App(props) {
  const [currentProductInfo, setCurrentProductInfo] = useState({
    productNumber: null,
    productData: {},
    productStyles: []
  });
  const [outfits, setOutfits] = useState([]);
  const [productRating, setProductRating] = useState(0);

  const changeCurrentProduct = (productId) =>  {
    window.history.replaceState(null, `${productId}`, `/${productId}`);

    let APIcalls = [];
    APIcalls.push(helperFunctions.getProductById(productId));
    APIcalls.push(helperFunctions.getProductStylesById(productId));
    Promise.all(APIcalls)
      .then(results => {
        setCurrentProductInfo({
          productNumber: productId,
          productData: results[0],
          productStyles: results[1]
        })
      })
      .catch((error) => console.error(error));
  }

  const addToOutfit = (productId) => {
    let index = outfits.indexOf(productId);
    if (index > -1) {
      // Removes productId in outfits if it exists
      let newOutfitsData = [...outfits];
      newOutfitsData.splice(index, 1);
      setOutfits(newOutfitsData);
    } else {
      setOutfits([...outfits, productId]);
    }
  }

  useEffect(() => {
    if (window.location.pathname != '/'
      && !isNaN(Number(window.location.pathname.substring(1, 6)))
      && Number(window.location.pathname.substring(1, 6)) != currentProductInfo.productNumber) {
        // if current URL has a productId, update currentProduct
        console.log(`${window.location.pathname.substring(1, 6)} != ${currentProductInfo.productNumber}`);
        changeCurrentProduct(window.location.pathname.substring(1, 6));
    } else if (window.location.pathname === '/' && currentProductInfo.productNumber != null) {
      // if the URL path is /, set the URL to the currentProduct
      window.history.replaceState(null, `${currentProductInfo.productNumber}`, `/${currentProductInfo.productNumber}`);
    } else if (window.location.pathname === '/'){
      changeCurrentProduct(59553);
      window.history.replaceState(null, '59553', '/59553');
    }
  });

  if (currentProductInfo.productNumber === null) {
    return null;
  }

  return (
    <div>
      <h1 id='title'>ATELIER</h1>
      <Overview
        currentProduct={currentProductInfo.productNumber}
        addToOutfit={addToOutfit.bind(this)}
        currentProductData={currentProductInfo.productData}
        currentProductStyles={currentProductInfo.productStyles}
        productRating={productRating}/>
      <Related
        currentProduct={currentProductInfo.productNumber}
        outfits={outfits}
        addToOutfit={addToOutfit}
        changeCurrentProduct={changeCurrentProduct}
        productRating={productRating}
        currentProductData={currentProductInfo.productData}/>
      <QandA
        currentProduct={currentProductInfo.productNumber}
        currentProductData={currentProductInfo.productData}
        currentProductStyles={currentProductInfo.productStyles}/>
      <Reviews
        currentProduct={currentProductInfo.productNumber}
        currentProductData={currentProductInfo.productData}
        currentProductStyles={currentProductInfo.productStyles}
        setCurrentProductRating={setProductRating.bind(this)}/>
    </div>
  );

}

ReactDOM.render(<App />, document.getElementById('app'));


//
// Code for logging user interactions
//
let OverviewNode = document.getElementById('Overview');
let QANode = document.getElementById('QandAContainer');
let RelatedNode = document.getElementById('RelatedProductsAndOutfits');
let ReviewsNode = document.getElementById('ReviewsWidget');

document.addEventListener('mousedown', (event) => {

  let OverviewNode = document.getElementById('Overview');
  let QANode = document.getElementById('QandAContainer');
  let RelatedNode = document.getElementById('RelatedProductsAndOutfits');
  let ReviewsNode = document.getElementById('ReviewsWidget');

  let clickedWidget = null;
  if (OverviewNode.contains(event.target)) {
    clickedWidget = 'Overview';
  } else if (QANode.contains(event.target)) {
    clickedWidget = 'Q&A';
  } else if (RelatedNode.contains(event.target)) {
    clickedWidget = 'RelatedProductsAndOutfits';
  } else if (ReviewsNode.contains(event.target)) {
    clickedWidget = 'Reviews';
  }
  helperFunctions.postInteraction({
    element: event.target.outerHTML.toString(),
    widget: clickedWidget,
    time: Date.now().toString()
  });
});
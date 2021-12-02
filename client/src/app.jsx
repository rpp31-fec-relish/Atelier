import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/main.jsx';
import QandA from './components/QandA/main.jsx';
import Related from './components/Related/main.jsx';
import Reviews from './components/Reviews/main.jsx';
import helperFunctions from './helperFunctions.js';

function App(props) {
  const [currentProduct, setCurrentProduct] = useState(59553);
  const [outfits, setOutfits] = useState([]);
  const [currentProductData, setCurrentProductData] = useState([]);
  const [currentProductStyles, setCurrentProductStyles] = useState([]);

  const changeCurrentProduct = (productId) =>  {
    console.log(productId);
    window.history.replaceState(null, `${productId}`, `/${productId}`);
    setCurrentProduct(productId);
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
      && Number(window.location.pathname.substring(1, 6)) != currentProduct) {
        // if current URL has a productId, update currentProduct
        console.log(`${window.location.pathname.substring(1, 6)} != ${currentProduct}`);
        setCurrentProduct(Number(window.location.pathname.substring(1, 6)));
    } else if (window.location.pathname === '/') {
      // if the URL path is /, set the URL to the currentProduct
      window.history.replaceState(null, `${currentProduct}`, `/${currentProduct}`);
    }
  });

  useEffect(() => {
    helperFunctions.getProductById(currentProduct)
      .then((product) => {
        return helperFunctions.getProductStylesById(currentProduct)
          .then((productStyles) => {
            setCurrentProductData(product);
            setCurrentProductStyles(productStyles);
          })
      })
      .catch((error) => console.error(error));
  }, [currentProduct]);

  return (
    <div>
      <h1>ATELIER</h1>
      <Overview currentProduct={currentProduct} addToOutfit={addToOutfit.bind(this)} />
      <Related currentProduct={currentProduct} outfits={outfits} addToOutfit={addToOutfit} changeCurrentProduct={changeCurrentProduct} currentProductData={currentProductData}/>
      <QandA currentProduct={currentProduct} currentProductData={currentProductData} currentProductStyles={currentProductStyles}/>
      <Reviews currentProduct={currentProduct} currentProductData={currentProductData} currentProductStyles={currentProductStyles}/>
    </div>
  );

}

ReactDOM.render(<App />, document.getElementById('app'));
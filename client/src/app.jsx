import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/main.jsx';
import QandA from './components/QandA/main.jsx';
import Related from './components/Related/main.jsx';
import Reviews from './components/Reviews/main.jsx';

function App(props) {
  const [currentProduct, setCurrentProduct] = useState(59553);
  const [outfits, setOutfits] = useState([]);

  const changeCurrentProduct = (productId) =>  {
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

  return (
    <div>
      <h1>ATELIER</h1>
      <Overview currentProduct={currentProduct} addToOutfit={addToOutfit}/>
      <Related currentProduct={currentProduct} outfits={outfits} addToOutfit={addToOutfit} changeCurrentProduct={changeCurrentProduct}/>
      <QandA currentProduct={currentProduct}/>
      <Reviews currentProduct={currentProduct}/>
    </div>
  );

}

ReactDOM.render(<App />, document.getElementById('app'));
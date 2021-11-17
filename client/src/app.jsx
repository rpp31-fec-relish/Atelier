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
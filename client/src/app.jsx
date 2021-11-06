import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview/main.jsx';
import QandA from './components/QandA/main.jsx';
import Related from './components/Related/main.jsx';
import Reviews from './components/Reviews/main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: 59553,
      outfits: []
    };

    this.addToOutfit = this.addToOutfit.bind(this);
  }

  addToOutfit(productId) {
    let index = this.state.outfits.indexOf(productId);
    if (index > -1) {
      // Removes productId in outfits if it exists
      let newOutfitsData = [...this.state.outfits].splice(index, 1);
      this.setState({outfits: newOutfitsData});
      console.log('Outfit removed');
    } else {
      this.setState({outfits: [...this.state.outfits, productId]});
      console.log('Outfit added');
    }
  }

  render() {
    return (
      <div>
        <Overview currentProduct={this.state.currentProduct} addToOutfit={this.addToOutfit}/>
        <Related currentProduct={this.state.currentProduct} outfits={this.state.outfits} addToOutfit={this.addToOutfit}/>
        <h1>ATELIER</h1>
        <Overview currentProduct={this.state.currentProduct}/>
        <Related currentProduct={this.state.currentProduct} outfits={this.state.outfits}/>
        <QandA currentProduct={this.state.currentProduct}/>
        <Reviews currentProduct={this.state.currentProduct}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
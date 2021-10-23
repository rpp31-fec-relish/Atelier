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
      currentProduct: null,
    };
  }

  render() {
    return (
    <div>
      <h1>HELLO WORLD</h1>
      <Overview currentProduct={this.state.currentProduct}/>
      <Related currentProduct={this.state.currentProduct}/>
      <QandA currentProduct={this.state.currentProduct}/>
      <Reviews currentProduct={this.state.currentProduct}/>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
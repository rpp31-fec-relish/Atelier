import React from 'react';
import OutfitItem from './OutfitItem.jsx';

class OutfitsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addToOutfit: true
    }
    this.handleClick = this.handleClick.bind(this);
  }
  // go through global outfits array, get each item via helperfunction

  // const changeText = () => {
  //   if (props.outfits.includes(props.currentProduct)) {
  //     this.setState({!addToOutfit});
  //   }
  // }

  handleClick(e) {
    alert('click');
  }

  // if (props.outfits.length === 0) {
  //   return '';
  // } else {

  render() {
    return (
      <section id="OutfitsWidget">
        <div id="OutfitItem">
          <div id="AddToOutfit">
            <h4 onClick={this.handleClick}>+</h4>
          </div>
        </div>
        <OutfitItem assignImage={this.props.assignImage} outfits={this.props.outfits}/>
      </section>
    )
  }
}

export default OutfitsWidget;
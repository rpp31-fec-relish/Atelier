import React from 'react';
import OutfitItem from './OutfitItem.jsx';

class OutfitsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleTextChange() {
    if (this.props.outfits.includes(this.props.currentProduct)) {
      return 'REMOVE FROM OUTFIT';
    } else {
      return 'ADD TO OUTFIT';
    }
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e.target.text);
    if (e.target.text.includes('ADD')) {
      console.log('add current product to outfits');
    } else {
      console.log('remove current product from outfits')
    }
  }

  // if (props.outfits.length === 0) {
  //   return '';
  // } else {

  render() {
    return (
      <section id="OutfitsWidget">
        <div id="OutfitItem">
          <div id="addToOutfit">
            <a href='#add-outfit' id="OutfitText" onClick={this.handleClick}>+ {this.handleTextChange()}</a>
          </div>
        </div>
        <OutfitItem assignImage={this.props.assignImage} outfits={this.props.outfits}/>
      </section>
    )
  }
}

export default OutfitsWidget;
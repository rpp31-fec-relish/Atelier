import React from 'react';
import OutfitItem from './OutfitItem.jsx';

class OutfitsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // removes or adds
  // this.props.addToOutfit( -productid- )

  handleTextChange() {
    if (this.props.outfits.includes(this.props.currentProduct)) {
      return 'REMOVE FROM OUTFIT';
    } else {
      return 'ADD TO OUTFIT';
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addToOutfit(this.props.currentProduct);
  }

  // if (props.outfits.length === 0) {
  //   return '';
  // } else {

  render() {
    return (
      <section id="OutfitsWidget">
        <div id="OutfitItem">
          <div id="addToOutfit">
            <a href='#add-outfit' id="OutfitText" onClick={(e) => {this.handleClick(e)}}>+ {this.handleTextChange()}</a>
          </div>
        </div>
        <OutfitItem assignImage={this.props.assignImage} outfits={this.props.outfits}/>
      </section>
    )
  }
}

export default OutfitsWidget;
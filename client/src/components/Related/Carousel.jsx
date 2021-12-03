import React from 'react';
import Arrow from './Arrow.jsx';
import RelatedProduct from './RelatedProduct.jsx';
import OutfitItem from './OutfitItem.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedIndex: 0,
      outfitIndex: 0
    };

    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.indexSet = this.indexSet.bind(this);
  }

  previousSlide(widget) {
    if (widget === 'related') {
      if (this.state.relatedIndex !== 0) {
        const index = this.state.relatedIndex - 1;
        this.setState({
          relatedIndex: index
        })
      }
    } else if (widget === 'outfits') {
      if (this.state.outfitIndex !== 0) {
        const index = this.state.outfitIndex - 1;
        this.setState({
          outfitIndex: index
        })
      }
    }
  }

  nextSlide(widget) {
    if (widget === 'related') {
      if (this.state.relatedIndex !== 4) {
        const index = this.state.relatedIndex + 1;
        this.setState({
          relatedIndex: index
        });
      }
    } else if (widget === 'outfits') {
      if (this.state.outfitIndex !== 3) {
        const index = this.state.outfitIndex + 1;
        this.setState({
          outfitIndex: index
        });
      }
    }
  }

  indexSet(index, widget) {
    if (widget === 'related') {
      let maxIndex = this.state.relatedIndex + index;
      return maxIndex;
    } else if (widget === 'outfits') {
      let maxIndex = this.state.outfitIndex + index;
      return maxIndex;
    }
  }

  render() {
    if (this.props.widget === 'related') {
      return (
        <div className='RP-carousel'>
          <div className='RP-arrow'>
            <Arrow
              direction='left'
              handleClick={ this.previousSlide }
              glyph='&#9664;'
              relatedIndex={this.state.relatedIndex}
              max={this.props.data.length}
              widget={this.props.widget}
            />
          </div>
          <table>
            <tbody>
              <tr>
                {this.props.data.slice(this.state.relatedIndex, this.indexSet(4, this.props.widget)).map((item) => <RelatedProduct
                  key={'relatedProduct_' + item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  image={item.image}
                  assignImage={this.props.assignImage}
                  changeCurrentProduct={this.props.changeCurrentProduct}
                  showModal={this.props.showModal}
                />)}
              </tr>
            </tbody>
          </table>
          <div className='RP-arrow'>
            <Arrow
            direction='right'
            handleClick={ this.nextSlide }
            glyph='&#9654;'
            relatedIndex={this.state.relatedIndex}
            max={this.props.data.length}
            widget={this.props.widget}
            />
          </div>
        </div>
      )
    } else if (this.props.widget === 'outfits') {
      return (
        <div className='Outfits-carousel'>
          <div className='RP-arrow'>
            <Arrow
              direction='left'
              handleClick={ this.previousSlide }
              glyph='&#9664;'
              outfitIndex={this.state.outfitIndex}
              max={this.props.outfitData.length}
              widget={this.props.widget}
            />
          </div>
          <table>
            <tbody>
              <tr>
                <td className='Outfit-add-remove'>
                  <div onClick={(e) => {this.props.handleClick(e)}}>{this.props.handleTextChange()}</div>
                </td>
                {this.props.outfitData.slice(this.state.outfitIndex, this.indexSet(3, this.props.widget)).map((outfit) => <OutfitItem
                  key={'outfit_' + outfit.id}
                  id={outfit.id}
                  name={outfit.name}
                  category={outfit.category}
                  price={outfit.price}
                  image={outfit.image}
                  removeOutfit={this.props.removeOutfit}
                  assignImage={this.props.assignImage}
                  handleClick={this.props.handleClick}
                  addToOutfit={this.props.addToOutfit}
                  changeCurrentProduct={this.props.changeCurrentProduct}
                  productRating={this.props.productRating}
                />)}
              </tr>
            </tbody>
          </table>
          <div className='RP-arrow'>
            <Arrow
              direction='right'
              handleClick={ this.nextSlide }
              glyph='&#9654;'
              outfitIndex={this.state.outfitIndex}
              max={this.props.outfitData.length}
              widget={this.props.widget}
            />
          </div>
          {/* <div className="Outfit-add-remove">
            <div onClick={(e) => {this.props.handleClick(e)}}>{this.props.handleTextChange()}</div>
          </div>
          {this.props.outfitData.slice(this.state.outfitIndex, this.indexSet(3, this.props.widget)).map((outfit) => <OutfitItem
            key={'outfit_' + outfit.id}
            id={outfit.id}
            name={outfit.name}
            category={outfit.category}
            price={outfit.price}
            image={outfit.image}
            removeOutfit={this.props.removeOutfit}
            assignImage={this.props.assignImage}
            handleClick={this.props.handleClick}
            addToOutfit={this.props.addToOutfit}
            changeCurrentProduct={this.props.changeCurrentProduct}/>)}
          <Arrow
            direction='right'
            handleClick={ this.nextSlide }
            glyph='&#9654;'
            outfitIndex={this.state.outfitIndex}
            max={this.props.outfitData.length}
            widget={this.props.widget}/>
        </div> */}
        </div>
      )
    }
  }
}

export default Carousel;
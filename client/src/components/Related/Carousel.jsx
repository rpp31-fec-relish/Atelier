import React from 'react';
import Arrow from './Arrow.jsx';
import RelatedProduct from './RelatedProduct.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0
    };

    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.indexSet = this.indexSet.bind(this);
  }

  previousSlide() {
    if (this.state.currentImageIndex !== 0) {
      const index = this.state.currentImageIndex - 1;
      this.setState({
        currentImageIndex: index
      })
    }
  }

  nextSlide() {
    if (this.state.currentImageIndex !== 4) {
      const index = this.state.currentImageIndex + 1;
      this.setState({
        currentImageIndex: index
      })
    }
  }

  indexSet() {
    if (this.props.data[3] !== undefined) {
      return 4;
    } else if (this.props.data[2] !== undefined) {
      return 3;
    } else if (this.props.data[1] !== undefined) {
      return 2;
    } else {
      return 1;
    }
  }

  render() {
    return (
      <div className='carousel'>
        <Arrow
          direction='left'
          handleClick={ this.previousSlide }
          glyph='&#9664;'
          currentImageIndex={this.state.currentImageIndex} />
        {this.props.data.slice(this.state.currentImageIndex, this.indexSet()).map((item) => <RelatedProduct key={'relatedProduct_' + item.id} id={item.id} name={item.name} category={item.category} price={item.price} image={item.image} assignImage={this.props.assignImage} changeCurrentProduct={this.props.changeCurrentProduct} showModal={this.props.showModal}/>)}
        <Arrow
          direction='right'
          handleClick={ this.nextSlide }
          glyph='&#9654;' />
      </div>
    )
  }
}

export default Carousel;
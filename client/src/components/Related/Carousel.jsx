import React from 'react';
import ImageSlider from './ImageSlider.jsx';
import Arrow from './Arrow.jsx';
import RelatedProduct from './RelatedProduct.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      imageData: []
    };

    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.props.data.forEach(item => {
        let imageArray = item.image;
        let imageUrl = this.props.assignImage(imageArray);
        this.setState([...this.state.imageData, imageUrl])
      })
    }
  }

  previousSlide() {
    const lastIndex = this.state.imageData.length - 1;
    const { currentImageIndex } = this.state.currentImageIndex;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      currentImageIndex: index
    });
  }

  nextSlide() {
    const lastIndex = this.state.imageData.length - 1;
    const { currentImageIndex } = this.state.currentImageIndex;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  }

  render() {
    return (
      <div className='carousel'>
        <Arrow
          direction='left'
          handleClick={ this.previousSlide }
          glyph='&#9664;' />
        {/* <ImageSlider url={ this.state.imageData[this.state.currentImageIndex] } /> */}
        {this.props.data.map((item) => <RelatedProduct key={'relatedProduct_' + item.id} id={item.id} name={item.name} category={item.category} price={item.price} image={item.image} assignImage={this.props.assignImage} changeCurrentProduct={this.props.changeCurrentProduct}/>)}
        <Arrow
          direction='right'
          handleClick={ this.nextSlide }
          glyph='&#9654;' />
      </div>
    )
  }
}

export default Carousel;
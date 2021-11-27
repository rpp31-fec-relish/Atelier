import React from 'react';
import helperFunctions from './../../helperFunctions.js';
import RelatedProduct from './RelatedProduct.jsx';
import Carousel from './Carousel.jsx';

class RelatedProductsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsId: [],
      relatedProductsData: []
    }
  }

  componentDidMount() {
    let currentProduct = this.props.currentProduct;
    let newData = [];

    helperFunctions.getRelatedProductsById(currentProduct)
      .then(products => {
        for (var i = 0; i < products.length; i++) {
          let data = {
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            price: products[i].default_price,
            features: products[i].features,
            image: null
          }
          if (!this.state.relatedProductsId.includes(products[i].id)) {
            this.setState({ relatedProductsId: [...this.state.relatedProductsId, products[i].id] })
            newData.push(data);
          }
        }
        return newData;
      })
    .then(results => {
      results.forEach(product => {
        helperFunctions.getProductStylesById(product.id)
          .then(productStyle => {
            if (productStyle.length > 0) {
              for (var i = 0; i < results.length; i++) {
                if (results[i].id === product.id) {
                  results[i].image = productStyle[0].photos;
                }
              }
            } else {
              console.error('No product styles');
            }
            return results;
          })
          .then(relevantData => {
            this.setState({relatedProductsData: relevantData});
          })
          .catch(err => console.error(err));
      })
    })
    .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentProduct !== this.props.currentProduct) {
      this.setState({ relatedProductsId: [] })
      this.componentDidMount();
    }
  }

  render() {
    return (
      <div id="RelatedProductsWidget">
        {/* {this.state.relatedProductsData.map((item) => <RelatedProduct key={'relatedProduct_' + item.id} id={item.id} name={item.name} category={item.category} price={item.price} image={item.image} assignImage={this.props.assignImage} changeCurrentProduct={this.props.changeCurrentProduct}/>)} */}
        <Carousel data={this.state.relatedProductsData} assignImage={this.props.assignImage}/>
      </div>
    )
  }
}

export default RelatedProductsWidget;
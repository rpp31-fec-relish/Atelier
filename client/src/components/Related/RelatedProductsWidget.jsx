import React from 'react';
import helperFunctions from './../../helperFunctions.js';
import RelatedProduct from './RelatedProduct.jsx';

class RelatedProductsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: []
    }
  }

  componentDidMount() {
    let currentProduct = this.props.currentProduct;

    helperFunctions.getRelatedProductsById(currentProduct)
      .then(products => {
        let newData = [];
        for (var i = 0; i < products.length; i++) {
          newData.push([products[i].id, products[i].name, products[i].category, products[i].default_price, products[i].features]);
        }
        if (newData.length === products.length) {
          return newData;
        }
      })
      .then(results => {
        results.forEach(product => {
          helperFunctions.getProductStylesById(product[0])
            .then(productStyle => {
              if (productStyle.length > 0) {
                product.push(productStyle[0].photos);
              } else {
                console.error('No product styles');
              }
              return results;
            })
            .then(relevantData => {
              this.setState({relatedProducts: relevantData})
            })
            .catch(err => console.error(err));
        })
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentProduct !== this.props.currentProduct) {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <section id="RelatedProductsWidget">
        {this.state.relatedProducts.map((item) => <RelatedProduct key={'relatedProduct_' + item[0]} id={item[0]} name={item[1]} category={item[2]} price={item[3]} image={item[5]} assignImage={this.props.assignImage} changeCurrentProduct={this.props.changeCurrentProduct}/>)}
      </section>
    )
  }
}

export default RelatedProductsWidget;
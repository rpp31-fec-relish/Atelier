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
    // gets the related products array based on the current product
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
              // for now, just get the photos of the first style/listing
              if (productStyle.length > 0) {
                product.push(productStyle[0].photos);
              } else {
                console.error('No product styles');
              }
              // --later--consider what to do when the photo doesn't exist (`null`)
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

  render() {
    console.log(this.state.relatedProducts);
    return (
      <section id="RelatedProductsWidget">
        {this.state.relatedProducts.map((item) => <RelatedProduct key={'relatedProduct_' + item[0]} id={item[0]} name={item[1]} category={item[2]} price={item[3]} image={item[5]}/>)}
      </section>
    )
  }
}

export default RelatedProductsWidget;
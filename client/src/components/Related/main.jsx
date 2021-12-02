import React from 'react';
import RelatedProductsWidget from './RelatedProductsWidget.jsx';
import OutfitsWidget from './OutfitsWidget.jsx';
import helperFunctions from '../../helperFunctions.js';
import Modal from './Modal.jsx';

class Related extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      relatedProductFeatures: [],
      relatedProductsId: [],
      relatedProductsData: [],
      singleRelatedProductFeature: [],
      allStyles: []
    }

    this.assignImage = this.assignImage.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    let newData = [];
    let relatedFeatures = [];

    helperFunctions.getRelatedProductsById(this.props.currentProduct)
      .then(products => {
        for (var i = 0; i < products.length; i++) {
          let data = {
            id: products[i].id,
            name: products[i].name,
            category: products[i].category,
            price: products[i].default_price,
            image: null
          }
          let relatedData = {
            id: products[i].id,
            name: products[i].name,
            features: products[i].features
          }
          if (!this.state.relatedProductsId.includes(products[i].id)) {
            this.setState({ relatedProductsId: [...this.state.relatedProductsId, products[i].id] })
            newData.push(data);
            relatedFeatures.push(relatedData);
          }
        }

        this.setState({relatedProductFeatures: relatedFeatures});
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

  assignImage(imageArray) {
    const PlaceholderPhoto = './images/missingImage.svg';

    if (imageArray) {
      if (imageArray[0].thumbnail_url) {
        return imageArray[0].thumbnail_url;
      } else {
        return PlaceholderPhoto;
      }
    }
    return PlaceholderPhoto;
  }

  showModal(e) {
    if (e.target.id) {
      let comparisonFeature = [];
      let uniqueStyles = [];
      let relatedFeatures = this.state.relatedProductFeatures;
      let currentFeatures = this.props.currentProductData.features;

      for (var i = 0; i < relatedFeatures.length; i++) {
        if (relatedFeatures[i].id === parseInt(e.target.id)) {
          let newFeatures = {
            feature: relatedFeatures[i].features,
            name: relatedFeatures[i].name
          }
          comparisonFeature.push(newFeatures);
        }
      }

      for (var i = 0; i < currentFeatures.length; i++) {
        // also space before every capital if there isnt one already
        if (currentFeatures[i].value == null) {
          currentFeatures[i].value = ''
        }
        if (currentFeatures[i].feature == null) {
          currentFeatures[i].feature = ''
        }
        let currentCharacteristic = `${currentFeatures[i].value} ${currentFeatures[i].feature}`.replace(/([A-Z])/g, ' $1').trim();
        let modalEntry = {
          current: true,
          characteristic: [currentCharacteristic],
          compare: false
        }
        uniqueStyles.push(modalEntry);
      }

      if (comparisonFeature[0]) {
        comparisonFeature[0].feature.forEach(feature => {
          if (feature.value == null) {
            feature.value = ''
          }
          if (feature.feature == null) {
            feature.feature = ''
          }
          let comparisonFeature = `${feature.value} ${feature.feature}`.replace(/([A-Z])/g, ' $1').trim();
          for (var i = 0; i < uniqueStyles.length; i++) {
            if (uniqueStyles[i].characteristic == comparisonFeature) {
              uniqueStyles[i].compare = true;
              break;
            } else if (i+1 === uniqueStyles.length) {
              let modalEntry = {
                current: false,
                characteristic: [comparisonFeature],
                compare: true
              }
              uniqueStyles.push(modalEntry);
            }
          }
        })
      }

      for (var i = 0; i < uniqueStyles.length; i++) {
        uniqueStyles[i].key = i;
      }

      this.setState({ allStyles: uniqueStyles });
      this.setState({ singleRelatedProductFeature: comparisonFeature })
    }
    this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div>
        <Modal
          onClose={this.showModal}
          show={this.state.show}
          currentProductData={this.props.currentProductData}
          singleRelatedProductFeature={this.state.singleRelatedProductFeature}
          allStyles={this.state.allStyles}></Modal>
        <div id="RelatedProductsAndOutfits">
          <h4>RELATED PRODUCTS</h4>
          <RelatedProductsWidget
            currentProduct={this.props.currentProduct}
            assignImage={this.assignImage}
            changeCurrentProduct={this.props.changeCurrentProduct}
            showModal={this.showModal}
            setRelatedProductFeatures={this.setRelatedProductFeatures}
            relatedProductsData={this.state.relatedProductsData}/>
          <h4>YOUR OUTFITS</h4>
          <OutfitsWidget
            currentProduct={this.props.currentProduct}
            outfits={this.props.outfits}
            assignImage={this.assignImage}
            addToOutfit={this.props.addToOutfit}
            changeCurrentProduct={this.props.changeCurrentProduct}
            showModal={this.showModal}
            currentProductData={this.props.currentProductData}/>
        </div>
      </div>
    );
  }

}

export default Related;
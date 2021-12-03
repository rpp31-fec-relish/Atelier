import React from 'react';
import helperFunctions from './../../helperFunctions.js';
import Stars from '../../../../node_modules/react-stars-display/';

class RelatedProduct extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ratingAverage: 0
    }

    this.weightedAverage = this.weightedAverage.bind(this)
  }

  weightedAverage = (ratings) => {
    let total = 0;
    let totalWeight = 0;
    for (const [key, weight] of Object.entries(ratings)) {
      total += (key * parseInt(weight));
      totalWeight += parseInt(weight);
    }

    total = Math.round((total / totalWeight) * 10) / 10;
    return total;
  }

  componentDidMount() {
    helperFunctions.getReviewsMetaById(this.props.id)
    .then((metaData)  => {
      let ratings = metaData.ratings;
      let avg = this.weightedAverage(ratings);
      this.setState({ratingAverage: avg})
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <td id="RelatedProduct">
        <div className="RP-star-modal" id={this.props.id} onClick={(e) => this.props.showModal(e)}>&#9734;</div>
        <input id="RP-image" type="image" src={this.props.assignImage(this.props.image)} onClick={() => this.props.changeCurrentProduct(this.props.id)} alt="image"></input>
        <div>{this.props.category}</div>
        <div>{this.props.name}</div>
        <div>{this.props.price}</div>
        <div id="RP-rating">
          <Stars stars={this.state.ratingAverage ? this.state.ratingAverage : 0}/>
        </div>
      </td>
    )
  }
}

export default RelatedProduct;
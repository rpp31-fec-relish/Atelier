import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

class ReviewMeta extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ratings: {},
      characteristics: {},
      recommended: {}
    }
  }

  componentDidMount() {
    console.log(this.props.currentProduct)
    let currentProduct = this.props.currentProduct;
    helperFunctions.getReviewsMetaById(currentProduct)
    .then((metaData)  => {
      console.log('metaData: ', metaData);
      this.setState({
        ratings: metaData.ratings,
        characteristics: metaData.characteristics,
        recommended: metaData.recommended
      })
    })
    .catch((err) => {
      console.error('Error setting state of reviewMetaData', err)
    })
  }

  render() {
    return (
      <div className="reviewMeta">
        <div /*will use an agregate of the ratings, will discuss with pair, may potnetially put in helper functions for global access*//>
        <div>Characteristics:</div>
        {Object.keys(this.state.characteristics).map((trait) => <div key={this.state.characteristics[trait].id}>{trait}: {this.state.characteristics[trait].value}</div>)}
        <div>Recomended: </div>
        <div>True: {this.state.recommended.true}</div>
        <div>False: {this.state.recommended.false}</div>
        <div> Poduct Ratings: </div>
        {Object.keys(this.state.ratings).map((rating) => <div key={rating}>{rating}: {this.state.ratings[rating]}</div>)}
      </div>
    )
  }
}

export default ReviewMeta;

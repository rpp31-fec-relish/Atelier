import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';

class ReviewMeta extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ratings: {},
      characteristics: {},
      recommended: {},
      ratingAverage: 0
    }
    this.logingFunction = this.logingFunction.bind(this)
    this.weightedAverage = this.weightedAverage.bind(this)
  }

  componentDidMount() {
    console.log(this.props.currentProduct)
    let currentProduct = this.props.currentProduct;
    helperFunctions.getReviewsMetaById(currentProduct)
    .then((metaData)  => {
      console.log('metaData: ', metaData);

      let ratings = metaData.ratings
      let avg = this.weightedAverage(ratings);

      this.setState({
        ratings: ratings,
        characteristics: metaData.characteristics,
        recommended: metaData.recommended,
        ratingAverage: avg
      })
      console.log(ratings);

    })
    .catch((err) => {
      console.error('Error setting state of reviewMetaData', err)
    })
  }

  logingFunction() {
    console.log('ratings in functions: ', this.state.ratingAverage)

    console.log('ratings: ', this.state.ratings)
  }



  weightedAverage(ratings) {
    let result = (ratings[5] * 5 + ratings[4] * 4 + ratings[3] * 3 + ratings[2] * 2 + ratings[1] * 1) / ((ratings[5] * 1 + ratings[4] * 1 + ratings[3] * 1 + ratings[2] * 1 + ratings[1] * 1))

    console.log('this should be result: ', result)

    return result;
  }



  render() {
    return (
      <div className="reviewMeta">
        <h2>Product Information</h2>
        <div> {Math.round(this.state.ratingAverage * 10)/10}
        <Stars className="reviewMetaScore" stars={Math.round(this.state.ratingAverage * 10)/10}/>
        </div>
        <div>Rating Breakdown</div>
        {Object.keys(this.state.characteristics).map((trait) => <div key={this.state.characteristics[trait].id}>{trait}: {Math.round(this.state.characteristics[trait].value * 10)/10}</div>)}
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

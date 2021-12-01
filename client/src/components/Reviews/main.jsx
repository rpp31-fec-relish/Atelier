import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewMeta from './ReviewMeta.jsx';
import CreateReview from './CreateReview.jsx';
import helperFunctions from '../../helperFunctions';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewsArr: [],
      reviewCount: 2,
      displayCreateReview: false,
      ratings: {},
      characteristics: {},
      recommended: {},
      ratingAverage: 0
    }
    this.handleClickOne = this.handleClickOne.bind(this);
    this.handleClickTwo = this.handleClickTwo.bind(this);
    this.weightedAverage = this.weightedAverage.bind(this)
  }


  componentDidMount(){
    console.log('reviews mounted');
    let currentProduct = this.props.currentProduct;
    helperFunctions.getReviewsById(currentProduct)
    .then((reviews) => {
      this.setState({
        reviewsArr:reviews
      })
    })
    .catch((err) => {
      console.error('Error setting state of reviews', err)
    })

    helperFunctions.getReviewsMetaById(currentProduct)
    .then((metaData)  => {
      let ratings = metaData.ratings
      let avg = this.weightedAverage(ratings);
      console.log('metadata: ', metaData)

      this.setState({
        ratings: ratings,
        characteristics: metaData.characteristics,
        recommended: metaData.recommended,
        ratingAverage: avg
      })
    })
    .catch((err) => {
      console.error('Error setting state of reviewMetaData', err)
    })
  }


  componentDidUpdate(prevProps) {
    if (prevProps.currentProduct !== this.props.currentProduct) {
      this.componentDidMount();
    }
  }

  weightedAverage(ratings) {
    let result = (ratings[5] * 5 + ratings[4] * 4 + ratings[3] * 3 + ratings[2] * 2 + ratings[1] * 1) / ((ratings[5] * 1 + ratings[4] * 1 + ratings[3] * 1 + ratings[2] * 1 + ratings[1] * 1))

    return result;
  }

  handleClickOne() {
    this.setState (prevState => ({
      displayCreateReview: (!prevState.displayCreateReview)
    }))
  }

  handleClickTwo() {
    this.setState (prevState => ({
      reviewCount: (prevState.reviewCount + 2)
    }))
  }

  render() {
    return (
      <div className="reviews">
        <ReviewList reviewsArr={this.state.reviewsArr} currentProduct={this.props.currentProduct} reviewCount={this.state.reviewCount}/>
        <ReviewMeta currentProduct={this.props.currentProduct} ratings={this.state.ratings} characteristics={this.state.characteristics} recommended={this.state.recommended} ratingAverage={this.state.ratingAverage}/>
        <div className= "reviewButtonsDiv">
          <button className="createReviewLinkButton" onClick={this.handleClickOne}>Create review</button>
          <button className="reviewListMoreReviewsbutton" onClick={this.handleClickTwo}>More Reviews</button>
        </div>
        {this.state.displayCreateReview ? <CreateReview currentProduct={this.props.currentProduct} displayCreateReview={this.handleClickOne}/> : null}
      </div>
    )
  }

}

export default Reviews;
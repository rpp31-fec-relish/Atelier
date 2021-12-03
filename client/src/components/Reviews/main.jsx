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
      currentReviewsArr: [],
      reviewCount: 2,
      displayCreateReview: false,
      ratings: {},
      characteristics: {},
      recommended: {},
      ratingAverage: 0,
      filters: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      }
    }
    this.handleClickOne = this.handleClickOne.bind(this);
    this.handleClickTwo = this.handleClickTwo.bind(this);
    this.weightedAverage = this.weightedAverage.bind(this);
    this.filterFunction = this.filterFunction.bind(this);
  }


  componentDidMount(){
    console.log('reviews mounted');
    let currentProduct = this.props.currentProduct;
    helperFunctions.getReviewsById(currentProduct)
    .then((reviews) => {
      this.setState({
        reviewsArr:reviews,
        currentReviewsArr:reviews
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

  filterFunction(rating) {
    this.setState(prevState =>({
      ...prevState,
      filters:{
        ...prevState.filters,
        [rating]: (!prevState.filters[rating])
      }
    }), () => {
      console.log(this.state.filters[rating])
      console.log(this.state.filters);
      this.currentReviewsFunction()
    })
  }

  //can optimize this function
  currentReviewsFunction() {
    let slicedReviews = this.state.reviewsArr.slice();
    let reviewsToReturn = []

    for (let j in this.state.filters) {
      if (this.state.filters[j]) {
        for (let i = 0; i < slicedReviews.length; i++) {
          if (slicedReviews[i].rating.toString() === j){
            reviewsToReturn.push(slicedReviews[i])
          }
        }
      }
    }

    console.log('reviews to return: ',reviewsToReturn)
    this.setState({
      currentReviewsArr: reviewsToReturn
    })
  }

  clearFiltersFunction() {

  }

  render() {
    return (
      <div className="reviews">
        <ReviewList reviewsArr={this.state.currentReviewsArr} currentProduct={this.props.currentProduct} reviewCount={this.state.reviewCount}/>
        <ReviewMeta currentProduct={this.props.currentProduct} ratings={this.state.ratings} characteristics={this.state.characteristics} recommended={this.state.recommended} ratingAverage={this.state.ratingAverage} filterFunction={this.filterFunction}/>
        <div className= "reviewButtonsDiv">
          <button className="createReviewLinkButton" onClick={this.handleClickOne}>Create review</button>
          <button className="reviewListMoreReviewsbutton" onClick={this.handleClickTwo}>More Reviews</button>
        </div>
        {this.state.displayCreateReview ? <CreateReview currentProduct={this.props.currentProduct} characteristics={this.state.characteristics} displayCreateReview={this.handleClickOne}/> : null}
      </div>
    )
  }

}

export default Reviews;
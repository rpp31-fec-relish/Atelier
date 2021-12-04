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
      totalRating: 0,
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
    this.clearFiltersFunction = this.clearFiltersFunction.bind(this);
    this.currentReviewsFunction = this.currentReviewsFunction.bind(this);
  }


  componentDidMount(){
    document.addEventListener('mousedown', (event) => {
      helperFunctions.postInteraction({
        element: event.target.outerHTML.toString(),
        widget: 'Review',
        time: Date.now().toString()
      });
    });
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
      let [avg, count] = this.weightedAverage(ratings);
      this.props.setCurrentProductRating(avg);
      this.setState({
        ratings: ratings,
        characteristics: metaData.characteristics,
        recommended: metaData.recommended,
        ratingAverage: avg,
        totalRating: count,
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

  weightedAverage = (ratings) => {
    let total = 0;
    let totalWeight = 0;
    for (const [key, weight] of Object.entries(ratings)) {
      total += (key * parseInt(weight));
      totalWeight += parseInt(weight);
    }
    total = Math.round((total / totalWeight) * 10) / 10;
    return [total, totalWeight];
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

    if (reviewsToReturn.length === 0) {
      this.setState({
        currentReviewsArr: this.state.reviewsArr
      })
    } else {
      this.setState({
        currentReviewsArr: reviewsToReturn
      })
    }
  }

  clearFiltersFunction() {
    this.setState({
      filters: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false
        },
      currentReviewsArr: this.state.reviewsArr
    })
  }

  render() {
    return (
      <div className="reviews" id="reviews">
        <ReviewList reviewsArr={this.state.currentReviewsArr} currentProduct={this.props.currentProduct} reviewCount={this.state.reviewCount}/>
        <ReviewMeta currentProduct={this.props.currentProduct} ratings={this.state.ratings} characteristics={this.state.characteristics} recommended={this.state.recommended} ratingAverage={this.state.ratingAverage} ratingCount={this.state.totalRating} filterFunction={this.filterFunction} filters={this.state.filters} clearFiltersFunction={this.state.clearFiltersFunction}/>
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
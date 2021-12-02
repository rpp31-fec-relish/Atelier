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

  filterFunction(rating) {
    this.setState(prevState =>({
      ...prevState,
      filters:{
        ...prevState.filters,
        [rating]: (!prevState.filters[rating])
      }
    }))
    console.log(this.state.filters[rating])
    console.log(this.state.filters);
    //so we succesfully connected this to the meta, now we need edit the change for the review. shoudl be an on change.

    //so, to be clear, it wants us to filter all reviews by those stars. and they are additive. its also a toggle.

    /*so...local state. thats the best i can think of here, if the local state is true for anything, then we should filter out by the reviews alone. so a state set up like this:
    filters: {  1: false,
                2: false,
                3: false,
                4: false,
                5: false}

    as we go click it will change the filter to be the what it was and wasnt before.

    we can have a component did update that looks through the currently displayed review list, so it passes through the review system and then grabs any reviews with that specific rating, slices it into an array, and then puts that array into the arrays and pass it along. so we need to change where the reviews aray is coming from. we sho-uld probablhy create a varible that exists that it pulls from, then we can modify it at this level depending on the clicks to pass through.

    keep in mind we also have to think about how this will effect the sort method. its currently sorting based off of when you click,a nd comes in initially based of relavence, but if it comes in after clicked on some sorting nad wants to narrow it down, you may need to have it re initalize the sort method. hrm..thats a problem for further down, th emain concern is getting thit to actuallhy pass a new array that has been filltered.

    ok, things needed to fhti scomponent did update function: updates a sliced array...we coudl just slice the entire array, then we can have a check against a list of filters. if it isnt in there then we can just splice it out. then if they click on more fliters it just reruns and re renders. cost no more api calls, but it could be expensive locally. every tim eit clicks a filter it will continue to pull that one back. we could also look for the ones tha tmatch, add them to a new array, and return that array. but then once its added how does it get rid of it? no, the one that makes sense is that each time its changed, slice the array, then loop over it, if any of the reviews match any of the current true perameters, keep it, otherwise throw it out.

    the button will be passing on the top level amongst the review portion. it will keep an eye for on change. if any of the filters = true, it will apear as a button on the main page, else its null.
    */
  }

  render() {
    return (
      <div className="reviews">
        <ReviewList reviewsArr={this.state.reviewsArr} currentProduct={this.props.currentProduct} reviewCount={this.state.reviewCount}/>
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
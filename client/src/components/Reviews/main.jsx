import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewMeta from './ReviewMeta.jsx';
import CreateReview from './CreateReview2.jsx';
import helperFunctions from '../../helperFunctions';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewsArr: [],
      reviewCount: 2,
      //review count will be used to show how many reviews displayed at one time, will be completed later
      reviewMetaData: {},
      displayCreateReview: false,
      //need to figure out how the button changes to a submit button, so on submit it works
    }
    this.handleClickOne = this.handleClickOne.bind(this);
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
    console.log(helperFunctions.getReviewsMetaById(currentProduct))
  }

  handleClickOne() {
    this.setState (prevState => ({
      displayCreateReview: (!prevState.displayCreateReview)
    }))
  }

  //---will need multiple helper functions, functions include various ajax requests (though that may be top level), switching

  render() {
    //---will use CSS styling for specific placement
    let reviews;
    if (this.state.displayCreateReview) {
      reviews = <CreateReview currentProduct={this.props.currentProduct} displayCreateReview={this.handleClickOne}/>
    } else {
      reviews = <div id="reviews">
        <button className="reviewListSortButton" /*---turn into dropdown list that when selected will create get request with sort perameters*/>Sort reviews by relavence</button>
        <ReviewList reviewsArr={this.state.reviewsArr} /*---will need to limit rendering to two unless 'More Reviews' button is pressed, in which case it will render two more*//>
        <ReviewMeta currentProduct={this.props.currentProduct} /*---will place to the side with CSS*//>
        <button className="createReviewLinkButton" onClick={this.handleClickOne}>Create review</button>
        <button className="reviewListMoreReviewsButton" /*---this will toggle two more reviews to be displayed to the review list*/>More Reviews</button>
      </div>
    }

    return (
      <div>
        {reviews}
      </div>
    )
  }

}

export default Reviews;
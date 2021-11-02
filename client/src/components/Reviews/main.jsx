import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewMeta from './ReviewMeta.jsx';
import CreateReview from './CreateReview.jsx';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewsArr: [],
      reviewMetaData: {},
    }
  }

  //so we should create a function that pulls

  //---will need multiple helper functions, functions include various ajax requests (though that may be top level), switching

  render() {
    //---will use CSS styling for specific placement
    return (
      <div id="reviews">
        <button className="reviewListSortButton" /*---turn into dropdown list that when selected will create get request with sort perameters*/>Sort reviews by relavence</button>
        <ReviewList reviewsArr={this.state.reviewsArr} /*---will need to limit rendering to two unless 'More Reviews' button is pressed, in which case it will render two more*//>
        <ReviewMeta reviewMetaData={this.state.reviewMetaData}/*---will place to the side with CSS*//>
        <button className="createReviewLinkButton" /*---will link Create Review to this button which will toggle a form*/>Link to Create review</button>
        <button className="reviewListMoreReviewsButton" /*---this will toggle two more reviews to be displayed to the review list*/>More Reviews</button>
      </div>
    );
  }

}

export default Reviews;
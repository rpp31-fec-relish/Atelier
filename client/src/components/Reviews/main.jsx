import React from 'react';
import ReviewList from './ReviewList';
import ReviewMeta from './ReviewMeta';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewsArr: [];
    }
  }

  render() {
    //---will use CSS styling for specific placement
    return (
      <button className="review-list-item-button" /*---turn into dropdown list that when selected will create get request with sort perameters*/>Sort by relavence</button>
      <ReviewList reviewsArr={this.state.reviewsArr}/>
      <ReviewMeta /*---will sort to the side with CSS*//>
      <CreateReview /*---will link this to a button which will toggle a form*/ />
    );
  }

}

export default Reviews;
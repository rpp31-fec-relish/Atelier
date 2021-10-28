import React from 'react';
import ReviewList from './ReviewList';
import ReviewMeta from './ReviewMeta';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewsArr: [];
      reviewMetaData: {};
    }
  }

  render() {
    //---will use CSS styling for specific placement
    return (
      <div id="Reviews">
        <button className="review-list-item-button" /*---turn into dropdown list that when selected will create get request with sort perameters*/>Sort by relavence</button>
        <ReviewList reviewsArr={this.state.reviewsArr}/>
        <ReviewMeta reviewsMetaData={this.state.reviewMetaData}/*---will sort to the side with CSS*//>
        <CreateReview /*---will link this to a button which will toggle a form, still debating where to place button*/ />
      </div>
    );
  }

}

export default Reviews;
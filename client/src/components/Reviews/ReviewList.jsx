import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import ReviewListElement from './ReviewListElement.jsx';

function ReviewList(props) {

  console.log(props.reviewsArr)

  return (
    <div className="reviewList">
      <div className="reviewListHeader">
        <h1>Reviews</h1>
        <button className="reviewListSortButton" /*---turn into dropdown list that when selected will create get request with sort perameters*/>Sort reviews by relavence</button>
      </div>
      {props.reviewsArr.map((review, index) => {return <ReviewListElement review={review} key={review.review_id} index={index}/>}
      ).slice(0, props.reviewCount)}
    </div>
  )
}

export default ReviewList;
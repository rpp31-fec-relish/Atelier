import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import ReviewListElement from './ReviewListElement.jsx';

function ReviewList(props) {

  console.log(props.reviewsArr)

  return (
    <div className="reviewList">
      {props.reviewsArr.map((review, index) => {return <ReviewListElement review={review} key={review.review_id} index={index}/>}
      ).slice(0, props.reviewCount)}
    </div>
  )
}

export default ReviewList;
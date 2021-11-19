import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import ReviewListElement from './ReviewListElement.jsx';

function ReviewList(props) {

  return (
    <div className="reviewList">
      {props.reviewsArr.map((review) => {return <ReviewListElement review={review}/>}
      )}
    </div>
  )
}

export default ReviewList;
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';

//---so for starters we should think about how we want to structure this. We will map over the div formation in order to show the various componenets of the review.

function ReviewListElement({review}) {

  const[wasClicked, setWasClicked] = useState(false)

  let dateTime = review.date.split('-')

  let months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let timeStamp = months[parseInt(dateTime[1])-1] + ' ' + dateTime[2].slice(0,2) + ', ' + dateTime[0];

  const handleYesClick = (e) => {
    wasClicked ? null: helperFunctions.markReviewHelpfulById(review.review_id);
    setWasClicked(true);
  }
  const handleNoClick = (e) => {
    console.log('i also exist!');
  }


  return(

    <div className="reviewListItem">
      <Stars className="reviewListItemScore" stars={review.rating}/>
      <div className="reviewListItemDate">{timeStamp}</div>
      <div className="revviewListItemSummary">{review.summary}</div>
      <div className="reviewListItemBody">{review.body}</div>
      <div className="reviewListItemRecommend">{review.recommend}</div>
      <div className="reviewListItemUser">{review.reviewer_name}</div>
      <div className="reviewListItemResponse">{review.response}</div>
      <div className="reviewListItemHelpfulness" /*---we will have to make this interactable, if a user clicks on this it needs to update the review itself with a put reqeust. it also needs to limit how many times the user can click the button (once), though they do not need to be logged in to do so*/>Was this review helpful?
      <span className="reviewListItemHelpfulnesYes" onClick={handleYesClick}> Yes {review.helpfulness}</span>
      <span onClick={handleNoClick}> No </span>
      </div>
    </div>
  );
}

export default ReviewListElement;
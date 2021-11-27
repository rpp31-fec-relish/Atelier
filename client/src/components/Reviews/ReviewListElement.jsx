import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';
import CheckMark from './ReviewImages/clipart2121718_smaller.png';

//---so for starters we should think about how we want to structure this. We will map over the div formation in order to show the various componenets of the review.

//so we need to think about how we are going to wrap the review summary capped at 60 charecters, that are bold.

//we also need to figure out how to do a "Show more" section, that if the words are longer then 250 charecters it will hide under and expansion button

//we also need to allow for image submission and display. clicking a thumbnail should open the image in a modal window (thats easy, onlcick fuction will create a heref tag/link to the image in question)

function ReviewListElement({review, index}) {

  const[wasClicked, setWasClicked] = useState(false)
  const[wasRecommended] = useState(review.recommend)

  let dateTime = review.date.split('-')

  let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let timeStamp = months[parseInt(dateTime[1])-1] + ' ' + dateTime[2].slice(0,2) + ', ' + dateTime[0];

  //so we can create a function that looks up the review.recommend

  const handleYesClick = (e) => {
    wasClicked ? null: helperFunctions.markReviewHelpfulById(review.review_id);
    setWasClicked(true);
  }
  const handleNoClick = (e) => {
    //need to complete
    console.log('i was clicked');
    console.log("review:", review)
    console.log("was recommended:", wasRecommended)
  }



  return(

    <div className="reviewListItem" style={{gridRow: `${index+2}/${index+3}`}} >
      <Stars className="reviewListItemScore" stars={review.rating}/>
      <div className="reviewListItemDate">{timeStamp}</div>
      <div className="reviewListItemSummary">{review.summary}</div>
      <div className="reviewListItemBody">{review.body}</div>
      {wasRecommended ? <div className="reviewListItemRecommend">I recommend this product <img src={CheckMark} alt="CheckMark"/> </div>: ''}
      <div className="reviewListItemUser">{review.reviewer_name}</div>
      <div className="reviewListItemResponse">Response from seller: {review.response}</div>
      <div className="reviewListItemHelpfulness" >Was this review helpful?
      <span className="reviewListItemHelpfulnesYes" onClick={handleYesClick}> Yes {review.helpfulness}</span>
      <span onClick={handleNoClick}> No </span>
      </div>
    </div>
  );
}

export default ReviewListElement;
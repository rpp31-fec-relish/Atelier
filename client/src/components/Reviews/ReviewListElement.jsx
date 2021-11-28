import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';
import CheckMark from './ReviewImages/clipart2121718_smaller.png';


//so we need to think about how we are going to wrap the review summary capped at 60 charecters, that are bold.

//we also need to figure out how to do a "Show more" section, that if the words are longer then 250 charecters it will hide under an expansion button

//we also need to allow for image submission and display. clicking a thumbnail should open the image in a modal window (thats easy, onlcick fuction will create a heref tag/link to the image in question)

function ReviewListElement({review, index}) {

  const[wasClicked, setWasClicked] = useState(false)
  const[wasRecommended] = useState(review.recommend)
  const[hasResponse] = useState(review.response)

  const BodyLimit = ({content, limit}) => {
    const[showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false);

    if (content.length <= limit) {
      return <div className="reviewListItemBody">{content}</div>
    }
    if (showAll) {
      return <div className="reviewListItemBody" >
        {content}
        <button className="showButton" onClick={showLess}>Read Less</button>
      </div>
    }

    const toShow = content.substring(0, limit) + "...";
    return <div className="reviewListItemBody" >
      {toShow}
      <button  className="showButton" onClick={showMore}>Read More</button>
    </div>
  }

  let dateTime = review.date.split('-')

  let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let timeStamp = months[parseInt(dateTime[1])-1] + ' ' + dateTime[2].slice(0,2) + ', ' + dateTime[0];

  const handleYesClick = (e) => {
    wasClicked ? null: helperFunctions.markReviewHelpfulById(review.review_id);
    setWasClicked(true);
  }
  const handleReportClick = (e) => {
    //need to complete
    console.log('i was clicked');
    console.log("review:", review)
    console.log("was recommended:", wasRecommended)
  }



  return(

    <div className="reviewListItem" style={{gridRow: `${index+2}/${index+3}`}} >
      <Stars className="reviewListItemScore" stars={review.rating}/>
      <div className= "reviewListInfo">
        <span className="reviewListItemUser">{review.reviewer_name}, </span>
        <span className="reviewListItemDate">{timeStamp}</span>
      </div>
      <div className="reviewListItemSummary">{review.summary}</div>
      <BodyLimit content={review.body} limit={250}/>
      {wasRecommended ? <div className="reviewListItemRecommend"><img src={CheckMark} alt="CheckMark"/> I recommend this product</div>: ''}
      {hasResponse ? <div className="reviewListItemResponse">Response from seller: {review.response}</div> : ''}
      <div className="reviewListItemHelpfulness">Was this review helpful?
        <span className="reviewListItemHelpfulnesYes" onClick={handleYesClick}> Yes {review.helpfulness} |</span>
        <span onClick={handleReportClick}> Report </span>
      </div>
    </div>
  );
}

export default ReviewListElement;
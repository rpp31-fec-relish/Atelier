import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';
import CheckMark from './ReviewImages/clipart2121718_smaller.png';

//we also need to allow for image submission and display. clicking a thumbnail should open the image in a modal window (thats easy, onlcick fuction will create a heref tag/link to the image in question)

//things I need to do tommorrow: finish the review metta display (mainly CSS i think), finish the sort method, finish the image thumbnail display, create a scrolling of the reviews (as well as fix the height), and finish the CSS for the create form, including making mandatory feilds and error trigger if feilds are not filled out or above charecter. big things are review meta, image display, and sort method.

//make sure to ask team mates what they are doign for the click tracking, gives them monday to work on it, then organize it tuesday and impliment the click tracking however they are making it.

function ReviewListElement({review, index}) {

  const[yesWasClicked, setYesWasClicked] = useState(false)
  const[reportWasClicked, setReportWasClicked] = useState(false)
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

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let timeStamp = months[parseInt(dateTime[1])-1] + ' ' + dateTime[2].slice(0,2) + ', ' + dateTime[0];

  const handleYesClick = (e) => {
    yesWasClicked ? null: helperFunctions.markReviewHelpfulById(review.review_id);
    setYesWasClicked(true);
  }
  const handleReportClick = (e) => {
    reportWasClicked ? null: helperFunctions.reportReviewById(review.review_id);
    setReportWasClicked(true);
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
      {hasResponse ? <div className="reviewListItemResponse">Seller Response: <br/> {review.response}</div> : ''}
      <div className="reviewListItemHelpfulness">Was this review helpful? <br/>
        <span className="reviewListItemHelpfulnesYes" onClick={handleYesClick}> Yes {review.helpfulness} |</span>
        <span onClick={handleReportClick}> Report </span>
      </div>
    </div>
  );
}

export default ReviewListElement;
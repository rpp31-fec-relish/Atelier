import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';
import CheckMark from './ReviewImages/clipart2121718_smaller.png';

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
      <div className='reviewListPhotosTag'>
        {review.photos.map((image)=>
        <a href={image.url} target="_blank" key={image.id}>
          <img className='reviewListPhotos'  name='review photo' src={image.url}/>
        </a>)}
      </div>
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
import React from 'react';
import ReactDOM from 'react-dom';

//---so for starters we should think about how we want to structure this. the plan We will map over the div formation in order to show the various componenets of the review.



const ReviewList = (props) => (
<div className="reviewList">
  <ul>
    {props.reviewsArr.map((review) => <li className="reviewListItem" key = {review.review_id}>
      <div className="reviewListItemScore" /*---we probably will need an function to convert the rating into star based images here. Maybe we have a top level helper function we invoke here? */>{review.rating}</div>
      <div className="reviewListItemDate">{review.date}</div>
      <div className="revviewListItemSummary">{review.summary}</div>
      <div className="reviewListItemBody">{review.body}</div>
      <div className="reviewListItemRecommend">{review.recommend}</div>
      <div className="reviewListItemUser">{review.reviewer_name}</div>
      <div className="reviewListItemResponse">{review.response}</div>
      <div className="reviewListItemHelpfulness" /*---we will have to make this interactable, if a user clicks on this it needs to update the review itself with a put reqeust. it also needs to limit how many times the user can click the button (once), though they do not need to be logged in to do so*/>{review.helpfulness}</div>

    </li>
    )}
  </ul>
</div>


)

export default ReviewList;
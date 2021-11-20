import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

//---so for starters we should think about how we want to structure this. We will map over the div formation in order to show the various componenets of the review.

//idea for limiting the number of items per showing: we can have a count varible in the main page that starts at 2, then when a button is clicked for more reviews it add to the count varible. the map will only render the total number of divs equal to the count, comparing it to a count varible of its own that increases per div rendered. if the count varible is equal to the local div amoutn varible, it will stop the process. so thats the idea for that button feature at least. sit on this for later.

function ReviewListElement({review}) {

  let dateTime = review.date.split('-')

  let months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let timeStamp = months[parseInt(dateTime[1])-1] + ' ' + dateTime[2].slice(0,2) + ', ' + dateTime[0];
  console.log('timeStamp: ', timeStamp);


  return(

    <div className="reviewListItem">
      <div className="reviewListItemScore" /*---we probably will need an function to convert the rating into star based images here. Maybe we have a top level helper function we invoke here? */>{review.rating}</div>
      <div className="reviewListItemDate">{timeStamp}</div>
      <div className="revviewListItemSummary">{review.summary}</div>
      <div className="reviewListItemBody">{review.body}</div>
      <div className="reviewListItemRecommend">{review.recommend}</div>
      <div className="reviewListItemUser">{review.reviewer_name}</div>
      <div className="reviewListItemResponse">{review.response}</div>
      <div className="reviewListItemHelpfulness" /*---we will have to make this interactable, if a user clicks on this it needs to update the review itself with a put reqeust. it also needs to limit how many times the user can click the button (once), though they do not need to be logged in to do so*/>{review.helpfulness}</div>
    </div>
  );
}

export default ReviewListElement;
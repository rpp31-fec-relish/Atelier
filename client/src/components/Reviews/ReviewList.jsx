import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

//---so for starters we should think about how we want to structure this. We will map over the div formation in order to show the various componenets of the review.

//idea for limiting the number of items per showing: we can have a count varible in the main page that starts at 2, then when a button is clicked for more reviews it add to the count varible. the map will only render the total number of divs equal to the count, comparing it to a count varible of its own that increases per div rendered. if the count varible is equal to the local div amoutn varible, it will stop the process. so thats the idea for that button feature at least. sit on this for later.


//let start with date and time.



function ReviewList(props) {

  const[reviewsArr, setReviewsArr] = useState([])


  useEffect(() => {
    let currentProduct = props.currentProduct;
    helperFunctions.getReviewsById(currentProduct)
    .then((reviews) => {
      setReviewsArr(reviews)
    })
    .catch((err) => {
      console.error('Error setting state of reviews', err)
    })
    //console.log('dateTime: ', dateTime);


  }, []);

  //let dateTime = reviewsArr.date.split('-');
  // let months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // let timeStamp = months[parseInt(dateTime[1])-1] + ' ' + dateTime[2].slice(0,2) + ', ' + dateTime[0];



return (
<div className="reviewList">
    {reviewsArr.map((review) => <div className="reviewListItem" key = {review.review_id}>
      <div className="reviewListItemScore" /*---we probably will need an function to convert the rating into star based images here. Maybe we have a top level helper function we invoke here? */>{review.rating}</div>
      <div className="reviewListItemDate">{review.date}</div>
      <div className="revviewListItemSummary">{review.summary}</div>
      <div className="reviewListItemBody">{review.body}</div>
      <div className="reviewListItemRecommend">{review.recommend}</div>
      <div className="reviewListItemUser">{review.reviewer_name}</div>
      <div className="reviewListItemResponse">{review.response}</div>
      <div className="reviewListItemHelpfulness" /*---we will have to make this interactable, if a user clicks on this it needs to update the review itself with a put reqeust. it also needs to limit how many times the user can click the button (once), though they do not need to be logged in to do so*/>{review.helpfulness}</div>
    </div>
    )}
</div>

)
}

export default ReviewList;
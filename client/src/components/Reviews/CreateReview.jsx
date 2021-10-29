import React from 'react';
import ReactDOM from 'react-dom';


//---this will just be a basic form to fill out in order to create a new review

const CreateReview = (props) => (
<div className="createReview">
  <form className="createReviewForm" /*need to make a handle submit */>
    <select className="createReviewRating" /*---need to create a select rating system of 1-5 linked to post options*/>rating</select>
    <button className="createReviewRecomend" /*---boolean toggle for yes/no*/>Recommend?</button>
    <th className="createReviewCharecteristics" /*---this will be a charecteristics table, will need to do a deep dive into how I want to display this, so leaving it minimalistic for now*/>
      <tr>characteristics sample</tr>
    </th>
    <textarea className="createReviewSummary" /*---will  need to do a handle on change process that links to state*//>
    <textarea className="createReviewBody" /*---will need to do a handle on change process that links to state*//>

    <input className="createReviewNickname" name='nickname'></input>
    <input className="createReviewEmail" name="email"></input>
    <button className="createReviewSubmitButton" /*will need to do a handle submit*/>Submit</button>
  </form>
</div>
);


export default CreateReview;

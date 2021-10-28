import React from 'react';
import ReactDOM from 'react-dom';

//this page will be the setup for the review meta data, mainly it will just dispolay the data based on score, aggreget score, and

const ReviewMeta = (props) => {
  <div className="reviewMeta">
    <div /*---will display product rating, but again unsure where exactly we are pulling the data from*/>{/*product rating*/}</div>
    <ul /*---for now these will be seprate lists, but I think im gonna change this to a table, will review*/>
    {props.reviewMetaData.ratings.map((rating)=>
      <li>{rating}</li>
    )}
    {props.reviewMetaData.characteristics.map((trait)=>
      <li>{trait}</li>
    )}
    </ul>
  </div>
}

export default ReviewMeta;
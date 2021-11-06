import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

class CreateReview extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newReview: {
        //this is an example, focus on the keys and change the chaecteristics portion
        // "product_id": /* change to props.currentid*/ ,
        // "rating": 0,
        // "summary": "",
        // "body": "Just the best, I live for this product",
        recommend: false,
        // "name": "Clayton",
        // "email": "fakeaddy@example.com",
        // "photos": ["", ""],
        // "characteristics": {
        //     "199845": 3,
        //     "199846": 3,
        //     "199847": 5,
        //     "199848": 5
        // }
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.recommend = this.recommend.bind(this);
  }

  //need to create a toggle function for reccomend

  recommend(e) {
    e.preventDefault();
    this.setState({
      newReview: {
      recommend: !this.state.recommend
      }
    })
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
       newReview: {
         ...this.state.newReview, [name]:value
       }
    });
  }

  //need to update the create portion to include names that will add value as you type it.

  render() {
    return (
      <div className="createReview">
        <form className="createReviewForm" /*need to make a handle submit */>
        <select className="createReviewRating" name='rating'/*---need to create a select rating system of 1-5 linked to post options*/>rating</select>
        <button className="createReviewRecomend" onClick = {this.recommend}>Recommend?</button>
        <tr className="createReviewCharecteristics" /*---this will be a charecteristics table, will need to do a deep dive into how I want to display this, so leaving it minimalistic for now*/>
          <th>characteristics sample</th>
        </tr>
        <textarea className="createReviewSummary" name='summary' /*---will  need to do a handle on change process that links to state*//>
        <textarea className="createReviewBody" name='body'/*---will need to do a handle on change process that links to state*//>
        <input className="createReviewNickname" name='nickname'></input>
        <input className="createReviewEmail" name="email"></input>
        <button className="createReviewSubmitButton" /*will need to do a handle submit*/>Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateReview;

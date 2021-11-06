import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

class CreateReview extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonText: "Recommend?",
      newReview: {
        //this is an example, focus on the keys and change the chaecteristics portion
        product_id: props.currentProduct ,
        rating: 0,
        summary: "",
        body: "",
        recommend: false,
        name: "",
        email: "",
        // "photos": ["", ""],
        //"characteristics": {
        //     "199845": 3,
        //     "199846": 3,
        //     "199847": 5,
        //     "199848": 5
        // }
      }
    }
    this.recommend = this.recommend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  recommend(e) {
    e.preventDefault();
    this.setState({
      newReview: {
      recommend: !this.state.recommend
      },
      buttonText: "Recommended!"
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
  handleChange2(e) {
    this.setState({
      newReview: {
      rating: parseInt(e.target.value, 10)
      }
    })
  }

  //might need to put this at the main level

  handleSubmit() {
    //call helper post request using the local state as variables
  }

  //need to update the create portion to include names that will add value as you type it.

  render() {
    return (
      <div className="createReview">
        <form className="createReviewForm" /*need to make a handle submit */>
        <label>
          Rating:
          <select className="createReviewRating" value={this.state.value} onChange={this.handleChange2}name='rating'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </label>
        <button className="createReviewRecomend" onClick = {this.recommend}>{this.state.buttonText}</button>
        <tr className="createReviewCharecteristics" /*---this will be a charecteristics table, will need to do a deep dive into how I want to display this, so leaving it minimalistic for now*/>
          <th>characteristics sample</th>
        </tr>
        <label>
          Summary:
          <textarea className="createReviewSummary" name='summary' /*---will  need to do a handle on change process that links to state*//>
        </label>
        <label>
          Body:
          <textarea className="createReviewBody" name='body'/*---will need to do a handle on change process that links to state*//>
        </label>
        <label>
          Name:
          <input className="createReviewName" name='name'></input>
        </label>
        <label>
          Email:
          <input className="createReviewEmail" name="email"></input>
        </label>
        <button className="createReviewSubmitButton" type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateReview;

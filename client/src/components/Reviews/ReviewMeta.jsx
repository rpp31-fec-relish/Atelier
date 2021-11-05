import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

//alright, so lets set up a skelletons using the class styling for this

class ReviewMeta extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ratings: {},
      characteristics: {},
      recommended: {}
    }
    this.button = this.button.bind(this);
  }

  componentDidMount() {
    console.log(this.props.currentProduct)
    let currentProduct = this.props.currentProduct;
    helperFunctions.getReviewsMetaById(currentProduct)
    .then((metaData)  => {
      console.log('metaData: ', metaData);
      this.setState({
        ratings: metaData.ratings,
        characteristics: metaData.characteristics,
        recommended: metaData.recommended
      })
    })
    .catch((err) => {
      console.error('Error setting state of reviewMetaData', err)
    })
  }

  button() {
    console.log('ratings: ', this.state.ratings)
    console.log('characteristics: ', this.state.characteristics)
    console.log('recommended: ', this.state.recommended)
  }


  render() {
    return (
      <div className="reviewMeta">
        <div /*---will display product rating, but again unsure where exactly we are pulling the data from, as it is not in the reviewMeta data. Also thinking of changing this into a table, this is for proof of concept for now*//>
        <div>Characteristics:</div>
        {Object.keys(this.state.characteristics).map((trait) => <div key={this.state.characteristics[trait].id}>{trait}: {this.state.characteristics[trait].value}</div>)}
        <div>Recomended: </div>
        <div>True: {this.state.recommended.true}</div>
        <div>False: {this.state.recommended.false}</div>
        <div> Poduct Ratings: </div>
        {Object.keys(this.state.ratings).map((rating) => <div key={rating}>{rating}: {this.state.ratings[rating]}</div>)}
        <button onClick ={this.button}>check data</button>
      </div>
    )
  }
}

export default ReviewMeta;





// const ReviewMeta = (props) => {
//   const review = Object.keys(props.reviewMetaData.ratings).map((rating) => <div>{props.review.ratings[rating]}</div>)
//   return (
//   <div className="reviewMeta">
//     <div /*---will display product rating, but again unsure where exactly we are pulling the data from, as it is not in the reviewMeta data. Also thinking of chaning this into a table, this is for proof of concept for now*/>{/*product rating*/}</div>
//       {/* <div>{props.reviewMetaData.characteristics.Comfort.value}</div> */}
//       {/* {Object.keys(props.reviewMetaData.ratings).map((rating) => <div>{rating}</div>)} */}

//
//   );
// }


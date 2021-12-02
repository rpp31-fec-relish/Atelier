import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Slider, {Range} from 'rc-slider';
import Stars from '../../../../node_modules/react-stars-display/';

class ReviewMeta extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // ratings: this.props.ratings,
      // characteristics: this.props.characteristics,
      // recommended: this.props.recommended,
      // ratingAverage: this.props.ratingAverage
    }
    //this.weightedAverage = this.weightedAverage.bind(this)
  }

  // weightedAverage(ratings) {
  //   let result = (ratings[5] * 5 + ratings[4] * 4 + ratings[3] * 3 + ratings[2] * 2 + ratings[1] * 1) / ((ratings[5] * 1 + ratings[4] * 1 + ratings[3] * 1 + ratings[2] * 1 + ratings[1] * 1))

  //   return result;
  // }
  // this.props.filterFunction('this is a test of the filter function')

  render() {
    return (
      <div className="reviewMeta">
        <h2>Product Information</h2>
        <div> {Math.round(this.props.ratingAverage * 10)/10}
        <Stars className="reviewMetaScore" stars={Math.round(this.props.ratingAverage * 10)/10}/>
        </div>
        <div> Poduct Ratings: </div>
        {Object.keys(this.props.ratings).map((rating) => <div onClick={(e) =>{this.props.filterFunction(rating)}} key={rating}>{rating}: {this.props.ratings[rating]}</div>)}
        <div>Rating Breakdown</div>
        {Object.keys(this.props.characteristics).map((trait) => <div key={this.props.characteristics[trait].id}>{trait}: {Math.round(this.props.characteristics[trait].value * 10)/10}</div>)}
        <div>Recomended: </div>
        <div>True: {this.props.recommended.true}</div>
        <div>False: {this.props.recommended.false}</div>
      </div>
    )
  }
}

export default ReviewMeta;

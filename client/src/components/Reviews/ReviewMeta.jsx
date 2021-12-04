import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';

//refactor into functional component

class ReviewMeta extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="reviewMeta">
        <h2>Product Information</h2>
          <div> {Math.round(this.props.ratingAverage * 10)/10}
            <Stars className="reviewMetaScore" stars={Math.round(this.props.ratingAverage * 10)/10}/>
          </div>
          <div>Recomended: </div>
            <div>True: {this.props.recommended.true}</div>
            <div>False: {this.props.recommended.false}</div>
          <div>Ratings Breakdown:</div>
            {Object.keys(this.props.filters).map((toggle) =>
          this.props.filters[toggle] ? <div>{toggle} star filter applied</div> : null
        )}
            {Object.keys(this.props.ratings).map((rating) => <div onClick={(e) =>{this.props.filterFunction(rating)}} key={rating}>{rating}: {this.props.ratings[rating]}</div>)}
          <div>Product Ratings:</div>
            {Object.keys(this.props.characteristics).map((trait) => <div key={this.props.characteristics[trait].id}>{trait}: {Math.round(this.props.characteristics[trait].value * 10)/10}</div>)}
      </div>
    )
  }
}

export default ReviewMeta;

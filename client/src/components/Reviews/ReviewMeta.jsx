import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';
import ProgressBar from './progress-bar.jsx'

class ReviewMeta extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      starCounts:[1,2,3,4,5]
    }
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
          <div>Ratings Breakdown: </div>
            {Object.keys(this.props.filters).map((toggle) =>
          this.props.filters[toggle] ? <div>{toggle} star filter applied</div> : null
        )}
          {Object.keys(this.props.ratings).map(
            (rating) => {
              return <div onClick={(e) =>{this.props.filterFunction(rating)}} key={rating} className="ratingBar">
                {rating} stars: {this.props.ratings[rating]}<ProgressBar key={Number(rating)} bgcolor="#008000" completed={this.props.ratings[rating]/this.props.ratingCount * 100}/>
                </div>
              }
            )}
          <div>Product Ratings:</div>
            {Object.keys(this.props.characteristics).map((trait) => <div key={this.props.characteristics[trait].id}>{trait}: {Math.round(this.props.characteristics[trait].value * 10)/10}</div>)}
      </div>
    )
  }
}

export default ReviewMeta;
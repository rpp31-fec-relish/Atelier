import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import Stars from '../../../../node_modules/react-stars-display/';
import ProgressBar from './progress-bar.jsx'

class ReviewMeta extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      starCounts:[1,2,3,4,5],
      traits : {
        'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
        'Width': ['Too narrow','Slightly narrow','Perfect','Slightly wide','Too wide'],
        'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok','Comfortable','Perfect'],
        'Quality': ['Poor','Below average','What I expected','Pretty great', 'Perfect'],
        'Length': ['Runs short','Runs slightly short','Perfect','Runs slightly long','Runs long'],
        'Fit': ['Runs tight','Runs slightly tight','Perfect','Runs slightly loose','Runs loose'],
      }
    }
  }

  render() {
    return (
      <div className="reviewMeta">
        <h2>Product Information</h2>
          <div className='reviewMetaRating'> {Math.round(this.props.ratingAverage * 10)/10}
          <br/>
            <Stars className="reviewMetaScore" stars={Math.round(this.props.ratingAverage * 10)/10}/>
          </div>
          <br/>
          <div className="reviewMetaRecommended">{Number(this.props.recommended.true)/(Number(this.props.recommended.true) + Number(this.props.recommended.false)) * 100}% Recommend this product </div>
            <br/>
          <div className="reviewRatingsBreakdown">Ratings Breakdown: </div>

            {Object.keys(this.props.filters).map((toggle) =>
          this.props.filters[toggle] ? <div>{toggle} star filter applied</div> : null
        )}
        <br/>
          {Object.keys(this.props.ratings).map(
            (rating) => {
              return <div onClick={(e) =>{this.props.filterFunction(rating)}} key={rating} className="ratingBar">
                {rating} stars: {this.props.ratings[rating]}<ProgressBar key={Number(rating)} bgcolor="#008000" completed={this.props.ratings[rating]/this.props.ratingCount * 100}/>
                </div>
              }
            )}
            {Object.keys(this.props.filters).some((index) => this.props.filters[index]) ? <button onClick={this.props.clearFiltersFunction}>Clear Filters</button> : null}
          <br/>
          <div className="reviewProductRatings">Product Ratings:</div>
          <br/>
            {Object.keys(this.props.characteristics).map((trait) => <div key={this.props.characteristics[trait].id}>{trait}: {this.state.traits[trait][Math.round(this.props.characteristics[trait].value)]}</div>)}
      </div>
    )
  }
}

export default ReviewMeta;
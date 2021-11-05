import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

class ReviewMeta extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ratings: {},
      characteristics: {},
      recommended: {}
    }
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
      </div>
    )
  }
}

export default ReviewMeta;

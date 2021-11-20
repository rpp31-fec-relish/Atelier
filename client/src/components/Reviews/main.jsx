import React from 'react';
import ReviewList from './ReviewList.jsx';
import ReviewMeta from './ReviewMeta.jsx';
import CreateReview from './CreateReview.jsx';
import helperFunctions from '../../helperFunctions';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewsArr: [],
      reviewCount: 2,
      displayCreateReview: false,
    }
    this.handleClickOne = this.handleClickOne.bind(this);
    this.handleClickTwo = this.handleClickTwo.bind(this);
  }


  componentDidMount(){
    console.log('reviews mounted');
    let currentProduct = this.props.currentProduct;
    helperFunctions.getReviewsById(currentProduct)
    .then((reviews) => {
      this.setState({
        reviewsArr:reviews
      })
    })
    .catch((err) => {
      console.error('Error setting state of reviews', err)
    })
  }

  handleClickOne() {
    this.setState (prevState => ({
      displayCreateReview: (!prevState.displayCreateReview)
    }))
  }

  handleClickTwo() {
    this.setState (prevState => ({
      reviewCount: (prevState.reviewCount + 2)
    }))
  }

  render() {
    //---will use CSS styling for specific placement
    let reviews;
    if (this.state.displayCreateReview) {
      reviews = <CreateReview currentProduct={this.props.currentProduct} displayCreateReview={this.handleClickOne}/>
    } else {
      reviews = <div id="reviews">
        <button className="reviewListSortButton" /*---turn into dropdown list that when selected will create get request with sort perameters*/>Sort reviews by relavence</button>
        <ReviewList reviewsArr={this.state.reviewsArr} currentProduct={this.props.currentProduct} reviewCount={this.state.reviewCount}/*---will need to limit rendering to two unless 'More Reviews' button is pressed, in which case it will render two more*//>
        <ReviewMeta currentProduct={this.props.currentProduct} /*---will place to the side with CSS*//>
        <button className="createReviewLinkButton" onClick={this.handleClickOne}>Create review</button>
        <button className="reviewListMoreReviewsbutton" onClick={this.handleClickTwo}>More Reviews</button>
      </div>
    }

    return (
      <div>
        {reviews}
      </div>
    )
  }

}

export default Reviews;
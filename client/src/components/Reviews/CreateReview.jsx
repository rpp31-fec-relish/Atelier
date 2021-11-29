import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';
import { Rating, RatingView } from 'react-simple-star-rating'

function CreateReview(props) {

  const[buttonText, changeButtonText] = useState('Recommend?')
  const[recommend, setRecommend] = useState(false)
  const[rating, setRating] = useState(0)
  const[characteristics, setCurrentCharacteristics] = useState({})

  useEffect(() => {
    //move to main when working on meta data
    let currentProduct = props.currentProduct;
    helperFunctions.getReviewsMetaById(currentProduct)
    .then((metaData)  => {
      let productCharacteristics = {}
      Object.keys(metaData.characteristics).map((key) => {
        productCharacteristics[key] = {
          id: metaData.characteristics[key].id,
          value: 0
        }
      })
      setCurrentCharacteristics(productCharacteristics)
    })
    .catch((err) => {
      console.error('Error setting state of reviewMetaData', err)
    })
  }, [])

  let characteristicNames = Object.keys(characteristics);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setCurrentCharacteristics( prevChar => {
      return {
      ...prevChar,
      [name]: {
        id: prevChar[name].id,
        value: parseInt(value, 10)}
      }
    })
  }

  const handleRating = (rate) => {
    setRating(rate)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let incomplete = false
    let missingPortion = {};

    let review = {
      product_id: props.currentProduct,
      recommend: recommend,
      summary:e.target[1].value,
      body: e.target[2].value,
      name: e.target[3].value,
      email: e.target[4].value,
      rating: rating,
      characteristics: {

      }
    }

    if (review.summary.length > 60) {
      incomplete = true
      missingPortion.summary = 'Your Summary can not be more then 60 characters'
    }
    if (review.body.length < 50) {
      incomplete = true
      missingPortion.body = 'Your Review can not be less then 50 characters'
    } else if (review.body.length > 1000) {
      incomplete = true
      missingPortion.body = 'Your Review can not be more then 1000 characters'
    }
    if (review.name.length === 0) {
      incomplete = true
      missingPortion.name = 'Your name can not be blank'
    } else if (review.name.length > 60) {
      incomplete = true
      missingPortion.name = 'Your name can not be more then 60 characters'
    }
    if (!review.email.match(emailFormat)) {
      incomplete = true
      missingPortion.email = 'You must provide a valid email'
    } else if (review.email.value.length === 0) {
      incomplete = true
      missingPortion.email = 'Your email can not be blank'
    } else if (review.email.value.length > 60) {
      incomplete = true
      missingPortion.email = 'Your email can not be more then 60 characters'
    }
    if (review.rating.value === 0) {
      incomplete = true
      missingPortion.rating = 'You must provide a star rating'
    }

    characteristicNames.map((trait) => {
      review.characteristics[characteristics[trait].id] = characteristics[trait].value;

      //need to redo this to reflect ID as name
      if (characteristics[trait].value === 0) {
        incomplete = true;
        missingPortion[trait] = characteristics[trait] + ' is empty! Please fill out all elements of the review.';
      }
    });

    if (incomplete) {
      //set up divs to pop up in modal between modal container and form at bottom
    } else {
    helperFunctions.postReview(review);
    props.displayCreateReview()
    }
  }

  const recommendFunc = (e) => {
    e.preventDefault();
    setRecommend(prev => !prev);

    recommend ? changeButtonText('Recommend?') : changeButtonText('Recommended!');
  }

  const traits = (trait, index) => {

    let traits = {
      'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
      'Width': ['Too narrow','Slightly narrow','Perfect','Slightly wide','Too wide'],
      'Comfort': ['Uncomfortable', 'Slightly uncomfortable', 'Ok','Comfortable','Perfect'],
      'Quality': ['Poor','Below average','What I expected','Pretty great', 'Perfect'],
      'Length': ['Runs Short','Runs slightly short','Perfect','Runs slightly long','Runs long'],
      'Fit': ['Runs Tight','Runs slightly Tight','Perfect','Runs slightly long','Runs long'],
    }
    return traits[trait][index];
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
      <button className="modalCloseButton" onClick={props.displayCreateReview}>X</button>
        <form className="createReviewForm" onSubmit={handleSubmit}>
        <button className="createReviewRecomend" onClick = {recommendFunc}>{buttonText}</button>
          <label>
            Summary:
            <textarea className="createReviewSummary" name='summary' placeholder="Example: Best purchase ever!"/>
          </label>
          <label>
            Body:
            <textarea className="createReviewBody" name='body' placeholder="Why did you like the product or not?"/>
          </label>
          <label>
            Name:
            <input className="createReviewName" name='name'></input>
          </label>
          <label>
            Email:
            <input className="createReviewEmail" name="email"></input>
          </label>
          <label>
            Rating:<Rating onClick={handleRating} ratingValue={rating}/>
          </label>
          {characteristicNames.map((trait) => <div className="charactersitic_select" key = {characteristics[trait].id}>
              {trait}:
              <input type="radio" value="1" onChange={handleChange}name={trait}/>
              <label>{traits(trait, 0)}</label>
              <input type="radio" value="2" onChange={handleChange}name={trait}/>
              <label>{traits(trait, 1)}</label>
              <input type="radio" value="3" onChange={handleChange}name={trait}/>
              <label>{traits(trait, 2)}</label>
              <input type="radio" value="4" onChange={handleChange}name={trait}/>
              <label>{traits(trait, 3)}</label>
              <input type="radio" value="5" onChange={handleChange}name={trait}/>
              <label>{traits(trait, 4)}</label>
          </div>
          )}
          <button className="createReviewSubmitButton" type='submit' >Submit</button>
        </form>
      </div>
    </div>
  )
//if information is inside of of a varible, render this information and prevent submision. i guess i should have this set up between the bottom of the form and the bottom
}

export default CreateReview;
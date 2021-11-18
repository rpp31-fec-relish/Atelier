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
    console.log(props.currentProduct)
    let currentProduct = props.currentProduct;
    helperFunctions.getReviewsMetaById(currentProduct)
    .then((metaData)  => {
      let productCharacteristics = {}
      Object.keys(metaData.characteristics).map((key) => {
        console.log('key: ', key);
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

    characteristicNames.map((trait) => {
      review.characteristics[characteristics[trait].id] = characteristics[trait].value
    });

    console.log("review: ", review)

    helperFunctions.postReview(review);
    props.displayCreateReview()
  }

  const recommendFunc = (e) => {
    e.preventDefault();
    setRecommend(prev => !prev);

    recommend ? changeButtonText('Recommend?') : changeButtonText('Recommended!');
  }

  //so shiffting the summary to go into the next portion shouldnt be too difficult, we can just have a function that counts the total number of the summary, and if that summary goes over a certain length it will be added into the body at the top, put a new line and then add the body. just make sure to put this functionality in. may have to shift summary and body to be stateful rather then pulled from the form

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
            <textarea className="createReviewSummary" name='summary'/>
          </label>
          <label>
            Body:
            <textarea className="createReviewBody" name='body'/>
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

}

export default CreateReview;
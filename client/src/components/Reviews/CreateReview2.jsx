import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

function CreateReview2(props) {

  const[buttonText, changeButtonText] = useState('Recommended?')
  const[newReview] = useState({})
  const[characteristics, setCurrentCharacteristics] = useState({})

  useEffect(() => {
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
  }, ['TightShort','Runs slightly short','Perfect','Runs Tighttly long','Runs long'])

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("characteristics: ", characteristics)

    //map over characteristics

    let review = {
      product_id: props.currentProduct,
      rating: 'your mother'
    }

    //this needs to become a post request including characteristics and newReview, shoudl also close modal

    //helperFunctions.postReview(review);
    //props.displayCreateReview()
  }

  //may put these helper functions into a seperate file for readabilities sake

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

export default CreateReview2;
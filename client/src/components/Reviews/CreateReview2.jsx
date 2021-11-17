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
      console.log('metaData: ', metaData);
      console.log('productCharacteristics: ', productCharacteristics)
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
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setCurrentCharacteristics( prevChar => {
      return {
      ...prevChar,
      [name]: {value: parseInt(value, 10)}
      }
    })
  }

  console.log(characteristics);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
      <button className="modalCloseButton" onClick={props.displayCreateReview}>X</button>
        <form className="createReviewForm">
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
            <label>
              {trait}
              <select value={characteristics[trait].value} onChange={handleChange}name={trait}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              </select>
            </label>
          </div>
          )}
          <button className="createReviewSubmitButton" type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )

}



//this is a hook version of createReview

export default CreateReview2;
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

function CreateReview2(props) {

  const[buttonText, changeButtonText] = useState('Recommended?')
  const[newReview, ] = useState({})


  useEffect(() => {
    console.log(props.currentProduct)
    let currentProduct = props.currentProduct;
    helperFunctions.getReviewsMetaById(currentProduct)
    .then((metaData)  => {
      console.log('metaData: ', metaData);
      let updatedProducts = {
          product_id: props.currentProduct ,
          rating: 0,
          summary: "",
          body: "",
          recommend: false,
          name: "",
          email: "",
          // "photos": ["", ""],
          characteristics: {
            //i need to dynamicly create the characteristics section
          }


        //have the object be populated with the meta data information to add to state for the charectertics, it will dynamicly fill out the state data and updata without usseing the 'setstate' function but instead an
      }
    })
    .catch((err) => {
      console.error('Error setting state of reviewMetaData', err)
    })
  }, [])



  return (
      <form>
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
        <button className="createReviewSubmitButton" type='submit'>Submit</button>
      </form>
  )

}

//this is a hook version of createReview

export default CreateReview2;
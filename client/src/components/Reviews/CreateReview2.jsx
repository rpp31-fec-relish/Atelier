import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

// function CreateReview(props) {

//   const[buttonText, changeButtonText] = useState('Recommended?')
//   const[newReview, ] = useState(....)


//   componentDidMount() {
//     console.log(this.props.currentProduct)
//     let currentProduct = this.props.currentProduct;
//     helperFunctions.getReviewsMetaById(currentProduct)
//     .then((metaData)  => {
//       console.log('metaData: ', metaData);
//       let updatedProducts = {
//           product_id: props.currentProduct ,
//           rating: 0,
//           summary: "",
//           body: "",
//           recommend: false,
//           name: "",
//           email: "",
//           // "photos": ["", ""],
//           characteristics: {

//           }


//         //have the object be populated with the meta data information to add to state for the charectertics, it will dynamicly fill out the state data and updata without usseing the 'setstate' function but instead an
//       }
//     })
//     .catch((err) => {
//       console.error('Error setting state of reviewMetaData', err)
//     })
//   }

// }


//this is a hook version of it

// export default CreateReview2;
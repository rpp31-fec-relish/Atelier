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

    //this needs to become a post request including characteristics and newReview, shoudl also close modal
  }

  console.log(characteristics);

  const trait1 = (trait) => {
    if (trait === 'Size') {
      return 'A size too small'
    } else if (trait === 'Width') {
      return 'Too narrow'
    } else if (trait === 'Comfort') {
      return 'Uncomfortable'
    } else if (trait === 'Quality') {
      return 'Poor'
    } else if (trait === 'Length') {
      return 'Runs short'
    } else if (trait === 'Fit') {
      return 'Runs tight'
    }
  }

  const trait2 = (trait) => {
    if (trait === 'Size') {
      return '½ a size too small'
    } else if (trait === 'Width') {
      return 'Slightly narrow'
    } else if (trait === 'Comfort') {
      return 'Slightly uncomfortable'
    } else if (trait === 'Quality') {
      return 'Bellow Average'
    } else if (trait === 'Length') {
      return 'Runs slightly short'
    } else if (trait === 'Fit') {
      return 'Runs slightly tight'
    }
  }

  const trait3 = (trait) => {
    if (trait === 'Size') {
      return 'Perfect'
    } else if (trait === 'Width') {
      return 'Perfect'
    } else if (trait === 'Comfort') {
      return 'Ok'
    } else if (trait === 'Quality') {
      return 'What I Expected'
    } else if (trait === 'Length') {
      return 'Perfect'
    } else if (trait === 'Fit') {
      return 'Perfect'
    }
  }

  const trait4 = (trait) => {
    if (trait === 'Size') {
      return '½ a size too big'
    } else if (trait === 'Width') {
      return 'Slightly wide'
    } else if (trait === 'Comfort') {
      return 'Comfortable'
    } else if (trait === 'Quality') {
      return 'Pretty great'
    } else if (trait === 'Length') {
      return 'Runs slightly long'
    } else if (trait === 'Fit') {
      return 'Runs slightly long'
    }
  }

  const trait5 = (trait) => {
    if (trait === 'Size') {
      return 'A size too wide'
    } else if (trait === 'Width') {
      return 'Too wide'
    } else if (trait === 'Comfort') {
      return 'Perfect'
    } else if (trait === 'Quality') {
      return 'Perfect'
    } else if (trait === 'Length') {
      return 'Runs long'
    } else if (trait === 'Fit') {
      return 'Runs long'
    }
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
              <label>{trait1(trait)}</label>
              <input type="radio" value="2" onChange={handleChange}name={trait}/>
              <label>{trait2(trait)}</label>
              <input type="radio" value="3" onChange={handleChange}name={trait}/>
              <label>{trait3(trait)}</label>
              <input type="radio" value="4" onChange={handleChange}name={trait}/>
              <label>{trait4(trait)}</label>
              <input type="radio" value="5" onChange={handleChange}name={trait}/>
              <label>{trait5(trait)}</label>
          </div>
          )}
          <button className="createReviewSubmitButton" type='submit' >Submit</button>
        </form>
      </div>
    </div>
  )

}

export default CreateReview2;
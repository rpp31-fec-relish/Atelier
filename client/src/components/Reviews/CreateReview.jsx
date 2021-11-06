import React from 'react';
import ReactDOM from 'react-dom';
import helperFunctions from '../../helperFunctions';

class CreateReview extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonText: "Recommend?",
      newReview: {
        product_id: props.currentProduct ,
        rating: 0,
        summary: "",
        body: "",
        recommend: false,
        name: "",
        email: "",
        // "photos": ["", ""],
        characteristics: {
          Comfort: {
            id: 0,
            value: 0
          },
          Fit: {
            id: 0,
            value: 0
          },
          Length: {
            id: 0,
            value: 0
          },
          Quality: {
            id: 0,
            value: 0
          },
        }
      }
    }
    this.recommend = this.recommend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.currentProduct)
    let currentProduct = this.props.currentProduct;
    helperFunctions.getReviewsMetaById(currentProduct)
    .then((metaData)  => {
      console.log('metaData: ', metaData);
      this.setState({
        ...this.state,
        newReview: {
          ...this.state.newReview,
          characteristics: {
            ...this.state.newReview.characteristics,
            Comfort: {
              ...this.state.newReview.characteristics.Comfort,
              id: metaData.characteristics.Comfort.id
            },
            Fit: {
              ...this.state.newReview.characteristics.Fit,
              id: metaData.characteristics.Fit.id
            },
            Length: {
              ...this.state.newReview.characteristics.Length,
              id: metaData.characteristics.Length.id
            },
            Quality: {
              ...this.state.newReview.characteristics.Quality,
              id: metaData.characteristics.Quality.id
            },
          }
        }
      })
    })
    .catch((err) => {
      console.error('Error setting state of reviewMetaData', err)
    })
  }

  recommend(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      newReview: {
        ...this.state.newReview,
        recommend: !this.state.newReview.recommend
      }
    })
    //will replace with ternary operator at later date
    if (this.state.buttonText === "Recommend?") {
      this.setState({
        ...this.state,
        buttonText: "Recommended!"
      })
    } else if (this.state.buttonText === "Recommended!") {
      this.setState({
        ...this.state,
        buttonText: "Recommend?"
      })
    }
    console.log(this.state.newReview)
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      newReview: {
        ...this.state.newReview, [name]:value
       }
    });
  }
  handleChange2(e) {
    this.setState({
      ...this.state,
      newReview: {
        ...this.state.newReview,
        rating: parseInt(e.target.value, 10)
      }
    })
  }

  handleChange3(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      newReview: {
        ...this.state.newReview,
        characteristics: {
          ...this.state.newReview.characteristics,
          [name] : {
            ...this.state.newReview.characteristics[name], value: parseInt(value, 10)
          }
        }
      }
    })
  }


  //might need to put this at the main level, leaving commented out till I can test charecteristics

  handleSubmit(e) {
    let review = {
      product_id: this.state.newReview.product_id,
      rating: this.state.newReview.rating,
      summary: this.state.newReview.summary,
      body: this.state.newReview.body,
      recommend: this.state.newReview.recommend,
      name: this.state.newReview.name,
      email: this.state.newReview.email,
      photos: [""],
      characteristics: {
        [this.state.newReview.characteristics.Comfort.id] : this.state.newReview.characteristics.Comfort.value,
        [this.state.newReview.characteristics.Fit.id] : this.state.newReview.characteristics.Fit.value,
        [this.state.newReview.characteristics.Length.id] : this.state.newReview.characteristics.Length.value,
        [this.state.newReview.characteristics.Quality.id] : this.state.newReview.characteristics.Quality.value,
      }
    }
    helperFunctions.postReview(review);
  }

  render() {
    return (
      <div className="createReview">
        <form className="createReviewForm" onSubmit={this.handleSubmit}>
        <label>
          Rating:
          <select className="createReviewRating" value={this.state.value} onChange={this.handleChange2}name='rating'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </label>
        <button className="createReviewRecomend" onClick = {this.recommend}>{this.state.buttonText}</button>
        <tr className="createReviewCharecteristics" /*---this will be a charecteristics table, will need to do a deep dive into how I want to display this, so leaving it minimalistic for now*/>
          <th>Characteristics:</th>
          <label>
            Comfort:
          <select value={this.state.value} onChange={this.handleChange3}name='Comfort'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          </label>
          <label>
            Fit:
          <select value={this.state.value} onChange={this.handleChange3}name='Fit'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          </label>
          <label>
            Length:
          <select value={this.state.value} onChange={this.handleChange3}name='Length'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          </label>
          <label>
            Quality:
          <select value={this.state.value} onChange={this.handleChange3}name='Quality'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          </label>
        </tr>
        <label>
          Summary:
          <textarea className="createReviewSummary" name='summary' onChange={this.handleChange}/>
        </label>
        <label>
          Body:
          <textarea className="createReviewBody" name='body'onChange={this.handleChange}/>
        </label>
        <label>
          Name:
          <input className="createReviewName" name='name'onChange={this.handleChange}></input>
        </label>
        <label>
          Email:
          <input className="createReviewEmail" name="email" onChange={this.handleChange}></input>
        </label>
        <button className="createReviewSubmitButton" type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateReview;

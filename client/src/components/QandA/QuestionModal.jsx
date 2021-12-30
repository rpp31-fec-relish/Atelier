import React, { useState, useEffect } from 'react';
import helperFunctions from '../../helperFunctions.js';


function QuestionModal(props) {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');

  const onChange = (e) => {
    if(e.target.id === 'email') {
      setEmail(e.target.value);
    }
    if(e.target.id ==='name') {
      setUsername(e.target.value);
    }
    if(e.target.id === 'body') {
      setBody(e.target.value);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let apiData = {
      product_id: props.currProduct,
      body: body,
      name: username,
      email: email,
    };
    await helperFunctions.postQuestion(apiData).then(() => {
      console.log(apiData);
      // props.addSumbission(count => count + 1);
    });
    props.setShowModal();
  }

  return (
    <>{props.showModal ?
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="modalCloseButton" onClick={props.setShowModal}>X</button>
        <div className="info">
          <form className="QandAForm" onSubmit={onSubmit} >
            <div className="nameField">
              <label htmlFor="name">Enter your name: </label>
              <input type="text" name="name" id="name" onChange={onChange} required/>
              <div className="warning">For privacy reasons, do not use your full name or email address</div>
            </div>
            <div className="emailField">
              <label htmlFor="email">Enter your email: </label>
              <input type="email" name="email" id="email" onChange={onChange} required/>
              <div className="warning">For authentication reasons, you will not be emailed</div>
            </div>
            <div className="answerField">
              <label>Write your question: </label>
              <div>
              <textarea placeholder="Why did you like the product or not?" type="text" name="body" id="body" onChange={onChange} rows="4" cols="50" required/>
              </div>
            </div>
            <div className="Submit">
              <input className="questionSubmit" type="submit" placeholder="Submit Question"/>
            </div>
          </form>
        </div>
      </div>
    </div> : null}</>
  );
}

export default QuestionModal;
import React, { useState, useEffect } from 'react';
import helperFunctions from '../../helperFunctions.js';


function AnswerModal(props) {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);

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
      question_id: props.currQuestionId,
      body: body,
      name: username,
      email: email,
      photos: photos,
    };
    console.log(apiData);
    await helperFunctions.postAnswer(apiData).then(() => {
      props.addSumbission(count => count + 1);
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
            </div>
            <div className="emailField">
              <label htmlFor="email">Enter your email: </label>
              <input type="email" name="email" id="email" onChange={onChange} required/>
            </div>
            <div className="answerField">
              <label>Write your answer: </label>
              <textarea type="text" name="body" id="body" onChange={onChange} required/>
            </div>
            <div className="AnswerSubmit">
              <input type="submit" placeholder="Submit Question"/>
            </div>
          </form>
        </div>
      </div>
    </div> : null}</>
  );
}

export default AnswerModal;
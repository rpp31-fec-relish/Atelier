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

  const updateFile = async (e) => {
    console.log(e);
    let files = e.target.files;
    setPhotos(files);
    for(let i = 0; i < files.length; i++) {
      let img = document.createElement('img');
      img.src = URL.createObjectURL(files[i]);
      img.setAttributeNS(null, "className", "photoPreview");
      img.style.width = "100px";
      img.style.height = "100px";
      img.style['margin-left'] = "10px";
      img.style['margin-right'] = "10px";
      img.style['margin-bottom'] = "20px";
      console.log(img);
      document.getElementById('photoContainer').appendChild(img);
    };
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let photoURLS = [];

    for(let i = 0; i < photos.length; i++) {
      let data = new FormData();
      data.append('file', photos[i]);
      data.append('upload_preset', 'ml_default');
      await helperFunctions.postImage(data).then((response) => {
        photoURLS.push(response.data.url);
      });
    }

    let apiData = {
      question_id: props.currQuestionId,
      body: body,
      name: username,
      email: email,
      photos: photoURLS,
    };
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
          <form className="QandAForm" onSubmit={onSubmit}>
            <h1>{props.productData.name}: {props.currQuestion}</h1>
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
              <label>~ Write answer here ~</label>
              <div>
              <textarea type="text" name="body" id="body" onChange={onChange} rows="4" cols="50" required/>
              </div>
            </div>
            <div className="photoField">
              <input type="file" id="file" className="inputFiles" onChange={updateFile} style={{display: 'none'}} accept="image/*" multiple/>
              <label htmlFor="file" id="inputLabel" className="fileSelect"> Click here to upload files!</label>
            </div>
            <div id="photoContainer"></div>
            <div className="Submit">
              <input className="AnswerSubmit" type="submit" placeholder="Submit Question"/>
            </div>
          </form>
        </div>
      </div>
    </div> : null}</>
  );
}

export default AnswerModal;
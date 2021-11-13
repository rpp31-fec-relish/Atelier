import React from 'react';

function QandAModal(props) {
  return (
    <>{props.showModal ?
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="modalCloseButton" onClick={props.setShowModal}>X</button>
        <div className="info">
          <form action="" method="put" class="QandAForm">
            <div class="QandAForm">
              <label for="name">Enter your name: </label>
              <input type="text" name="name" id="name" required/>
            </div>
            <div class="QandAForm">
              <label for="email">Enter your email: </label>
              <input type="email" name="email" id="email" required/>
            </div>
            <div class="QandAForm">
              <input type="submit" value="Submit Question"/>
            </div>
          </form>
        </div>
      </div>
    </div> : null}</>
  );
}

export default QandAModal;
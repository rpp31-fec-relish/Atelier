import React from 'react';

function AnswerModal(props) {
  return (
    <>{props.showModal ?
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="modalCloseButton" onClick={props.setShowModal}>X</button>
        <div className="info">
          AnswerModal
        </div>
      </div>
    </div> : null}</>
  );
}

export default AnswerModal;
import React from 'react';

function QuestionModal(props) {
  return (
    <>{props.showModal ?
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="modalCloseButton" onClick={props.setShowModal}>X</button>
        <div className="info">
          QuestionModal
        </div>
      </div>
    </div> : null}</>
  );
}

export default QuestionModal;
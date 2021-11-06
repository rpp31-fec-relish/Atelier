import React from 'react';

function QandAModal(props) {
  return (
    <>{props.showModal ?
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="modalCloseButton" onClick={props.setShowModal}>X</button>
        <div className="info">
          What do I want in here?
        </div>
      </div>
    </div> : null}</>
  );
}

export default QandAModal;
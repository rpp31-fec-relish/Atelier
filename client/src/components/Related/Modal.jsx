import React from 'react';

const Modal = (props) => {
  let {onClose, show, currentProductData, singleRelatedProductFeature, allStyles} = props;

  const handleClose = (e) => { onClose && onClose(e); }

  if (!show) {
    return null;
  }
  return (
    <div className="modal-table">
      <table id="RP-modal">
        <caption>COMPARING</caption>
        <thead>
          <tr>
            <th>{currentProductData ? currentProductData.name : 'Current Product Name'}</th>
            <th> </th>
            <th>{singleRelatedProductFeature[0] ? singleRelatedProductFeature[0].name : 'Related Product Name'}</th>
          </tr>
        </thead>
        <tbody>
          {allStyles.map(entry => {
            return (
              <tr key={'modal-entry_' + entry.key}>
                <td>{entry.current ? '✓' : ''}</td>
                <td>{entry.characteristic}</td>
                <td>{entry.compare ? '✓' : ''}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="toggle-modal" onClick={(e) => {handleClose(e);}}>&#9746;</div>
    </div>
  )
}

export default Modal;
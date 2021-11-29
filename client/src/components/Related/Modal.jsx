import React from 'react';

export default class Modal extends React.Component {
  onClose(e) {
    this.props.onClose && this.props.onClose(e);
  }

  //current product and clicked-on product

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div id="RP-modal">
        <h4>COMPARING</h4>
        <div id="RP-comparison-1">Current Product Name</div>
        <div id="RP-comparison-2">Compared Product Name</div>
        <div id="modal-contents">{this.props.children}</div>
        <div>
          <div id="toggle-modal" onClose={(e) => {this.onClose(e);}}></div>
        </div>
      </div>
    )
  }
}
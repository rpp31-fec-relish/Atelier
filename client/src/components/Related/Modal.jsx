import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allStyles: []
    }

    this.onClose = this.onClose.bind(this);
  }

  onClose(e) {
    this.props.onClose && this.props.onClose(e);
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div id="RP-modal">
        <h4>COMPARING</h4>
        <div id="RP-comparison-1">Current Product Name</div>
        <div id="RP-comparison-2">Compared Product Name</div>
        <ul id="modal-contents">
          <li>GMO and Pesticide-free</li>
          <li>Made with 100% Genetic Modification</li>
          <li>This is made up</li>
          <li>It doesn't matter</li>
          <li>Feature description</li>
          <li>Uses React Hooks and Redux</li>
          <li>Angular</li>
          <li>Some other product comparison metric</li>
        </ul>
        <div>
          <div id="toggle-modal" onClick={(e) => {this.onClose(e);}}>&#9746;</div>
        </div>
      </div>
    )
  }
}
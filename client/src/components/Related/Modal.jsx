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
      <table id="RP-modal">
        <div className="modal-title">COMPARING</div>
        <tr>
          <th>Current Product Name</th>
          <th> </th>
          <th>Compared Product Name</th>
        </tr>
        <tr>
          <td>&#10003;</td>
          <td>GMO and Pesticide-free</td>
          <td>&#10003;</td>
        </tr>
        <tr>
          <td>&#10003;</td>
          <td>Made with 100% Genetic Modification</td>
          <td>&#10003;</td>
        </tr>
        <tr>
          <td>&#10003;</td>
          <td>This is made up</td>
          <td>&#10003;</td>
        </tr>
        <tr>
          <td>&#10003;</td>
          <td>It doesn't matter</td>
          <td></td>
        </tr>
        <tr>
          <td>&#10003;</td>
          <td>Feature description</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>Uses React Hooks and Redux</td>
          <td>&#10003;</td>
        </tr>
        <tr>
          <td></td>
          <td>Angular</td>
          <td>&#10003;</td>
        </tr>
        <tr>
          <td></td>
          <td>Some other product comparison metric</td>
          <td>&#10003;</td>
        </tr>
        <div>
          <div id="toggle-modal" onClick={(e) => {this.onClose(e);}}>&#9746;</div>
        </div>
      </table>
    )
  }
}
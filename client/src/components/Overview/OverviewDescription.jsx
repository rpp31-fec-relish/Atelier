import React from 'react';

class OverviewDescription extends React.Component {

  render() {
    if (this.props.product) {
      return (
        <div id='OverviewDescription'>
          {this.props.product.description}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewDescription;
import React from 'react';

class OverviewDescription extends React.Component {

  render() {
    if (this.props.product) {
      return (
        <div id='OverviewDescription'>
          <div id='OverviewSlogan'>
            {this.props.product.slogan}
          </div>
          {this.props.product.description}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OverviewDescription;
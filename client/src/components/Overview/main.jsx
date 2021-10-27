import React from 'react';
import OverviewImages from './OverviewImages.jsx';
import OverviewInformation from './OverviewInformation.jsx';
import OverviewStyles from './OverviewStyles.jsx';
import OverviewCart from './OverviewCart.jsx';
import OverviewDescription from './OverviewDescription.jsx';

class Overview extends React.Component {

  constructor(props) {
    super(props);
  }

  // table for now, will do layout properly in CSS
  render() {
    return (
      <div id='overview'>
        <table>
          <tbody>
            <tr>
              <td>
                <OverviewImages />
              </td>
              <td>
                <OverviewInformation />
                <OverviewStyles />
                <OverviewCart />
              </td>
            </tr>
            <tr>
              <td>
                <OverviewDescription />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default Overview;
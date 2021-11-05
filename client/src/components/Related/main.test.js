import Related from './main.jsx';

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

// describe - it - expect
describe('Related', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Related />);
    expect(wrapper).toMatchSnapshot();
  });
});
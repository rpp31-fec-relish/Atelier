import Outfits from './Outfits.jsx';

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson  } from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Outfits', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Outfits />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
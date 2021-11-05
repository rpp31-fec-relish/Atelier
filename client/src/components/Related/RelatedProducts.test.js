import RelatedProducts from './RelatedProducts.jsx';

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Related Products', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RelatedProducts />);
    expect(wrapper).toMatchSnapshot();
  });
});
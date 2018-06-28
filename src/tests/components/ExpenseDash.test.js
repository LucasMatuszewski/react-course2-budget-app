import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDash from '../../components/ExpenseDash';

test('should render Expenses Dashboard with Filters and List components', () => {
    const wrapper = shallow(<ExpenseDash />);
    expect(wrapper).toMatchSnapshot();
});

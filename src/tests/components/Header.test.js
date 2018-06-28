/****************************
 * REACT-TEST-RENDER version:
 ****************************/

/* 
// we have to virtually render this component, to figure out what is rendered.
// But we won't do it in a browser. We have to install React Library:
// > yarn add react-test-renderer -D

import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header correctly', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header />);
    console.log(renderer.getRenderOutput()); // we can console.log to JEST console.
    // But we will not compare it manually ;)
    // We use snapshots to automatically track changes to data over time.
    // We create a snapshot of header in current point of time and we get notify when it change.
    // Jest method: .toMatchSnapshot(optionalString)
    // https://facebook.github.io/jest/docs/en/expect.html#tomatchsnapshotpropertymatchers-snapshotname
    // https://facebook.github.io/jest/docs/en/snapshot-testing

    expect(renderer.getRenderOutput()).toMatchSnapshot();
    // First time we run this test it will pass, because there is no existing snapshot.
    // It take a snapshot of rendered UI and track changes compering to this snapshot.
    // snapshots are saved in tests/components/__snapshots__ - we can read / review it.

    // With shallow rendering we don't see <Link> anchor tags in test.js.snap files
});
*/

/*****************
 * ENZYME Version:
 * much easier & user friendly API
 *********************************/

import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    // Now we can use Enzyme methods on wrapper (the syntax is very similar to jQuery)
    // e.g. .find('selector') to return array with founded elements
    // selector could be CSS Selector (Element / Class / ID) or Component, variable, Object prop
    expect(wrapper.find('h1').length).toBe(1); // FOR SEO
    // .length = number of elements in array/object = if there is only one <h1> found = 1
    expect(wrapper.find('h1').text()).toBe('Expenses App'); // to check a text of h1
    // http://airbnb.io/enzyme/docs/api/ShallowWrapper/text.html

    expect(wrapper).toMatchSnapshot();
    // By default snapshot from Enzyme is full of Enzyme properties, we don't need.
    // We have to use enzyme-to-json library tu make snapshots with Enzyme
});
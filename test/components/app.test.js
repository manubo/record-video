import {assert} from 'chai';
import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../../src/components/app';

describe(App, () => {
  it('renders successfully', () => {
    const app = shallow(<App stream={{}} />);
    assert.lengthOf(app.find('Video'), 2);
  });
});

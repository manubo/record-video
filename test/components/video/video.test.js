import {assert} from 'chai';
import React from 'react';
import {shallow} from 'enzyme';
import Video from '../../../src/components/video/video';

test('Video renders a video container', () => {
  window.URL.createObjectURL = jest.fn();
  const video = shallow(<Video stream={{}} />)
  assert.lengthOf(window.URL.createObjectURL.mock.calls, 1);
  assert.deepEqual(window.URL.createObjectURL.mock.calls[0], [{}]);
});
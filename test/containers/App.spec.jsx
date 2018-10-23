import React from 'react';
import { mount } from 'enzyme';

import App from '../../src/containers/App.jsx';
import MockGapi from '../_helpers/MockGapi';

describe('App', () => {
  it('Renders a heading', async () => {
    window.gapi = new MockGapi();

    const app = mount(<App />);

    const h1 = app.find('h1');
    expect(h1.length).toBe(1);
  })
});

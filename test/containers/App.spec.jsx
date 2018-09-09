import React from 'react';
import { mount } from 'enzyme';

import App from '../../src/containers/App.jsx';

describe('App', () => {
  it('Renders a heading', () => {
    const app = mount(<App />);

    const h1 = app.find('h1');
    expect(h1.length).toBe(1);
  })
});

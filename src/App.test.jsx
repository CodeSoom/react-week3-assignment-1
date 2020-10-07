import React from 'react';

import { render } from '@testing-library/react';

import App from '../src/App';

const { container } = render((
  <App />
));

test('App', () => {
  expect(container).toContainHTML('<div');
});

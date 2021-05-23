import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { getByText } = render((
    <App />
  ));

  expect(getByText('추가')).not.toBeNull();
  expect(getByText('아무것도 하지 않기')).not.toBeNull();
});

import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('AppRendering', () => {
  const { container, getByLabelText } = render((
    <App />
  ));

  const input = getByLabelText('할 일');

  expect(input).toHaveValue('');
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

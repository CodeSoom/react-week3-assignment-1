import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('AppRendering', () => {
  const { container } = render((
    <App />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

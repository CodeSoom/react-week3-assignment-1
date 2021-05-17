import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { container, getByText, getByLabelText } = render(
    (
      <App />
    ),
  );

  const todo = getByLabelText('할 일');

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');

  fireEvent.change(todo, { target: { value: '멋대로 살기' } });
  fireEvent.click(getByText('추가'));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('멋대로 살기');
  expect(container).toHaveTextContent('완료');

  fireEvent.click(getByText('완료'));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { container } = render(<App />);

  const input = screen.getByLabelText('할 일');
  fireEvent.change(input, {
    target: { value: '왜 안되냐고오옹' },
  });

  const addTask = screen.getByText('추가');
  fireEvent.click(addTask);

  expect(container).toHaveTextContent('왜 안되냐고오옹');

  const deleteTask = screen.getByText('완료');
  fireEvent.click(deleteTask);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

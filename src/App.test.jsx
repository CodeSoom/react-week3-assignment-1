import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import { TASK_TITLE } from './mocks/data';

test('App', () => {
  const { container } = render(<App />);

  const value = TASK_TITLE;
  const input = screen.getByLabelText('할 일');

  fireEvent.change(input, {
    target: { value },
  });

  const addTask = screen.getByText('추가');
  fireEvent.click(addTask);

  expect(container).toHaveTextContent(value);

  const deleteTask = screen.getByText('완료');
  fireEvent.click(deleteTask);

  expect(container).toHaveTextContent('할 일이 없어요!');
});

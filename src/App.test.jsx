import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('APP', () => {
  const { getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText('할 일을 입력해 주세요');
  fireEvent.change(input, {
    target: {
      taskTitle: '',
      newId: 1,
      tasks: [],
    },
  });
  expect(input.taskTitle).toBe('');
  expect(input.newId).toBe(1);
  expect(input.tasks).toStrictEqual([]);
});

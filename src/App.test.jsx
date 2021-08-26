import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('change title', () => {
  const { getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText('할 일을 입력해 주세요'); // input 이 있는지 확인
  fireEvent.change(input, {
    target: {
      taskTitle: '',
      newId: 1,
      tasks: [],
    },
  });
  expect(input).toHaveFormValues({
    taskTitle: '',
    newId: 1,
    tasks: [],
  });
});

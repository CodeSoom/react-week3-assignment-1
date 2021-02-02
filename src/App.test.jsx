import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

test('Page 컴포넌트 출력확인', () => {
  render(<App />);

  const header = screen.getByText('To-do');
  const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
  const paragraph = screen.getByText('할 일이 없어요!');

  expect(header).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});

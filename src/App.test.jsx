import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('none todos', () => {
  const { container } = render(<App />);
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

test('add todos', () => {
  const value = '뭐라도 하기';

  const { getByPlaceholderText, getByText, container } = render(<App />);

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(input, { target: { value } });
  expect(input.value).toBe(value);

  fireEvent.click(getByText('추가'));
  fireEvent.click(getByText(''));

  fireEvent.click(getByText('완료'));
  expect(container).toHaveTextContent('할 일이 없어요!');
});

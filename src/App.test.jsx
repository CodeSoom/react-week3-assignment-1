import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { container, getByPlaceholderText, getByText } = render(<App />);

  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
    target: { value: '일기쓰기' },
  });

  expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe(
    '일기쓰기',
  );

  fireEvent.click(getByText('추가'));

  expect(container).toHaveTextContent('일기쓰기');

  fireEvent.click(getByText('완료'));

  expect(container).not.toHaveTextContent('일기쓰기');

  expect(container).toHaveTextContent('할 일이 없어요!');
});

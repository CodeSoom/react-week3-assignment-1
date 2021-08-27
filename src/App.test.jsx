import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { container, getByLabelText, getByText } = render((
    <App />
  ));
  // 첫 화면, 빈 리스트 문구
  expect(container).toHaveTextContent('할 일이 없어요!');

  // task 입력
  const input = getByLabelText('할 일');
  expect(input).toHaveValue('');
  fireEvent.change(input, { target: { value: '이것' } });
  expect(input).toHaveValue('이것');

  // 입력한 task 추가
  fireEvent.click(getByText('추가'));
  expect(input).toHaveValue('');

  // 추가한 task가 리스트에 존재
  expect(container).not.toHaveTextContent('할 일이 없어요!');
  expect(container.querySelector('ol')).toBeInTheDocument();
  expect(container).toHaveTextContent('이것');

  // 새로운 task 입력 및 추가
  fireEvent.change(input, { target: { value: '저것' } });
  fireEvent.click(getByText('추가'));

  // 추가한 task가 리스트에 존재
  expect(container).toHaveTextContent('저것');

  // task 삭제
  fireEvent.click(getByText('이것').parentNode.querySelector('button'));
  expect(container).not.toHaveTextContent('이것');
  expect(container).toHaveTextContent('저것');
  expect(container).not.toHaveTextContent('할 일이 없어요!');

  // task 삭제
  fireEvent.click(getByText('저것').parentNode.querySelector('button'));
  expect(container).not.toHaveTextContent('저것');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('Input And Complete Todo', () => {
  // 값은 잘 변경되는지, 함수는 잘 실행되는지 확인
  const { container, getByPlaceholderText, getByText } = render(
    <App />,
  );
  const input = getByPlaceholderText('할 일을 입력해 주세요');
  const button = getByText('추가');

  fireEvent.change(input, { target: { value: 'App.js 코드 테스트' } }); // 텍스트 값 변경

  expect(input).toHaveAttribute('value', 'App.js 코드 테스트'); // value 값 변경

  fireEvent.click(button); // 버튼 클릭

  expect(input).toHaveAttribute('value', ''); // value 값 초기화

  // 화면 출력
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('App.js 코드 테스트');
  expect(container).toHaveTextContent('완료');

  const completeButton = getByText('완료');

  fireEvent.click(completeButton); // 완료 버튼 클릭

  // 화면 출력
  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});

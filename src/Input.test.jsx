import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Item', () => {
  const value = '';
  const handleChange = jest.fn();
  const handleClickAddTask = jest.fn();

  const { getByPlaceholderText, getByText } = render(<Input
    value={value}
    onChange={handleChange}
    onClick={handleClickAddTask}
  />);

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  const button = getByText('추가');

  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: '홈트하기' } });

  expect(input).toBeInTheDocument('홈트하기');

  // 공식문서를 보고 아래와같이 따라해보았는데.. 왜 안되는지 모르겠습니다..
  // https://testing-library.com/docs/example-input-event/
  // expect(input.value).toBe('홈트하기');

  fireEvent.click(button);

  expect(handleClickAddTask).toBeCalled();
  // handleClickAddTask가 실행되면 tasks에 task가 추가되는 것까지 테스트를 Input에서 하나요?
  // 그 테스트를 하려면 어떻게 해야 하는지 감이 잡히지 않습니다... ㅜㅜ
});

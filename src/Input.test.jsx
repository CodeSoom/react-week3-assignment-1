import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

test('input과 button으로 이루어져 있는지 확인한다.', () => {
  const utils = render(<Input />);
  const { getByText, getByPlaceholderText } = utils;

  getByText('할 일');
  getByText('추가');
  getByPlaceholderText('할 일을 입력해 주세요');
});

test('change 이벤트가 발생하면 value의 값이 바뀐다.', () => {
  const utils = render(<Input />);
  const { getByPlaceholderText } = utils;

  const input = getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(input, {
    target: {
      value: '자바스크립트 공부하기',
    },
  });

  expect(input.value).toBe('자바스크립트 공부하기');
});

test('onClick 이벤트가 발생하면 할 일이 추가되고, value는 비어진다.', () => {
  const handleClickAddTask = jest.fn();
  const utils = render(<Input onClick={handleClickAddTask} />);

  const { getByPlaceholderText, getByText } = utils;

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  const button = getByText('추가');

  // value를 바꾼다.
  fireEvent.change(input, {
    target: {
      value: '자바스크립트 공부하기',
    },
  });
  // '추가' 버튼을 클릭한다.
  fireEvent.click(button);
  expect(handleClickAddTask).toBeCalled();
  expect(utils.container).toHaveTextContent('자바스크립트 공부하기');
  expect(input.value).toBe('');
});

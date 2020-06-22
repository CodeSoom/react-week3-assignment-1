import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  test('인풋과 버튼 확인', () => {
    const taskTitle = '';
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const { getByText, getByPlaceholderText } = render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ));
    expect(getByText('할 일')).toBeTruthy();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeTruthy();
    expect(getByText('추가')).toBeTruthy();
  });

  test('할 일 입력', () => {
    const taskTitle = '';
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const { getByPlaceholderText } = render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(input).toHaveValue('');
    fireEvent.change(input, { target: { value: '뭐라도 하기' } });
    expect(onChangeTitle).toBeCalled();
  });

  test('추가 클릭, 인풋창 초기화', () => {
    const taskTitle = '뭐라도 하기';
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const { getByText } = render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ));
    const button = getByText('추가');

    fireEvent.click(button);
    expect(onClickAddTask).toBeCalled();
  });
});

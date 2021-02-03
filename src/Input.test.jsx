import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  function myRender({ taskTitle, onChangeTitle, onClickAddTask }) {
    return render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ));
  }

  it('UI 정상노출 확인', () => {
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();

    const {
      getByLabelText,
      getByPlaceholderText,
      getByText,
    } = myRender({ onChangeTitle, onClickAddTask });

    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
  });

  it('input 값 입력', () => {
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();

    const { getByPlaceholderText } = myRender({ onChangeTitle, onClickAddTask });

    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '인풋 작성',
      },
    });

    expect(input.value).toBe('인풋 작성');
  });
});

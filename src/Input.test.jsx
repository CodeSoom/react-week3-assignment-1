import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  function renderInput(taskTitle) {
    return render((
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />
    ));
  }

  it('label, placeholder, 추가버튼을 모두 표시한다.', () => {
    const {
      getByLabelText,
      getByPlaceholderText,
      getByText,
    } = renderInput();

    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
  });

  it('input의 값을 변경하면 input의 값이 변경된다', () => {
    const { getByPlaceholderText } = renderInput();

    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '인풋 작성',
      },
    });

    expect(onChangeTitle).toBeCalled();

    expect(input.value).toBe('인풋 작성');
  });

  it('추가 버튼을 누르면 onClickAddTask 함수가 실행되고, input창은 리셋된다.', () => {
    const { getByText, getByPlaceholderText } = renderInput('입력된 값');

    const addButton = getByText('추가');

    expect(onClickAddTask).not.toBeCalled();

    fireEvent.click(addButton);

    expect(onClickAddTask).toBeCalled();

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });
});

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input Test', () => {
  test('요소와 텍스트가 있는지 확인', () => {
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const taskTitle = '초기값';

    const {
      container,
      getByLabelText,
      getByPlaceholderText,
    } = render(
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />,
    );

    expect(container.querySelector('label')).toHaveTextContent('할 일');
    expect(container.querySelector('button')).toHaveTextContent('추가');
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(container.querySelector('input').value).toBe('초기값');
  });

  test('클릭 했을 때', () => {
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const taskTitle = '초기값';

    const {
      getByText,
    } = render(
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />,
    );

    expect(onClickAddTask).not.toHaveBeenCalled();

    fireEvent.click(getByText('추가'));

    expect(onClickAddTask).toHaveBeenCalledTimes(1);
  });

  test('값을 변경했을 때', () => {
    const onChangeTitle = jest.fn();
    const onClickAddTask = jest.fn();
    const taskTitle = '초기값';

    const {
      container,
    } = render(
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />,
    );

    expect(onChangeTitle).not.toHaveBeenCalled();

    fireEvent.change(container.querySelector('input'), {
      target: { value: 'hi' },
    });

    expect(onChangeTitle).toHaveBeenCalled();
  });
});

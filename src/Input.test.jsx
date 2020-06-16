import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  test('사용자가 할 일을 입력하면 input 값이 해당 글자로 값이 바뀐다.', () => {
    const taskTitle = undefined;

    const container = render(
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />,
    );

    expect(onChangeTitle).not.toBeCalled();
    fireEvent.change(container.getByLabelText('할 일'), {
      target: {
        value: '바뀐다',
      },
    });
    expect(onChangeTitle).toBeCalledTimes(1);
    expect(container.getByLabelText('할 일').value).toBe('바뀐다');
  });

  test('사용자가 할 일을 입력하고 추가를 누르면 input의 텍스트가 지워진다.', () => {
    const taskTitle = 'a';

    const container = render(
      <Input
        value={taskTitle}
        onChange={onChangeTitle}
        onClick={onClickAddTask}
      />,
    );

    expect(container.getByLabelText('할 일').value).toBe('a');

    expect(onClickAddTask).not.toBeCalled();
    fireEvent.click(container.getByText('추가'));
    expect(onClickAddTask).toBeCalledTimes(1);

    expect(
      container.getByPlaceholderText('할 일을 입력해 주세요'),
    ).toBeInTheDocument();
  });
});

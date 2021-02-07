import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const taskTitle = '할 일 작성중';
  const { getByDisplayValue, getByLabelText } = render((
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  expect(getByDisplayValue('할 일 작성중')).not.toBeNull();

  expect(onChangeTitle).not.toBeCalled();

  fireEvent.change(getByLabelText('할 일'), {
    target: { value: '뭔가 하기' },
  });

  expect(onChangeTitle).toBeCalled();
});

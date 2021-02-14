import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const taskTitle = '안녕';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  it('render the current input value', () => {
    const { getByDisplayValue } = render((
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />
    ));

    expect(getByDisplayValue('안녕')).not.toBeNull();
  });

  it('render input to write task', () => {
    const { getByLabelText } = render((
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />
    ));

    const input = getByLabelText('할 일');

    expect(handleChangeTitle).not.toBeCalled();

    fireEvent.change(input, { target: { value: '커피를 마시자' } });

    expect(handleChangeTitle).toBeCalled();
  });
});
